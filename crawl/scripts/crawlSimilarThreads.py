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
collection_similar_thread = database["similarThread"]


def crawl_semilar_thread(url):
    # Gửi request lấy toàn bộ nội dung trang web theo url
    headersList = {
        "Accept": "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)"
    }
    response = requests.request("GET", url, data='', headers=headersList)

    # Sử dụng thư viện BeautifulSoup để lấy những nội dung cần thiết
    soup = BeautifulSoup(response.content, "html.parser")
    items = soup.find_all('div', class_="structItem--thread")

    # Format lại dữ liệu vừa crawl về theo dạng datetime để lưu vào database
    date_format = "%b %d, %Y at %I:%M %p"
    result = []

    for item in items:
        similar_id = item.find(
            'div', class_='structItem-iconContainer').a['data-user-id']
        # Kiểm tra xem similar_id đã có trong collection similarThread hay chưa
        existing_reply = collection_similar_thread.find_one(
            {"similar_id": similar_id})

        if existing_reply is None:
            threadId = url[17:]

            avatar_url_element = item.find(
                'div', class_='structItem-iconContainer')
            if avatar_url_element:
                avatar_url = avatar_url_element.a.img.get(
                    'src') if avatar_url_element.a.img else avatar_url_element.a.span.text.strip()

            title = item.find(
                'div', class_='structItem-title').a.text.strip()

            minor = item.find(
                'div', class_='structItem-minor')
            author = minor.find('a', class_='username').text.strip()

            Replies = item.find(
                'dl', class_='pairs pairs--justified').dd.text.strip()

            views = item.find(
                'dl', class_='pairs pairs--justified structItem-minor').dd.text.strip()

            createdAt = item.find("time", class_="u-dt")["title"]
            createdTime = datetime.strptime(createdAt, date_format)

            result.append({'similar_id': similar_id, 'author': author, 'title': title, 'avatar_url': avatar_url, 'Replies': Replies, 'views': views, 'threadId': threadId,
                          'createdAt': createdAt, 'createdTime': createdTime})
            print(
                f"Đã thêm mới vào collection similarThread dữ liệu có similar_id: {similar_id}")

        else:
            existing_reply = None
            print("Dữ liệu trong collection similarThread không có sự thay đổi")

    return result


def scrape_data():
    all_results = []

    data = collection_thread.find(
        {"check": 1}, {"threadId": 1})

    for child in data:
        url = "https://voz.vn/t/" + child['threadId']
        fetched_data = crawl_semilar_thread(url)
        if fetched_data:
            all_results.extend(fetched_data)

    if all_results:
        # Xóa hết dữ liệu cũ trong collection similarThread
        collection_similar_thread.delete_many({})

        # Thêm dữ liệu mới vào collection similarThread
        collection_similar_thread.insert_many(all_results)
        print("Đã thêm dữ liệu mới vào collection similarThread")
    else:
        print("Hiện tại không có dữ liệu mới nào được thêm vào")


scrape_data()
