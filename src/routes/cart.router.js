// import express from "express";
// import { getAllCarts, getCartById, createCart, addProductToCart, updateCartProducts, updateProductQuantity, removeProductFromCart, clearCart, purchaseCart} from "../controllers/cart.controller.js";

// const router = express.Router();

// router.get("/", getAllCarts);

// router.get("/:cid", getCartById);

// router.post("/", createCart);

// router.post("/:cid/product/:pid", addProductToCart);
// router.post("/:cid/products/:pid", addProductToCart);

// router.put("/:cid", updateCartProducts);

// router.put("/:cid/product/:pid", updateProductQuantity);
// router.put("/:cid/products/:pid", updateProductQuantity);

// router.delete("/:cid/product/:pid", removeProductFromCart);
// router.delete("/:cid/products/:pid", removeProductFromCart);

// router.delete("/:cid", clearCart);

// router.post("/:cid/purchase", purchaseCart);

// export default router;

// routes/cart.routes.js
// routes/cart.router.js
import { Router } from "express";
import { CartController } from "../controllers/cart.controller.js";

const router = Router();
const cartController = new CartController();

router.get("/", cartController.getCarts);
router.get("/:cid", cartController.getCartById);
router.post("/", cartController.createCart);
router.post("/:cid/products/:pid", cartController.addProduct);
router.put("/:cid", cartController.updateProducts);
router.put("/:cid/products/:pid", cartController.updateQuantity);
router.delete("/:cid/products/:pid", cartController.deleteProduct);
router.delete("/:cid", cartController.clearCart);
router.post("/:cid/purchase", cartController.purchaseCart);

export default router;

