import { Product } from '../models/product.model.js';

export class ProductDAO {
  async getAll() {
    return await Product.find();
  }

  async getById(pid) {
    return await Product.findById(pid);
  }

  async create(productData) {
    return await Product.create(productData);
  }

  async update(pid, updateData) {
    return await Product.findByIdAndUpdate(pid, updateData, { new: true });
  }

  async delete(pid) {
    return await Product.findByIdAndDelete(pid);
  }
}