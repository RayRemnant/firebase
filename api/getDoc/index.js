const { getDocs } = require("../../firebase");

module.exports = async (req, res) => {
  const {
    body: { collectionName, docId },
  } = req;

  res.send(await getDocs(collectionName, docId));
};
