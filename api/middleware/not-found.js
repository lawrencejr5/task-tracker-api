const notFound = (req, res) => {
  return res.status(404).send("Are u lost??");
};

module.exports = notFound;
