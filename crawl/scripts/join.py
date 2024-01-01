from pymongo import MongoClient


def join_collections():
    client = MongoClient("mongodb+srv://project-20231:20231@project-20231.wmwqcgv.mongodb.net")
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
