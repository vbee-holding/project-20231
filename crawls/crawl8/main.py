import subprocess

commands = [
    ["python", "scripts/crawlThread.py"],
    ["python", "scripts/crawlReply.py"],
    ["python", "scripts/embedded.py"]
]

for command in commands:
    subprocess.run(command)
