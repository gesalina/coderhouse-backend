import express from "express";
import ProductManager from "../ProductManager.js";

const app = express();
const product = new ProductManager("../products.json");

app.get("/", (request, response) => {
  response.send(
    "<title>Entregable 3</title><h1>Bienvenido al entregable numero 3</h2>"
  );
});

app.get("/products", async (request, response) => {
  const getProducts = await product.getProducts();
  let limit = request.query.limit;
  if (limit) return response.send(getProducts.slice(0, limit));
  response.send(getProducts);
});

app.get("/products/:pid", async (request, response) => {
  let id = request.params.pid;
  const findProduct = await product.getProductsById(id);
  response.send(findProduct);
});

app.listen(8080, () => console.log("Servidor corriendo en: http://127.0.0.1:8080/"));
