import requests
from bs4 import BeautifulSoup
from datetime import datetime
import pymongo
from dotenv import load_dotenv
import os

load_dotenv()

# Kết nối với mongodb
client = pymongo.MongoClient(os.getenv("MONGODB_URL_DEV"))
database = client["test"]
collection = database["threads"]


def crawl_thread():  # Hàm crawl data thread
    # Lấy thời gian trong collection thread mà gần với hiện tại nhất
    latest_timestamp = collection.find_one(
        sort=[("updatedTime", pymongo.DESCENDING)]
    )
    latest_time = latest_timestamp["updatedTime"] if latest_timestamp else None
    print(latest_time)

    # Gửi request lấy toàn bộ nội dung trang web theo url
    reqUrl = "https://voz.vn/f/chuyen-tro-linh-tinh.17/"
    headersList = {
        "Accept": "*/*",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36"
    }
    response = requests.get("GET", reqUrl, data='', headers=headersList)

    # Sử dụng thư viện BeautifulSoup để lấy những nội dung cần thiết
    soup = BeautifulSoup(response.content, "html.parser")
    post_contents = soup.find_all("div", class_="structItem")

    # Format lại dữ liệu vừa crawl về theo dạng datetime để lưu vào database
    date_format = "%b %d, %Y at %I:%M %p"
    result = []

    # Lặp qua post_contents để lấy những nội dung cần thiết
    for post_content in post_contents:
        updatedAt = post_content.find(
            "time", class_="structItem-latestDate u-dt")["title"]
        updatedTime = datetime.strptime(updatedAt, date_format)

        title = post_content.find(
            "div", class_="structItem-title").a.text.strip()
        existing_thread = collection.find_one({"title": title})

        page_jump = post_content.find('span', class_='structItem-pageJump')
        # Giá trị mặc định
        last_page = '1'
        if page_jump:
            all_links = page_jump.find_all("a")
            if all_links:
                if all_links[-1].text:
                    last_page = all_links[-1].text

        check = 0

        # Kiểm tra tiêu đề đã có trong collection thread chưa
        if existing_thread:
            # Nếu title đã tồn tại và updatedTime mới hơn latest_time, cập nhật lại updatedTime, updatedAt
            if updatedTime > latest_time:
                collection.update_one(
                    {"title": title}, {"$set": {"updatedTime": updatedTime}})
                collection.update_one(
                    {"title": title}, {"$set": {"updatedAt": updatedAt}})
                collection.update_one(
                    {"title": title}, {"$set": {"check": 1}})
                collection.update_one(
                    {"title": title}, {"$set": {"last_page": last_page}})
                print(
                    f"Đã cập nhật updatedTime, updatedAt, last_page và check cho thread: {title}")
            else:
                collection.update_one(
                    {"title": title}, {"$set": {"check": 0}})
                print("Dữ liệu trong collection thread không có sự thay đổi")

            existing_thread = None
        else:
            # Nếu title chưa tồn tại trong collection thread, thêm dữ liệu mới
            threadId = post_content.find(
                "div", class_="structItem-title").a["href"][3:-1]

            avatar_url = (
                post_content.find(
                    "div", class_="structItem-iconContainer").a.img.get("src")
                if post_content.find("div", class_="structItem-iconContainer").a.img
                else post_content.find("div", class_="structItem-iconContainer").a.span.text.strip()
            )

            createdAt = post_content.find("time", class_="u-dt")["title"]
            createdTime = datetime.strptime(createdAt, date_format)

            total_replies = post_content.find(
                "dl", class_="pairs--justified").dd.text

            views = post_content.find("dl", class_="structItem-minor").dd.text

            author = (
                post_content.find("a", class_="username").span.text.strip()
                if post_content.find("a", class_="username").span
                else post_content.find("a", class_="username").text.strip()
            )

            check = 1

            result.append(
                {
                    "title": title,
                    "author": author,
                    "avatar_url": avatar_url,
                    "threadId": threadId,
                    "total_replies": total_replies,
                    "views": views,
                    "last_page": last_page,
                    "check": check,
                    "createdAt": createdAt,
                    "updatedAt": updatedAt,
                    "createdTime": createdTime,
                    "updatedTime": updatedTime,
                }
            )
            print(
                f"Đã thêm mới vào collection thread dữ liệu có tiêu đề: {title}")

    if result:
        collection.insert_many(result)


crawl_thread()
