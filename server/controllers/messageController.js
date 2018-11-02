exports.addMessage = (req, res) => {
  console.log(req.body); // prints "bar"
  res.send("Yahoo message added!!!!");
};
