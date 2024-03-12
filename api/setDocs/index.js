const { setDocs } = require("../../firebase");

module.exports = async (req, res) => {
  const {
    body: { collectionName, docs },
  } = req;

  res.send(await setDocs(collectionName, docs));
};
