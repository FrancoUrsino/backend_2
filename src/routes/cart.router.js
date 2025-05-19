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