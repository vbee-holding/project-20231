import requests
from bs4 import BeautifulSoup
from datetime import datetime
from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

# Kết nối với mongodb
client = MongoClient(os.getenv("MONGODB_URL_DEV"))
database = client["test"]
collection_thread = database["threads"]
collection_reply = database["replies"]


def fetch_data(url):
    # Gửi request lấy toàn bộ nội dung trang web theo url
    headersList = {
        "Accept": "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)"
    }
    response = requests.request("GET", url, data='', headers=headersList)

    # Sử dụng thư viện BeautifulSoup để lấy những nội dung cần thiết
    soup = BeautifulSoup(response.content, 'html.parser')
    items = soup.find_all('div', class_="message-inner")

    # Format lại dữ liệu vừa crawl về theo dạng datetime để lưu vào database
    date_format = "%b %d, %Y at %I:%M %p"

    # Xử lý dữ liệu
    result = []
    for item in items:
        reply_id = item.find('div', class_='message-userContent')['data-lb-id']
        # Kiểm tra xem reply_id đã có trong collection reply hay chưa
        existing_reply = collection_reply.find_one({"reply_id": reply_id})

        if existing_reply is None:
            # Lấy thời gian tạo
            createdAt = item.find('time', class_='u-dt')['title']
            createdTime = datetime.strptime(createdAt, date_format)

            author_title = item.find(
                'h5', class_='message-userTitle').text.strip()

            author_element = item.find('a', class_="username").span
            author = author_element.text.strip() if author_element else item.find('a',
                                                                                  class_="username").text.strip()

            avatar_url_element = item.find(
                'div', class_='message-avatar-wrapper')
            if avatar_url_element:
                avatar_url = avatar_url_element.a.img.get(
                    'src') if avatar_url_element.a.img else avatar_url_element.a.span.text.strip()

            # Lấy reply_detail
            blockquote = item.find('div', class_="bbWrapper").blockquote
            reply_detail_id = ''
            title = ''
            reply_detail_img_url = ''
            reply_detail_content = ''
            if blockquote:
                reply_id_element = blockquote.find('div', 'bbCodeBlock-title')
                if reply_id_element:
                    reply_detail_id = reply_id_element.a['href']
                    title = reply_id_element.a.text.strip()
                reply_content_element = blockquote.find(
                    'div', 'bbCodeBlock-expandContent')

                if reply_content_element:
                    reply_img_element = reply_content_element.img
                    if reply_img_element:
                        reply_detail_img_url = reply_img_element.get('src')
                        reply_img_element.extract()
                    reply_detail_content = reply_content_element.get_text(
                        separator=' ', strip=True)

            text_content_element = item.find('div', class_="bbWrapper")
            content_element = str(text_content_element)
            for blockquote in text_content_element.find_all('blockquote'):
                blockquote.extract()
            for img in text_content_element.find_all('img'):
                img.extract()
            content = text_content_element.get_text(
                separator=' ', strip=True)

            bbImage = item.find('img', class_="bbImage")
            if bbImage:
                img_url = 'https://voz.vn' + bbImage.get('src')
            else:
                img_url = ''

            threadId = url[17:].split('/')[0]

            result.append({'reply_id': reply_id, 'author': author, 'avatar_url': avatar_url, 'author_title': author_title, 'content': content, 'content_element': content_element,
                           'img_url': img_url, 'reply_detail': {'reply_detail_id': reply_detail_id, 'title': title, 'reply_detail_content': reply_detail_content, 'reply_detail_img_url': reply_detail_img_url}, 'threadId': threadId, 'createdAt': createdAt, 'createdTime': createdTime})

            print(
                f"Đã thêm mới vào collection reply dữ liệu có reply_id: {reply_id}")
        else:
            existing_reply = None
            print("Dữ liệu trong collection reply không có sự thay đổi")

    return result


def scrape_data():
    all_results = []

    data = collection_thread.find(
        {"check": 1}, {"threadId": 1, "last_page": 1})

    for child in data:
        url = "https://voz.vn/t/" + \
            child['threadId'] + "/page-" + child['last_page']
        # url = "https://voz.vn/t/" + child['threadId']
        fetched_data = fetch_data(url)
        if fetched_data:
            all_results.extend(fetched_data)

    if all_results:
        collection_reply.insert_many(all_results)
    else:
        print("Hiện tại không có dữ liệu mới nào được thêm vào")


scrape_data()
