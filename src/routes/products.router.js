import express from "express";
import ProductManager from "../managers/product.manager.js";

const router = express.Router();
const productManager = new ProductManager();

router.get("/", async (req, res) => {
  try {
    let { limit = 3, page = 1, query, sort, category, minPrice, maxPrice, available } = req.query;

    limit = Number(limit);
    page = Number(page);
    minPrice = minPrice ? Number(minPrice) : undefined;
    maxPrice = maxPrice ? Number(maxPrice) : undefined;
    available = available === "true";

    const data = await productManager.getProducts({ limit, page, query, sort, category, minPrice, maxPrice, available });

    res.json({
      status: "success",
      products: data.docs,
      page: data.page,
      totalPages: data.totalPages,
      hasNextPage: data.hasNextPage,
      hasPrevPage: data.hasPrevPage,
      nextPage: data.nextPage,
      prevPage: data.prevPage,
    });

  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).json({ status: "error", message: "Error al obtener productos", error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productManager.getProductById(id);

    if (!product) {
      return res.status(404).json({ status: "error", message: "Producto no encontrado" });
    }

    res.json({ status: "success", product });
  } catch (error) {
    console.error("Error al obtener producto:", error);
    res.status(500).json({ status: "error", message: "Error al obtener el producto", error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, description, price, stock, category, image } = req.body;
    if (!title || !price || !category || isNaN(price) || price <= 0) {
      return res.status(400).json({ status: "error", message: "Faltan datos: fijate de incluir título, categoría y precio positivo!" });
    }
    

    const newProduct = await productManager.addProduct({ title, description, price, stock, category, image });
    res.status(201).json({ status: "success", message: "Producto agregado", product: newProduct });
  } catch (error) {
    console.error("Error al agregar producto:", error);
    res.status(500).json({ status: "error", message: "Error al agregar producto", error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProduct = await productManager.updateProduct(id, req.body);

    if (!updatedProduct) {
      return res.status(404).json({ status: "error", message: "Producto no encontrado" });
    }

    res.json({ status: "success", message: "Producto actualizado", product: updatedProduct });
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    res.status(500).json({ status: "error", message: "Error al actualizar producto", error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await productManager.deleteProduct(id);

    if (!deletedProduct) {
      return res.status(404).json({ status: "error", message: "Producto no encontrado" });
    }

    res.json({ status: "success", message: "Producto eliminado" });
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    res.status(500).json({ status: "error", message: "Error al eliminar producto", error: error.message });
  }
});

export default router;