import { CartDAO } from "../dao/cart.dao.js";
import { Product } from "../models/product.model.js";
import { isValidObjectId } from "../utils/validators.js";
import ticketDAO from '../dao/ticket.dao.js';

const cartDAO = new CartDAO();

export class CartService {
  async getAllCarts() {
    return await cartDAO.getCarts();
  }

  async getCartById(cid) {
    if (!isValidObjectId(cid)) return { error: "ID de carrito inválido" };
    const cart = await cartDAO.getCartById(cid);
    if (!cart) return { error: "Carrito no encontrado" };
    return cart;
  }

  async createCart() {
    return await cartDAO.createCart();
  }

  async addProductToCart(cid, pid, quantity = 1) {
    if (!isValidObjectId(cid) || !isValidObjectId(pid))
      return { error: "ID inválido" };
    if (!Number.isInteger(quantity) || quantity < 1)
      return { error: "Cantidad inválida" };

    const cart = await cartDAO.findCartById(cid);
    if (!cart) return { error: "Carrito no encontrado" };

    const product = await Product.findById(pid);
    if (!product) return { error: "Producto no encontrado" };

    const existing = cart.products.find(p => p.product.toString() === pid);
    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.products.push({ product: pid, quantity });
    }

    await cartDAO.updateCart(cart);
    return await cartDAO.getCartById(cid);
  }

  async updateCartProducts(cid, products) {
    if (!isValidObjectId(cid)) return { error: "ID de carrito inválido" };
    const cart = await cartDAO.findCartById(cid);
    if (!cart) return { error: "Carrito no encontrado" };
    cart.products = products;
    return await cartDAO.updateCart(cart);
  }

  async updateProductQuantity(cid, pid, quantity) {
    if (!isValidObjectId(cid) || !isValidObjectId(pid))
      return { error: "ID inválido" };
    if (!Number.isInteger(quantity) || quantity < 1)
      return { error: "Cantidad inválida" };

    const cart = await cartDAO.findCartById(cid);
    if (!cart) return { error: "Carrito no encontrado" };

    const prod = cart.products.find(p => p.product.toString() === pid);
    if (!prod) return { error: "Producto no encontrado en el carrito" };

    prod.quantity = quantity;
    return await cartDAO.updateCart(cart);
  }

  async removeProductFromCart(cid, pid) {
    if (!isValidObjectId(cid) || !isValidObjectId(pid));
  }

  async purchaseCart(cid) {
    if (!isValidObjectId(cid)) return { error: "ID de carrito inválido" };

    const cart = await cartDAO.findCartById(cid);
    if (!cart) return { error: "Carrito no encontrado" };

    let totalAmount = 0;
    for (const item of cart.products) {
      const product = await Product.findById(item.product);
      if (!product) return { error: `Producto no encontrado: ${item.product}` };
      if (product.stock < item.quantity) {
        return { error: `Stock insuficiente para el producto: ${product.title}` };
      }
      totalAmount += product.price * item.quantity;
    }

    for (const item of cart.products) {
      const product = await Product.findById(item.product);
      product.stock -= item.quantity;
      await product.save();
    }

    const ticketData = {
      code: this.generateTicketCode(),
      purchase_datetime: new Date(),
      amount: totalAmount,
      cartId: cid,
    };

    const ticket = await ticketDAO.createTicket(ticketData);

    cart.products = [];
    await cartDAO.updateCart(cart);

    return { message: "Compra realizada con éxito", ticket };
  }

  generateTicketCode() {
    return 'TCKT-' + Math.random().toString(36).substr(2, 9).toUpperCase();
  }
}

export default new CartService();