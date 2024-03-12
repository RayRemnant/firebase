const { getDocs } = require("../../firebase");

module.exports = async (req, res) => {
  const {
    body: { collectionName },
  } = req;

  res.send(await getDocs(collectionName));
};
