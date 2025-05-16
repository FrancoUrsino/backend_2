import { Cart } from "../models/cart.model.js";
import { Product } from "../models/product.model.js";
import { isValidObjectId } from "../utils/validators.js";

class CartManager {
  async getCarts() {
    return await Cart.find().populate("products.product");
  }

  async getCartById(cid) {
    if (!isValidObjectId(cid)) return { error: "ID de carrito inválido" };
    return await Cart.findById(cid).populate("products.product");
  }

  async createCart() {
    return await Cart.create({});
  }

  async addProductToCart(cid, pid, quantity = 1) {
    if (!isValidObjectId(cid)) return { error: "ID de carrito inválido" };
    if (!isValidObjectId(pid)) return { error: "ID de producto inválido" };
    if (!Number.isInteger(quantity) || quantity < 1) {
      return { error: "Cantidad inválida" };
    }
  
    const cart = await Cart.findById(cid);
    if (!cart) return { error: "Carrito no encontrado" };
  
    const productExists = await Product.findById(pid);
    if (!productExists) return { error: "Producto no encontrado" };
  
    const productIndex = cart.products.findIndex(p => p.product.toString() === pid);
  
    if (productIndex > -1) {
      cart.products[productIndex].quantity += quantity;
    } else {
      cart.products.push({ product: pid, quantity });
    }
  
    await cart.save();
    return await Cart.findById(cid).populate("products.product");
  }
  
  async updateCartProducts(cid, products) {
    if (!isValidObjectId(cid)) return { error: "ID de carrito inválido" };
    const cart = await Cart.findById(cid);
    if (!cart) return { error: "Carrito no encontrado" };

    cart.products = products;
    await cart.save();
    return cart;
  }

  async updateProductQuantity(cid, pid, quantity) {
    if (!isValidObjectId(cid)) return { error: "ID de carrito inválido" };
    if (!isValidObjectId(pid)) return { error: "ID de producto inválido" };
    if (!Number.isInteger(quantity) || quantity < 1) {
      return { error: "Cantidad inválida" };
    }

    const cart = await Cart.findById(cid);
    if (!cart) return { error: "Carrito no encontrado" };

    const product = cart.products.find(p => p.product.toString() === pid);
    if (!product) return { error: "Producto no encontrado en el carrito" };

    product.quantity = quantity;
    await cart.save();
    return cart;
  }

  async removeProductFromCart(cid, pid) {
    if (!isValidObjectId(cid)) return { error: "ID de carrito inválido" };
    if (!isValidObjectId(pid)) return { error: "ID de producto inválido" };

    const cart = await Cart.findById(cid);
    if (!cart) return { error: "Carrito no encontrado" };

    cart.products = cart.products.filter(p => p.product.toString() !== pid);
    await cart.save();
    return cart;
  }

  async clearCart(cid) {
    if (!isValidObjectId(cid)) return { error: "ID de carrito inválido" };

    const cart = await Cart.findById(cid);
    if (!cart) return { error: "Carrito no encontrado" };

    cart.products = [];
    await cart.save();
    return cart;
  }

  async purchaseCart(cid) {
    if (!isValidObjectId(cid)) return { error: "ID de carrito inválido" };

    const cart = await Cart.findById(cid).populate("products.product");
    if (!cart) return { error: "Carrito no encontrado" };

    const notEnoughStock = [];
    const purchasedItems = [];

    for (const item of cart.products) {
      const prod = item.product;
      if (prod.stock < item.quantity) {
        notEnoughStock.push({ id: prod._id, name: prod.title });
      } else {
        prod.stock -= item.quantity;
        await prod.save();
        purchasedItems.push({
          id: prod._id,
          name: prod.title,
          quantity: item.quantity
        });
      }
    }

    await cart.save();
    return await Cart.findById(cid).populate("products.product");
  }
}

export default CartManager;