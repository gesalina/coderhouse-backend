import { Router } from "express";
import ProductManager from "../../controllers/ProductManager.js";

const router = Router();
const product = new ProductManager("./database/products.json");

// ENDPOINT - Get all products

router.get("/", async (request, response) => {
  const getProducts = await product.getProducts();
  let limit = request.query.limit;
  if (limit) return response.render('home', getProducts.slice(0, limit));
  response.render('home', {
    styles: 'cards.css',
    view_name: 'Products View',
    products: getProducts
  }
    );
});

router.get('/realtimeproducts', async(request, response) => {
  const products = await product.getProducts();
  response.render('realTimeProducts', {
    view_name: "Productos en tiempo real",
    products: products
  })
})

// ENDPOINT - Filter products by id

router.get("/:pid", async (request, response) => {
  let id = request.params.pid;
  const findProduct = await product.getProductsById(id);
  if (!findProduct)
    return response.status(404).json({ message: `${findProduct}` });
  response.send(findProduct);
});
// ENDPOINT - Add new product

router.post("/", async (request, response) => {
  const { title, description, price, thumbnail, code, stock } = request.body;
  const checkProduct = await product.createProduct(
    title,
    description,
    price,
    thumbnail,
    code,
    stock
  );
  if (checkProduct)
    return response.status(404).json({ message: `${checkProduct}` });
  response.json({ message: "Product created successfully" });
});
// ENDPOINT - Update a product by ID
router.put("/:pid", async (request, response) => {
  let id = parseInt(request.params.pid);
  const { title, description, price, thumbnail, status, code, stock } =
    request.body;
  const checkUpdated = await product.updateProduct(
    id,
    title,
    description,
    price,
    thumbnail,
    status,
    code,
    stock
  );
  if (checkUpdated)
    return response.status(404).json({ message: `${checkUpdated}` });
  response.json({ message: "Product updated successfully" });
});
// ENDPOINT - Delete a product by ID
router.delete("/:pid", async (request, response) => {
  let id = parseInt(request.params.pid);
  const deleteProduct = await product.deleteProducts(id);
  if (deleteProduct)
    return response.status(404).json({ message: `${deleteProduct}` });
  response.json({ message: "Product has been deleted" });
});

export default router;
