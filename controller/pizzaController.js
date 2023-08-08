import pizzaschema from "../models/pizzaschema.js";
import cloudinary from "../utils/cloudinary.js";

const pizzas = {
  async welcome(req, res) {
    res.status(200).send("Welcome to Pizza App");
  },
  async getpizza(req, res) {
    // res.send("this is pizza");
    await pizzaschema
      .find()
      .then((response) => {
        res.json(response);
      })
      .catch((err) => console.log(err));
  },

  async uploadpizza(req, res) {
    const { name, price, size } = req.body; //destructuring(taking) name,price,size from req body

    try {
      const file = await cloudinary.uploader.upload(req.file.path);
      // console.log(file);

      const newPizza = await pizzaschema.create({
        name,
        price,
        size,
        image: {
          public_id: file.public_id,
          url: file.secure_url,
        },
      });

      res.json(newPizza);
    } catch (err) {
      console.log(err);
    }
  },

  async getsinglepizza(req, res) {
    try {
      const doc = await pizzaschema.findById(req.params.id);
      res.status(200).send(doc);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },

  async getPizzas(req, res) {
    try {
      let doc = await pizzaschema.find({
        _id: { $in: req.body.ids },
      });
      res.json(doc);
    } catch (error) {
      console.log(error);
    }
  },
};

export default pizzas;
