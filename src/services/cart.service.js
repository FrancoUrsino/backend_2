import { Cart } from "../models/cart.model.js";

export const createCart = async () => {
  try {
    const newCart = await Cart.create({ products: [] });
  } catch (error) {
    console.error('Error al crear el carrito:', error);
    throw error;
  }
};
