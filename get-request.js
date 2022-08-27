const needle = require("needle");

/**
 * Description
 * @param {string} username twitter username
 * @param {string} endpointUrl twitter API v2 endpoint's base url
 * @param {array} params by default, only the Tweet ID and text fields are returned. More: https://developer.twitter.com/en/docs/twitter-api/data-dictionary/object-model/tweet
 * @returns {object}
 */
exports.getRequest = async function getRequest(username, endpointUrl, params) {
  const token = process.env.BEARER_TOKEN;

  const res = await needle("get", endpointUrl, params, {
    headers: {
      "User-Agent": "v2RecentSearchJS",
      authorization: `Bearer ${token}`,
    },
  });

  if (res.body) {
    return res.body;
  } else {
    throw new Error("Unsuccessful request");
  }
};
