var db = require("./db");

const productSchema = new db.mongoose.Schema(
  {
    name: { type: String, require: true },
    price: { type: Number, require: true },
    desc: { type: String, require: false },
    image: { type: String, require: true },
    cateId: { type: db.mongoose.Schema.Types.ObjectId, ref: "cateModel" },
  },
  {
    collection: "products",
  }
);

let productModel = db.mongoose.model("productModel", productSchema);

const cateSchema = db.mongoose.Schema(
  {
    name: { type: String, require: true },
  },
  { collection: "categories" }
);

let cateModel = db.mongoose.model("cateModel", cateSchema);

module.exports = {
  productModel,
  cateModel,
  db
};
