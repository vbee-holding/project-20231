import subprocess
import time

commands = [
    ["python", "scripts/crawlThread.py"],
    ["python", "scripts/crawlReply.py"],
    ["python", "scripts/crawlSimilarThreads.py"],
    ["python", "scripts/join.py"]
]

while True:
    for command in commands:
        subprocess.run(command)

    time.sleep(60)
