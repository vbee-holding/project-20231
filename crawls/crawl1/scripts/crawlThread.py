import requests
from bs4 import BeautifulSoup
from datetime import datetime, timezone
import pymongo
from dotenv import load_dotenv
import os

load_dotenv()

# Kết nối với mongodb
# client = pymongo.MongoClient(os.getenv("MONGODB_URL_DEV"))
client = pymongo.MongoClient(os.getenv("MONGODB_URL_PRODUCT"))
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
    url = "https://voz.vn/f/chuyen-tro-linh-tinh.17/"
    headersList = {
        "Accept": "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)"
    }
    try:
        response = requests.get(url, headers=headersList)
        if response.status_code == 200:
            # Sử dụng thư viện BeautifulSoup để lấy những nội dung cần thiết
            soup = BeautifulSoup(response.content, "html.parser")
            post_contents = soup.find_all("div", class_="structItem")

            result = []

            # Lặp qua post_contents để lấy những nội dung cần thiết
            for post_content in post_contents:
                updatedAt = post_content.find(
                    "time", class_="structItem-latestDate u-dt")['datetime']
                updatedTime = datetime.strptime(
                    updatedAt, "%Y-%m-%dT%H:%M:%S%z")

                title = post_content.find(
                    "div", class_="structItem-title").a.text.strip()
                existing_thread = collection.find_one({"title": title})

                page_jump = post_content.find(
                    'span', class_='structItem-pageJump')
                # Giá trị mặc định
                last_page = 1
                if page_jump:
                    all_links = page_jump.find_all("a")
                    if all_links:
                        if all_links[-1].text:
                            last_page = int(all_links[-1].text)

                check = 0

                total_replies = post_content.find(
                    "dl", class_="pairs--justified").dd.text

                views = post_content.find(
                    "dl", class_="structItem-minor").dd.text

                # Kiểm tra tiêu đề đã có trong collection thread chưa
                if existing_thread:
                    # Nếu title đã tồn tại và updatedTime mới hơn latest_time, cập nhật lại updatedTime, updatedAt
                    if latest_time is not None and updatedTime.replace(tzinfo=None) > latest_time:
                        collection.update_one(
                            {"title": title}, {"$set": {"updatedTime": updatedTime}})
                        collection.update_one(
                            {"title": title}, {"$set": {"check": 1}})
                        collection.update_one(
                            {"title": title}, {"$set": {"last_page": last_page}})
                        collection.update_one(
                            {"title": title}, {"$set": {"total_replies": total_replies}})
                        collection.update_one(
                            {"title": title}, {"$set": {"views": views}})
                    else:
                        collection.update_one(
                            {"title": title}, {"$set": {"check": 0}})

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

                    createdAt = post_content.find(
                        "time", class_="u-dt")['datetime']
                    createdTime = datetime.strptime(
                        createdAt, "%Y-%m-%dT%H:%M:%S%z")

                    author = (
                        post_content.find(
                            "a", class_="username").span.text.strip()
                        if post_content.find("a", class_="username").span
                        else post_content.find("a", class_="username").text.strip()
                    )

                    check = 1

                    result.append(
                        {
                            "title": title,
                            "author": author,
                            "avatarUrl": avatar_url,
                            "threadId": threadId,
                            "totalReplies": total_replies,
                            "views": views,
                            "lastPage": last_page,
                            "check": check,
                            "createdTime": createdTime,
                            "updatedTime": updatedTime,
                            "timestamp": datetime.utcnow()
                        }
                    )

            if result:
                collection.insert_many(result)
        else:
            print(
                f"Yêu cầu tại {url} không thành công: {response.status_code}")
    except requests.RequestException as e:
        print(f"Lỗi kết nối: {e}")
    return []


crawl_thread()
