import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import allRoutes from "./routes/index.js";
import cors from "cors";
import env from "dotenv";

env.config();

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.set("strictQuery", false);

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // strictQuery: false,
  })
  .then(() => {
    console.log("DB Connected");
  })
  .catch((e) => {
    console.log(e);
  });

// pizza route
app.use("/api", allRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Listning on port ${PORT}`);
});
