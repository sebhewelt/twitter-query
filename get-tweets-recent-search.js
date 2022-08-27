// Search for Tweets within the past seven days
// https://developer.twitter.com/en/docs/twitter-api/tweets/search/quick-start/recent-search

const { writeFileSync } = require("fs");
require("dotenv").config();
const {
  Parser,
  transforms: { flatten },
} = require("json2csv");
const { getRequest } = require("./get-request");

const username = process.env.USERNAME;
if (!username) throw new Error("USERNAME has to be provided");

const endpointUrl = "https://api.twitter.com/2/tweets/search/recent";

const queryfields = [
  "created_at",
  "id",
  "text",
  "public_metrics",
  "entities",
  "attachments",
];

const csvColumnsFields = [
  "created_at",
  "id",
  "text",
  "public_metrics.retweet_count",
  "public_metrics.like_count",
  "public_metrics.reply_count",
  "public_metrics.quote_count",
  "entities.hashtags",
  "entities.mentions",
  "entities.urls",
  "attachments.media_keys",
];

const json2csvParser = new Parser({
  fields: csvColumnsFields,
  transforms: [flatten({ objects: true, arrays: false })],
});

(async () => {
  try {
    // Make request
    const params = {
      query: `from:${username} -is:retweet`,
      "tweet.fields": queryfields.join(),
    };
    const response = await getRequest(username, endpointUrl, params);
    const { data } = response;

    const csv = json2csvParser.parse(data);
    const today = new Date().toISOString().substring(0, 10);

    writeFileSync(`${process.env.FILE_NAME}-${today}.csv`, csv, "utf8");
  } catch (e) {
    console.log(e);
    process.exit(-1);
  } finally {
    console.log("Done!");
  }
  process.exit();
})();
