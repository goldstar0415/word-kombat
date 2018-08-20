const axios = require("axios");
const fs = require("fs");
const path = require("path");
const pmap = require("p-map");
const cheerio = require("cheerio");
const imagesScrapper = require("images-scraper");
const googleImagesScrapper = new imagesScrapper.Google();

async function scrape() {

  const dictionaryUrl = "https://raw.githubusercontent.com/first20hours/google-10000-english/master/20k.txt";
  const definitionDictionary = "https://www.merriam-webster.com/dictionary/";

  const topWordsRequests = (await axios.get(dictionaryUrl))
    .data
    .split("\n")
    .filter(item => item.length > 4);

  const topWordsMapper = async (value, index) => {
    if (index <= 5) { // Enable Tor proxy to prevent rate limiting issue
      const image = await googleImagesScrapper.list({
        keyword: value,
        num: 1,
        rlimit: "10",
        timeout: 15000
      });

      const definition = await axios.get(definitionDictionary + value);
      const $ = cheerio.load(definition.data);
      const hint = $("p.definition-inner-item > span:first-child").text();

      const result = {
        index,
        value,
        hint,
        image: image[0].thumb_url
      };

      console.info("FETCHED WORD: %j", result);

      return result;
    }
  };

  const topWords = await pmap(topWordsRequests, topWordsMapper, {concurrency: 1});

  fs.writeFileSync(path.join(__dirname, "..", "data", "words.json"), JSON.stringify(topWords));
}

scrape();
