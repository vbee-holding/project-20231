from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()


def join_collections():
    client = MongoClient(os.getenv("MONGODB_URL_DEV"))
    database = client["test"]

    thread = database["threads"]
    reply = database["replies"]

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
