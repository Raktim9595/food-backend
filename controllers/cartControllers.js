const addToCart = async (req, res) => {
  try {
    console.log(req.body);
    res.status(200).send("message recieved");
  } catch (e) {
    console.log(e.message);
  }
}

module.exports = {
  addToCart
}