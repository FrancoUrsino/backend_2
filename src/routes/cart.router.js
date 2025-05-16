import express from "express";
import { getAllCarts, getCartById, createCart, addProductToCart, updateCartProducts, updateProductQuantity, removeProductFromCart, clearCart, purchaseCart} from "../controllers/cart.controller.js";

const router = express.Router();

router.get("/", getAllCarts);

router.get("/:cid", getCartById);

router.post("/", createCart);

router.post("/:cid/product/:pid", addProductToCart);
router.post("/:cid/products/:pid", addProductToCart);

router.put("/:cid", updateCartProducts);

router.put("/:cid/product/:pid", updateProductQuantity);
router.put("/:cid/products/:pid", updateProductQuantity);

router.delete("/:cid/product/:pid", removeProductFromCart);
router.delete("/:cid/products/:pid", removeProductFromCart);

router.delete("/:cid", clearCart);

router.post("/:cid/purchase", purchaseCart);

export default router;
