import nc from "next-connect";
import multer from "multer";
import { join } from "path";
import connectMongo from "../../../../utils/connectMongo";
import { errorHandler, responseHandler } from "../../../../utils/common";
import { staticResourceUrl } from "../../../../config";
import Category from "../../../../models/category";
import { middleware } from "../../../../utils/middleware";

export const config = {
  api: {
    bodyParser: false,
  },
};
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, join(process.cwd(), "public", "uploads"));
    },
    filename: function (req, file, cb) {
      cb(null, new Date().getTime() + "-" + file.originalname);
    },
  }),
});

const handler = nc({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
})
  .use(upload.single("imgCategory"))
  .post(async (req, res) => {
    try {
      console.log("Body", { ...req.body });
      console.log("File", req.file);

      await connectMongo();
      console.log("connected");
      const category = new Category({
        ...req.body,
        categoryImg: staticResourceUrl + req.file.filename,
      });
      console.log("category api", category);
      // // category =

      console.log("category saving...");
      const saveCategory = await category.save();
      if (saveCategory) {
        responseHandler(saveCategory, res);
        console.log("category saved...");
      } else {
        errorHandler("ERREUR BASE DE DONNEE", res);
      }
      // res.status(201).json({ category: category });
      // responseHandler(req.body, res);
    } catch (error) {
      errorHandler(error, res);
    }
    // categoryImg
  });

export default middleware(handler);
