// dao/cart.dao.js
import { Cart } from "../models/cart.model.js";

export class CartDAO {
  async getCarts() {
    return await Cart.find().populate("products.product");
  }

  async getCartById(cid) {
    return await Cart.findById(cid).populate("products.product");
  }

  async createCart() {
    return await Cart.create({});
  }

  async updateCart(cart) {
    return await cart.save();
  }

  async findCartById(cid) {
    return await Cart.findById(cid);
  }

  async deleteCartProducts(cid) {
    const cart = await Cart.findById(cid);
    if (!cart) return null;
    cart.products = [];
    await cart.save();
    return cart;
  }
}
