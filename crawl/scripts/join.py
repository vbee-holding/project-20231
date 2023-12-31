import schedule
import time
from pymongo import MongoClient


def join_collections():
    client = MongoClient("mongodb://localhost:27017/")
    database = client["test"]

    thread = database["thread"]
    reply = database["reply"]

    pipeline = [
        {
            "$lookup": {
                "from": "reply",
                "localField": "threadId",
                "foreignField": "threadId",
                "as": "replys"
            }
        },
        {
            "$merge": {
                "into": "thread",
                "whenMatched": "merge"
            }
        }
    ]

    result = thread.aggregate(pipeline)
    print("Join thành công")


join_collections()

# Hẹn giờ chạy lại sau mỗi 2 phút
schedule.every(2).minutes.do(join_collections)

while True:
    schedule.run_pending()
    time.sleep(1)
