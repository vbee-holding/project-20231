import subprocess
import time
import threading
import sys
from flask import Flask
import os
import embedded
import crawlReply
import crawlSimilarThreads
import crawlThread

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

def crawl():
    global crawl_running
    while crawl_running:
        
        print('\n service run: ' ,i,file=sys.stdout)    
        crawlThread.crawl_thread()
        crawlReply.scrape_data()
        embedded.join_collections()

        time.sleep(120)
        # for s in sub_p:
        #     s.terminate()
        #     print('\nprocess killed')
        # sub_p.clear()
            
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


if(__name__ == '__main__'):
    __start__()
    app.run(debug=True,host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))
    
