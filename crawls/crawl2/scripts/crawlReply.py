import requests
from bs4 import BeautifulSoup
from datetime import datetime
from pymongo import MongoClient
from dotenv import load_dotenv
import os
import logging

load_dotenv()

# Thiết lập logging
logging.basicConfig(filename='app.log', filemode='w',
                    format='%(asctime)s - %(levelname)s - %(message)s', level=logging.ERROR)

# Kết nối với MongoDB
client = MongoClient(os.getenv("MONGODB_URL_DEV"))
# client = MongoClient(os.getenv("MONGODB_URL_PRODUCT"))
database = client["test"]
collection_thread = database["threads"]
collection_reply = database["replies"]


def fetch_data(url):
    headersList = {
        "Accept": "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)"
    }
    try:
        response = requests.get(url, headers=headersList)
        if response.status_code == 200:
            soup = BeautifulSoup(response.content, 'html.parser')
            items = soup.find_all('div', class_="message-inner")

            date_format = "%b %d, %Y at %I:%M %p"
            result = []

            for item in items:
                reply_id = None
                reply_element = item.find('div', class_='message-userContent')
                if reply_element and 'data-lb-id' in reply_element.attrs:
                    reply_id = reply_element['data-lb-id']

                existing_reply = collection_reply.find_one(
                    {"replyId": reply_id})

                blockquote = None

                if item.find('div', class_="bbWrapper").blockquote:
                    blockquote = item.find(
                        'div', class_="bbWrapper").blockquote

                if blockquote is None and existing_reply is None and reply_id is not None:
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

                    text_content_element = item.find('div', class_="bbWrapper")
                    content_element = str(text_content_element)
                    for blockquote in text_content_element.find_all('blockquote'):
                        blockquote.extract()
                    for img in text_content_element.find_all('img'):
                        img.extract()
                    content = text_content_element.get_text(
                        separator=' ', strip=True)

                    threadId = url[17:].split('/')[0]

                    result.append({'replyId': reply_id, 'author': author, 'avatarUrl': avatar_url, 'authorTitle': author_title, 'content': content,
                                   'contentElement': content_element, 'threadId': threadId, 'createdTime': createdTime, "timestamp": datetime.utcnow()})
                else:
                    existing_reply = None

            return result
        else:
            logging.error(
                f"Yêu cầu tại {url} không thành công: {response.status_code}")
    except requests.RequestException as e:
        logging.error(f"Lỗi kết nối: {e}")
    return []


def scrape_data():
    try:
        data = collection_thread.find(
            {"check": 720}, {"threadId": 1, "lastPage": 1})

        for child in data:
            all_results = []
            n = child['lastPage']

            for i in range(1, n + 1):
                url = f"https://voz.vn/t/{child['threadId']}/page-{i}"
                fetched_data = fetch_data(url)
                print(url)
                # Kiểm tra dữ liệu trước khi thêm vào MongoDB
                if fetched_data and len(fetched_data) > 0:
                    all_results.extend(fetched_data)

            if all_results:
                collection_reply.insert_many(all_results)
                print("Đã lưu dữ liệu vào MongoDB")
            else:
                print("Hiện tại không có dữ liệu mới nào được thêm vào")
    except Exception as e:
        logging.error(
            f"Lỗi khi thực hiện crawl và lưu dữ liệu vào MongoDB: {e}")

    finally:
        client.close()


scrape_data()
