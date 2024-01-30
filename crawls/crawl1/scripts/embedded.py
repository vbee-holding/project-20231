from pymongo import MongoClient
from dotenv import load_dotenv
from pymongo.errors import ExecutionTimeout
import os

load_dotenv()


def join_collections():
    client = MongoClient(os.getenv("MONGODB_URL_PRODUCT"))
    # client = MongoClient(os.getenv("MONGODB_URL_DEV"))
    database = client["test"]

    threads = database["threads"]
    replies = database["replies"]

    pipeline = [
        {
            "$match": {"check": 1},
        },
        {
            "$lookup": {
                "from": "replies",
                "foreignField": "threadId",
                "localField": "threadId",
                "as": "replys"
            }
        }
        ,
        {
            "$merge": {
                "into": "threads",
                "whenMatched": "merge"
            }
        }
    ]

    try:
        threads.aggregate(pipeline, maxTimeMS=120000,allowDiskUse=True)
        print("Embedded thành công")
    except ExecutionTimeout as e:
        print("Lỗi timeout:", e)


join_collections()
