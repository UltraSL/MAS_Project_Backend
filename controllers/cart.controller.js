const Cart = require("../models/cart.model");
const Product = require("../models/product.model");

module.exports.add_cart_item = async (req, res) => {
  const userId = req.jwt.sub.id;
  const { productId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ userId });
    let item = await Product.findOne({ _id: productId });

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }
    const price = item.price;
    const name = item.description;
    const thumnail = item.thumnail;

    if (cart) {
      console.log("des: ", name);

      let itemIndex = cart.items.findIndex((p) => p.productId == productId);

      if (itemIndex > -1) {
        let productItem = cart.items[itemIndex];
        productItem.quantity += quantity;
        cart.items[itemIndex] = productItem;
      } else {
        cart.items.push({ productId, name, quantity, price, thumnail });
      }
      console.log(price);
      cart.bill += quantity * price;
      cart = await cart.save();
      return res.status(201).json({
        success: true,
        message: "Item added to cart",
        cart: cart,
      });
    } else {
      const newCart = await Cart.create({
        userId,
        items: [{ productId, name, quantity, price, thumnail }],
        bill: quantity * price,
      });
      console.log(newCart);
      return res.status(201).json({
        success: true,
        message: "Item added to cart",
        cart: newCart,
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

module.exports.get_cart_items = async (req, res) => {
  const userId = req.jwt.sub.id;
  try {
    let cart = await Cart.findOne({ userId });
    if (cart && cart.items.length > 0) {
      return res.status(200).json({
        code: 200,
        success: true,
        data: cart,
        message: "Cart items found",
      });
    } else {
      return res.status(400).json({
        message: "Cart is empty",
        cart: cart,
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

module.exports.update_cart_item = async (req, res) => {
  const userId = req.jwt.sub.id;
  const { productId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ userId });
    let item = await Product.findOne({ _id: productId });

    if (!item) return res.status(404).json({
        success: false,
        message: "Item not found",
    })

    if (!cart) return res.status(400).json({
        success: false,
        message: "Cart not found",
    })
    else {
      let itemIndex = cart.items.findIndex((p) => p.productId == productId);

      if (itemIndex == -1)
        return res.status(404).json({
            success: false,
            message: "Item not found in cart!"
        })
      else {
        let productItem = cart.items[itemIndex];
        productItem.quantity = quantity;
        cart.items[itemIndex] = productItem;
      }
      cart.bill = cart.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      cart = await cart.save();
      return res.status(201).json({
        success: true,
        cart: cart,
        message: "Item updated in cart"
        
      })
    }
  } catch (err) {
    console.log("Error in update cart", err);
    res.status(500).json({
        success: false,
        message: "Something went wrong"
    });
  }
};

module.exports.delete_item = async (req, res) => {
  const userId = req.jwt.sub.id;
  const productId = req.params.itemId;
  try {
    let cart = await Cart.findOne({ userId });
    let itemIndex = cart.items.findIndex((p) => p.productId == productId);
    if (itemIndex > -1) {
      let productItem = cart.items[itemIndex];
      cart.bill -= productItem.quantity * productItem.price;
      cart.items.splice(itemIndex, 1);
    }
    cart = await cart.save();
    return res.status(201).json({
        success: true,
        cart: cart,
        message: "Item deleted from cart"
        
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
        success: false,
        message: "Something went wrong"
    });
  }
};

module.exports.delete_cart = async (req, res) => {
  const userId = req.jwt.sub.id;
  try {
    let cart = await Cart.findOne({ userId });
    if (cart) {
      cart.items = [];
      cart.bill = 0;
      cart = await cart.save();
      return res.status(201).json({
        success: true,
        cart: cart,
        message: "Cart deleted"
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Cart not found"
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
        success: false,
        message: "Something went wrong"
    });
  }
}