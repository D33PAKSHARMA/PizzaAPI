import mongoose from "mongoose";

const pizzaSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    size: { type: String, required: true },
    image: {
      public_id: String,
      url: String,
    },
  },
  { timestamps: true }
);

const pizzaschema = mongoose.model("newproduct", pizzaSchema);
export default pizzaschema;
