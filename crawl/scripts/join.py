from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()


def join_collections():
    client = MongoClient(os.getenv("MONGODB_URL_DEV"))
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
    print("Join thành công")


join_collections()
