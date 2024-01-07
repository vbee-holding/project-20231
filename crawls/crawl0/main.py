import subprocess
import time

commands = [
    ["python", "scripts/crawlThread.py"],
    ["python", "scripts/crawlReply.py"],
    ["python", "scripts/embedded.py"]
]

while True:
    for command in commands:
        subprocess.run(command)

    time.sleep(180)
