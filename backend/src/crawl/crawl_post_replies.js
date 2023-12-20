const puppeteer = require("puppeteer");
const fs = require("fs");
const array = require("./data.json");

// Hàm crawl data của một url
const fetchData = async (url) => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

  // Thiết lập chuỗi User-Agent cho trình duyệt
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.61 Safari/537.36 Edg/94.0.992.31"
  );

  await page.goto(url, { waitUntil: "networkidle2" });

  const data = await page.evaluate(() => {
    const results = [];
    const items = document.querySelectorAll(".message-inner");
    items.forEach((item) => {
      const author =
        item.querySelector(".username span")?.innerText.trim() ||
        item.querySelector(".username")?.innerText.trim();

      const author_title = item
        .querySelector(".message-userTitle")
        ?.innerText.trim();

      const imgElement = item.querySelector(".message-avatar-wrapper a img");
      const img_url = imgElement ? imgElement.src : null;

      const text = item.querySelector(".bbWrapper");
      const reply = text.querySelector("blockquote");
      // Loại bỏ phần tử có class là blockquote khỏi text
      if (reply) {
        text.removeChild(reply);
      }
      const imgTags = text.querySelectorAll("img");
      // Loại bỏ các phần tử img khỏi text
      if (imgTags) {
        imgTags.forEach((imgTag) => {
          imgTag.parentNode.removeChild(imgTag);
        });
      }
      const text_content = text?.innerText.trim();
      // Lấy đoạn văn bản sau khi lọc bỏ các phần tử, kí tự dư thừa
      const content = text_content.replace(/\n|\n\n/g, "");

      const createAt = item
        .querySelector(".u-concealed a time")
        ?.innerText.trim();

      results.push({ author, author_title, img_url, content, createAt });
    });
    return results;
  });

  // Đóng phiên làm việc, giải phóng tài nguyên bộ nhớ
  await browser.close();
  console.log(data);
  return data;
};

// Hàm crawl data của các url và lưu tạm thời vào file
const scrapeData = async () => {
  const results = [];
  for (const child of array) {
    const url = child.link;
    const data = await fetchData(url);
    results.push(data);
  }

  try {
    fs.writeFileSync(
      "crawl_post_replies.json",
      JSON.stringify(results, null, 2)
    );
    console.log("Save successfully!");
  } catch (err) {
    console.error(err);
  }
};

scrapeData();
