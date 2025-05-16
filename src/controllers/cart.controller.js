import CartManager from "../managers/cart.manager.js";

const cartManager = new CartManager();

export const getAllCarts = async (req, res) => {
  try {
    const carts = await cartManager.getCarts();
    res.json({ status: "success", carts });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los carritos" });
  }
};

export const getCartById = async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await cartManager.getCartById(cid);
    if (!cart) return res.status(404).json({ error: "Carrito no encontrado" });
    res.json({ status: "success", cart });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el carrito" });
  }
};

export const createCart = async (req, res) => {
  try {
    const newCart = await cartManager.createCart();
    res.status(201).json({ status: "success", cart: newCart });
  } catch (error) {
    res.status(500).json({ error: "Error al crear el carrito" });
  }
};

export const addProductToCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    const result = await cartManager.addProductToCart(cid, pid, quantity);
    if (result?.error) return res.status(404).json(result);
    res.json({ status: "success", cart: result });
  } catch (error) {
    console.error("Error en addProductToCart:", error);
    res.status(500).json({ error: "Error al agregar producto al carrito", message: error.message });
  }
};

export const updateCartProducts = async (req, res) => {
  try {
    const { cid } = req.params;
    const { products } = req.body;
    const result = await cartManager.updateCartProducts(cid, products);
    if (result?.error) return res.status(404).json(result);
    res.json({ status: "success", cart: result });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar los productos del carrito" });
  }
};

export const updateProductQuantity = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    const result = await cartManager.updateProductQuantity(cid, pid, quantity);
    if (result?.error) return res.status(404).json(result);
    res.json({ status: "success", cart: result });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar la cantidad del producto" });
  }
};

export const removeProductFromCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const result = await cartManager.removeProductFromCart(cid, pid);
    if (result?.error) return res.status(404).json(result);
    res.json({ status: "success", cart: result });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el producto del carrito" });
  }
};

export const clearCart = async (req, res) => {
  try {
    const { cid } = req.params;
    const result = await cartManager.clearCart(cid);
    if (result?.error) return res.status(404).json(result);
    res.json({ status: "success", message: "Carrito vaciado", cart: result });
  } catch (error) {
    res.status(500).json({ error: "Error al vaciar el carrito" });
  }
};

export const purchaseCart = async (req, res) => {
  try {
    const { cid } = req.params;
    const result = await cartManager.purchaseCart(cid);
    if (result?.error) return res.status(404).json(result);
    res.json({ status: "success", message: "Compra realizada con éxito", result });
  } catch (error) {
    res.status(500).json({ error: "Error al realizar la compra" });
  }
};