const needle = require("needle");

/**
 * Description
 * @param {string} username twitter username
 * @param {string} endpointUrl twitter API v2 endpoint's base url
 * @param {object} params query params
 * @returns {object}
 */
exports.getRequest = async function getRequest(username, endpointUrl, params) {
  const token = process.env.BEARER_TOKEN;

  const res = await needle("get", endpointUrl, params, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  if (res.body) {
    return res.body;
  } else {
    throw new Error("Unsuccessful request");
  }
};
