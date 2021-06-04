const { productsService } = require("../services");

const {
  fetchProducts,
  fetchProductById,
  createProduct,
  modifyProduct,
  removeProduct,
} = productsService;

const getAllProducts = async (req, res, next) => {
  const products = await fetchProducts();
  res.status(200).json(products);
  next();
};

const getProductById = async (req, res, next) => {
  const { id } = req.params;
  const product = await fetchProductById(id);
  res.status(200).json(product);
  next();
};

const deleteProduct = async (req, res, next) => {
  const { id } = req.params;
  const deleted = await removeProduct(id);
  res.status(200).json(deleted);
  next();
};

module.exports = {
    getAllProducts,
    getProductById,
    deleteProduct
}