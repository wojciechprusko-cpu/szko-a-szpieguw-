import https from "https";
import fs from "fs";

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36"
      }
    }, (res) => {
      let data = "";
      res.on("data", (chunk) => { data += chunk; });
      res.on("end", () => resolve(data));
      res.on("error", (err) => reject(err));
    }).on("error", (err) => reject(err));
  });
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36"
      }
    }, (res) => {
      res.pipe(file);
      file.on("finish", () => {
        file.close();
        resolve();
      });
    }).on("error", (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function getImageUrl(fileName) {
  const pageUrl = `https://spyschool.fandom.com/wiki/File:${fileName}`;
  console.log(`Fetching page: ${pageUrl}`);
  try {
    const html = await fetchUrl(pageUrl);
    // Search for static.wikia.nocookie.net/spyschool/images...
    const regex = /https:\/\/static\.wikia\.nocookie\.net\/spyschool\/images\/[^"\s]+/g;
    const matches = html.match(regex);
    if (matches && matches.length > 0) {
      // Find the one that has the filename or is the main image source
      // Clean up any html entities like &amp;
      let imgUrl = matches[0].replace(/&amp;/g, "&");
      // Remove any thumbnail parameters like /scale-to-width-down/...
      const thumbIndex = imgUrl.indexOf("/revision/latest");
      if (thumbIndex !== -1) {
        imgUrl = imgUrl.substring(0, thumbIndex + "/revision/latest".length);
      }
      return imgUrl;
    }
  } catch (e) {
    console.error(`Error fetching page ${pageUrl}:`, e);
  }
  return null;
}

async function run() {
  const characters = [
    { file: "Erica_Hale.png", dest: "src/assets/images/erica_hale_original.png" },
    { file: "Cyrus_Hale.png", dest: "src/assets/images/cyrus_hale_original.png" },
    { file: "Zoe_Cene.png", dest: "src/assets/images/zoe_cene_original.png" },
    { file: "Joshua_Hallal.png", dest: "src/assets/images/joshua_hallal_original.png" },
    { file: "Leo_Shang.png", dest: "src/assets/images/leo_shang_original.png" }
  ];

  for (const char of characters) {
    console.log(`-----------------------------------`);
    console.log(`Processing: ${char.file}`);
    const imgUrl = await getImageUrl(char.file);
    if (imgUrl) {
      console.log(`Found image URL: ${imgUrl}`);
      console.log(`Downloading to: ${char.dest}`);
      await downloadFile(imgUrl, char.dest);
      console.log(`Downloaded successfully! Size: ${fs.statSync(char.dest).size} bytes`);
    } else {
      console.log(`Could not find image URL for ${char.file}`);
    }
  }
}

run();
