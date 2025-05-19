import { CartService } from "../services/cart.service.js";
import { TicketDAO } from '../dao/ticket.dao.js';
import ticketDAO from '../dao/ticket.dao.js'; 

const cartService = new CartService();

export class CartController {
  async getCarts(req, res) {
    const result = await cartService.getAllCarts();
    res.json(result);
  }

  async getCartById(req, res) {
    const result = await cartService.getCartById(req.params.cid);
    res.json(result);
  }

  async createCart(req, res) {
    const result = await cartService.createCart();
    res.status(201).json(result);
  }

  async addProduct(req, res) {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    const result = await cartService.addProductToCart(cid, pid, quantity || 1);
    res.json(result);
  }

  async updateProducts(req, res) {
    const { cid } = req.params;
    const products = req.body;
    const result = await cartService.updateCartProducts(cid, products);
    res.json(result);
  }

  async updateQuantity(req, res) {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    const result = await cartService.updateProductQuantity(cid, pid, quantity);
    res.json(result);
  }

  async deleteProduct(req, res) {
    const { cid, pid } = req.params;
    const result = await cartService.removeProductFromCart(cid, pid);
    res.json(result);
  }

  async clearCart(req, res) {
    const { cid } = req.params;
    const result = await cartService.clearCart(cid);
    res.json(result);
  }

  async purchaseCart(req, res) {
    const { cid } = req.params;
    try {
      const result = await cartService.purchaseCart(cid);
      if (result.error) return res.status(400).json(result);
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
}