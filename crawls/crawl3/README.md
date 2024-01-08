### Crawl data from page 1401 to page 2100
### Installation

- First, clone [this repository](https://github.com/vbee-holding/project-20231.git) to your local machine

```bash
$ git clone https://github.com/vbee-holding/project-20231.git
$ cd crawls
$ cd crawl3
```

- Then, run the following command to install dependencies

```bash
$ pip install -r requirements.txt 
```

### Config

Create a .env file in the backend folder and add the following data

```bash
MONGODB_URL_DEV=
MONGODB_URL_PRODUCT=
```


### Running

```bash
$ py main.py
```
