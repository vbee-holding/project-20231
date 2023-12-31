import concurrent.futures
import subprocess

# Định nghĩa các lệnh bạn muốn chạy
commands = [
    ["python", "scripts/crawlThread.py"],
    ["python", "scripts/crawlReply.py"],
    ["python", "scripts/join.py"]
]


def run_command(command):
    subprocess.run(command)


# Sử dụng ThreadPoolExecutor để chạy các lệnh đồng thời
with concurrent.futures.ThreadPoolExecutor() as executor:
    executor.map(run_command, commands)
