const Product = require("../models/product.model");
const cloudinary = require("../lib/cloudinary");
const video1 = "not found";

exports.createProduct = async function (req, res) {
  try {
    let thumnail;
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "auto",
      folder: "video",
    });
    if (result.resource_type == "video") {
      thumnail = cloudinary.url(result.public_id + ".jpg", {
        start_offset: "2",
        resource_type: "video",
        duration: "2",
      });
    }
    console.log("object", thumnail);
    const product = new Product({
      userId: req.jwt.sub.id,
      file: result?.secure_url || video1,
      thumnail: thumnail || result.secure_url,
      price: req.body.price,
      description: req.body.description,
      promotions: req.body.promotions,
    });
    try {
      await product.save();
      res.status(200).json({ code: 200, success: true, data: product });
    } catch (error) {
      res
        .status(500)
        .json({ code: 500, success: false, message: "Internal Server Error" });
    }
  } catch (error) {}
};

exports.getProductList = async function (req, res) {
  Product.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Product.",
      });
    });
};

exports.getProductDetailsById = function (req, res) {
  try {
    Product.findById(req.params.id, function (err, videos) {
      if (err) {
        return res
          .status(200)
          .json({ code: 200, success: false, data: "Invalid ID!" });
      }
      res.status(200).json({ code: 200, success: true, data: videos });
    });
  } catch (error) {
    res
      .status(500)
      .json({ code: 500, success: false, message: "Internal Server Error" });
  }
};

exports.getOwnProductDetails = function (req, res) {
  try {
    Product.find({ userId: req.jwt.sub.id }, function (err, products) {
      if (err) {
        return res
          .status(200)
          .json({ code: 200, success: false, data: "Invalid ID!" });
      }
      if (Product.length) {
        return res
          .status(200)
          .json({ code: 200, success: true, data: products });
      } else {
        return res
          .status(200)
          .json({ code: 200, success: false, data: "No Product found!" });
      }
    });
  } catch (error) {
    res
      .status(500)
      .json({ code: 500, success: false, message: "Internal Server Error" });
  }
};

exports.getProductsByUserId = function (req, res) {
  try {
    Product.find({ userId: req.params.id }, function (err, products) {
      if (err) {
        return res
          .status(200)
          .json({ code: 200, success: false, data: "Invalid ID!" });
      }
      if (Product.length) {
        return res
          .status(200)
          .json({ code: 200, success: true, data: products });
      } else {
        return res
          .status(200)
          .json({ code: 200, success: false, data: "No Product found!" });
      }
    });
  } catch (error) {
    res
      .status(500)
      .json({ code: 500, success: false, message: "Internal Server Error" });
  }
};

exports.updateProduct = async function (req, res) {
  try {
    
    let product = await Product.findById(req.params.id);

    let thumnail;
    let result;
    if (req.file) {
      console.log("1",req.file.path);
      result = await cloudinary.uploader.upload(req.file.path, {
        resource_type: "auto",
        folder: "video",
      });
      console.log("2");
      if (result.resource_type == "video") {
        thumnail = cloudinary.url(result.public_id + ".jpg", {
          start_offset: "2",
          resource_type: "video",
          duration: "2",
        });
        console.log("3");
      }
    }
  
    const data = {
      userId: req.body.userId || product.userId,
      file: result?.secure_url || product.file,
      thumnail: thumnail || result?.secure_url || product.thumnail,
      price: req.body.price || product.price,
      description: req.body.description || product.description,
      promotions: req.body.promotions || product.promotions,
    };
    product = await Product.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });
    res.status(200).json({
      code: 200,
      success: true,
      data: product,
      message: "Product is Updated Successfully!",
    });
  } catch (err) {
    res
      .status(500)
      .json({ code: 500, success: false, message: "Internal Server Error" });
  }
};

exports.deleteProduct = async function (req, res) {
  try {
    let product = await Product.findById(req.params.id);
    if (product) {
      await product.remove();
      return res.status(200).json({
        code: 200,
        success: true,
        data: "Product is Removed successfully!",
      });
    } else {
      return res
        .status(200)
        .json({ code: 200, success: false, data: "Product is not found!" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ code: 500, success: false, message: "Internal Server Error" });
  }
};
