module.exports = async (req, res) => {
  if (req.method == "GET") {
    res.send(
      "As we all stand on the shoulders of giants, tomorrow I hope to be the same for you."
    );
  }
};
