import requests
from bs4 import BeautifulSoup
from datetime import datetime
import pymongo
from dotenv import load_dotenv
import os
import logging

load_dotenv()

# Thiết lập logging
logging.basicConfig(filename='app.log', filemode='w',
                    format='%(asctime)s - %(levelname)s - %(message)s', level=logging.ERROR)


def crawl_thread():
    try:
        # Kết nối với MongoDB
        # client = pymongo.MongoClient(os.getenv("MONGODB_URL_DEV"))
        client = pymongo.MongoClient(os.getenv("MONGODB_URL_PRODUCT"))
        database = client["test"]
        collection = database["threads"]

        for i in range(775, 800):
            url = f"https://voz.vn/f/chuyen-tro-linh-tinh.17/page-{i}"
            print(url)
            headersList = {
                "Accept": "*/*",
                "User-Agent": "Thunder Client (https://www.thunderclient.com)"
            }

            response = requests.get(url, headers=headersList)

            if response.status_code == 200:
                soup = BeautifulSoup(response.content, "html.parser")
                post_contents = soup.find_all("div", class_="structItem")

                date_format = "%b %d, %Y at %I:%M %p"
                result = []

                for post_content in post_contents:
                    title = post_content.find(
                        "div", class_="structItem-title").a.text.strip()
                    existing_thread = None
                    existing_thread = collection.find_one({"title": title})

                    if existing_thread is None:
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
                            "time", class_="u-dt")["title"]
                        createdTime = datetime.strptime(createdAt, date_format)

                        author = (
                            post_content.find(
                                "a", class_="username").span.text.strip()
                            if post_content.find("a", class_="username").span
                            else post_content.find("a", class_="username").text.strip()
                        )

                        total_replies = post_content.find(
                            "dl", class_="pairs--justified").dd.text

                        views = post_content.find(
                            "dl", class_="structItem-minor").dd.text

                        updatedAt = post_content.find(
                            "time", class_="structItem-latestDate u-dt")["title"]
                        updatedTime = datetime.strptime(updatedAt, date_format)

                        page_jump = post_content.find(
                            'span', class_='structItem-pageJump')
                        # Giá trị mặc định
                        last_page = 1
                        if page_jump:
                            all_links = page_jump.find_all("a")
                            if all_links:
                                if all_links[-1].text:
                                    last_page = int(all_links[-1].text)

                        check = 56

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

    except (pymongo.errors.PyMongoError, requests.RequestException) as e:
        logging.error(f"Lỗi MongoDB hoặc kết nối: {e}")

    finally:
        # Đảm bảo đóng kết nối với MongoDB sau khi hoàn thành công việc
        client.close()


crawl_thread()
