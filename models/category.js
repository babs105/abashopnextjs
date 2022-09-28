import mongoose, { Schema, model, models } from "mongoose";
const categorySchema = new Schema({
  categoryName: String,
  title: String,
  description: String,
  categoryImg: String,
  type: String,
});

const Category = models.Category || model("Category", categorySchema);
export default Category;
