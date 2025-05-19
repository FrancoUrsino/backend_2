import { ProductDAO } from '../dao/product.dao.js';
import { isValidObjectId } from '../utils/validators.js';

const productDAO = new ProductDAO();

class ProductService {
  async getAllProducts() {
    return await productDAO.getAll();
  }

  async getProductById(pid) {
    if (!isValidObjectId(pid)) return { error: 'ID inválido' };
    return await productDAO.getById(pid);
  }

  async createProduct(data) {
    return await productDAO.create(data);
  }

  async updateProduct(pid, data) {
    if (!isValidObjectId(pid)) return { error: 'ID inválido' };
    return await productDAO.update(pid, data);
  }

  async deleteProduct(pid) {
    if (!isValidObjectId(pid)) return { error: 'ID inválido' };
    return await productDAO.delete(pid);
  }
}

export default new ProductService();