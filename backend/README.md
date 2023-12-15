### Installation

- First, clone [this repository](https://github.com/vbee-holding/project-20231.git) to your local machine

```bash
$ git clone https://github.com/vbee-holding/project-20231.git
$ cd backend
```

- Then, run the following command to install dependencies

```bash
$ npm install or npm i 
```

### Config

Create a .env file in the backend folder and add the following data

```bash
PORT=3003
MONGODB_URL=mongodb+srv://project-20231:20231@project-20231.wmwqcgv.mongodb.net/
GOOGLE_CLIENT_ID=406226991107-63n18mi29l79893ah79nj0294thngrsg.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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
CALLBACK_URL=http://localhost:3003/auth/google/callback
SECRET_KEY=SECRET_KEY
```


### Running

```bash
$ npm start
```

Open [http://localhost:3003](http://localhost:3003) with your browser to see the result.
