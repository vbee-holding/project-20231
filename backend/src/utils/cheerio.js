const axios = require('axios');
const cheerio = require('cheerio');
const moment = require('moment');
const { MongoClient } = require('mongodb');

async function fetchData(url) {
  try {
    const client = new MongoClient(process.env.MONGODB_URL_DEV, { useUnifiedTopology: true });
    await client.connect();
    const database = client.db('test');
    const collection_reply = database.collection('replies');
    const headers = {
      'Accept': '*/*',
      'User-Agent': 'Thunder Client (https://www.thunderclient.com)'
    };

    const response = await axios.get(url, { headers });
    if (response.status === 200) {
      const $ = cheerio.load(response.data);
      $.html();
      const items = $('.message-inner');
      const result = [];
      const date_format = 'MMM DD, YYYY [at] hh:mm A';

      for (const item of items) {
        const replyId = $(item).find('.message-userContent').attr('data-lb-id');
        const existing_reply = await collection_reply.findOne({ replyId });

        const blockquote = $(item).find('.bbWrapper blockquote');
        if (!existing_reply && replyId) {
          const createdAt = $(item).find('time.u-dt').attr('datetime');
          // console.log(createdAt);
          const createdTime = moment(createdAt, "%Y-%m-%dT%H:%M:%S%z").toDate();
          // console.log(createdTime);
          const author_title = $(item).find('h5.message-userTitle').text().trim();
          // console.log(author_title);
          const author_element = $(item).find('a.username span');
          const author = author_element.text().trim() || $(item).find('a.username').text().trim();
          // console.log(author);
          const avatar_url_element = $(item).find('.message-avatar-wrapper');
          const avatar_url = avatar_url_element.find('img').attr('src') || avatar_url_element.find('span').text().trim();
          const text_content_element = $(item).find('.bbWrapper');
          text_content_element.find('blockquote').remove();
          // text_content_element.find('img').remove();
          const content = text_content_element.clone().children().remove().end().text().trim().replace(/\t|\n/g, "");;
          let contentElement = `<div class="bbWrapper">${text_content_element.html()}</div>`;
          contentElement = contentElement.replace(/\t|\n/g, "");
          // console.log(content);
          const threadId = url.substring(17).split('/')[0];
          // console.log(threadId);
          result.push({
            replyId: replyId,
            author: author,
            avatarUrl: avatar_url,
            authorTitle: author_title,
            content: content,
            contentElement: contentElement,
            threadId: threadId,
            createdTime: createdTime,
            timestamp: new Date()
          });
        }
      }
      return result;
    } else {
      console.log(`Request to ${url} failed: ${response.status}`);
    }
  } catch (error) {
    console.log(`Connection error: ${error}`);
  }

  return [];
}

// async function scrapeData() {
//   try {
//     const client = new MongoClient(process.env.MONGODB_URL_DEV, { useUnifiedTopology: true });
//     await client.connect();
//     const database = client.db('test');
//     const collection_thread = database.collection('threads');
//     const collection_reply = database.collection('replies');

//     const data = await collection_thread.find({ check: 1 }, { threadId: 1, lastPage: 1 }).toArray();

//     for (const child of data) {
//       const all_results = [];
//       const n = child.lastPage;

//       for (let i = 1; i <= n; i++) {
//         const url = `https://voz.vn/t/${child.threadId}/page-${i}`;
//         const fetched_data = await fetch_data(url);
//         console.log(url);
//         if (fetched_data && fetched_data.length > 0) {
//           all_results.push(...fetched_data);
//         }
//       }

//       if (all_results.length > 0) {
//         await collection_reply.insertMany(all_results);
//         console.log('Data saved to MongoDB');
//       } else {
//         console.log('No new data added');
//       }
//     }
//   } catch (error) {
//     console.error(`Error while crawling and saving data to MongoDB: ${error}`);
//   } finally {
//     client.close();
//   }
// }

module.exports = { fetchData };
