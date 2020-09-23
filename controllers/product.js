const formidable = require("formidable");
const fs = require("fs");
const _ = require("lodash");
const { errorHandler } = require("../helpers/dbErrorHandler");
const Product = require("../models/product");

exports.create = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        err: "photo can not be uploaded",
      });
    }
    // // check for all fields
    // const { name, description, price, category, quantity, shipping } = fields;

    // if (
    //   !name ||
    //   !description ||
    //   !price ||
    //   !category ||
    //   !quantity ||
    //   !shipping
    // ) {
    //   return res.status(400).json({
    //     err: "All fields are required",
    //   });
    // }

    let product = new Product(fields);
    if (!files.photo) {
      console.log("there is no files.photo");
    }
    if (files.photo) {
      console.log("FILES PHOTO: ", files.photo);
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    }
    product.save((err, result) => {
      if (err) {
        console.log("PRODUCT CREATE ERROR ", err);
        return res.status(400).json({
          err,
        });
      }
      res.json(result);
    });
  });
};
