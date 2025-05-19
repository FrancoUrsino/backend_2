import productService from '../services/product.service.js';

export const getAllProducts = async (req, res) => {
  const products = await productService.getAllProducts();
  res.json(products);
};

export const getProductById = async (req, res) => {
  const result = await productService.getProductById(req.params.pid);
  if (result?.error) return res.status(400).json(result);
  res.json(result);
};

export const createProduct = async (req, res) => {
  const result = await productService.createProduct(req.body);
  res.status(201).json(result);
};

export const updateProduct = async (req, res) => {
  const result = await productService.updateProduct(req.params.pid, req.body);
  if (result?.error) return res.status(400).json(result);
  res.json(result);
};

export const deleteProduct = async (req, res) => {
  const result = await productService.deleteProduct(req.params.pid);
  if (result?.error) return res.status(400).json(result);
  res.json({ message: 'Producto eliminado' });
};