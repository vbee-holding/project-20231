from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()


def join_collections():
    # client = MongoClient(os.getenv("MONGODB_URL_DEV"))
    client = MongoClient("mongodb://localhost:27017/")
    database = client["test"]

    threads = database["threads"]
    database["replies"]

    pipeline = [
        {
            "$lookup": {
                "from": "replies",
                "localField": "threadId",
                "foreignField": "threadId",
                "as": "replys"
            }
        },
        {
            "$merge": {
                "into": "threads",
                "whenMatched": "merge"
            }
        }
    ]

    threads.aggregate(pipeline)
    print("Embedded thành công")


join_collections()
