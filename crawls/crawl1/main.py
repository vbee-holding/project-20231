import subprocess
import time
import threading
import sys
from flask import Flask

commands = [
    ["python", "scripts/crawlThread.py"],
    ["python", "scripts/crawlReply.py"],
    ["python", "scripts/embedded.py"]
]

app = Flask(__name__)

@app.route('/')
def hello():
    return 'Hello, What are you doing? Crawl service is running!!!'

i = 0
crawl_running = False

sub_p = []
def crawl():
    global crawl_running
    global sub_p
    while crawl_running:
        for command in commands:
            global i
            i += 1
            print('\nloop: ' ,i,file=sys.stdout)    
            sub_p.append(subprocess.Popen(command,stdout=None,shell=True))
        time.sleep(120)
        for s in sub_p:
            s.terminate()
            print('\nprocess killed')
        sub_p.clear()
            
thread_crawl =None
@app.route('/start')
def start():
    global thread_crawl
    global crawl_running
    if(not crawl_running):
        thread_crawl = threading.Thread(target=crawl)
        thread_crawl.daemon = True
        crawl_running = True
        thread_crawl.start()
        print('Crawl service starting \n',file=sys.stdout)
        return 'Crawl service starting'
    return 'Crawl service started yet'

def __start__():
    global thread_crawl
    global crawl_running
    if(not crawl_running):
        thread_crawl = threading.Thread(target=crawl)
        thread_crawl.daemon = True
        crawl_running = True
        thread_crawl.start()
        print('Crawl service starting \n')

@app.route('/stop')
def stop():
    global crawl_running
    if(crawl_running):
        crawl_running = False
        global sub_p
        for s in sub_p:
            s.terminate()
            print('\nprocess killed')
        sub_p.clear()
        return 'Crawl service stopped'
    return 'Crawl service stopped yet'

if(__name__ == '__main__'):
    __start__()
    app.run(debug=True)
    
