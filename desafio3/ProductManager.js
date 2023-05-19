import fs from "fs";

class ProductManager {
  #error;
  constructor(filename) {
    this.filename = filename;
    this.format = "utf-8";
    this.error = "";
  }
  /**
   * Get the products
   */
  getProducts = async () => {
    return JSON.parse(await fs.promises.readFile(this.filename, this.format));
  };
  /**
   * Delete a product by ID
   */
  deleteProducts = async (id) => {
    const findProductById = await this.getProducts();
    const product = findProductById.findIndex((product) => product.id === id);
    if (product >= 0) {
      console.log('Se elimino el siguiente producto del registro:', findProductById[product])
      findProductById.splice(product, 1);
      return await this.#saveFile(findProductById);
    } else {
      console.log(`El id ${id} no se puede eliminar ya que no existe`);
    }
  };
  /**
   * Get the products by ID
   */
  getProductsById = async (id) => {
    let findProduct = await this.getProducts();
    findProduct = findProduct.find((product) => product.id == id);
    return findProduct ? findProduct : `No existe en los registros el id:${id}`;
  };
  /**
   * Create a UNIQUE ID for each product
   */
  #createId = async () => {
    let getProductsId = await this.getProducts();
    return getProductsId.length === 0 ? 1 : getProductsId.at(-1).id + 1;
  };
  /**
   * Save the data in a file
   */
  #saveFile = async (data) => {
    return await fs.promises.writeFile(
      this.filename,
      JSON.stringify(data, null, "\t")
    );
  };
  /**
   * Update product
   */
  updateProduct = async (
    id,
    title,
    description,
    price,
    thumbnail,
    code,
    stock
  ) => {
    const getProducts = await this.getProducts();
    const findProduct = getProducts.find((product) => product.id === id);
    /**
     * Prevent empty data and duplicate code, you need a new code in each update
     */
    const validateDataEntry = await this.#productExist(
      title,
      description,
      price,
      thumbnail,
      code,
      stock
    );
    if (findProduct && !validateDataEntry) {
      findProduct.title = title;
      findProduct.description = description;
      findProduct.price = price;
      findProduct.thumbnail = thumbnail;
      findProduct.code = code;
      findProduct.stock = stock;
      return await this.#saveFile(getProducts) || console.log(findProduct);
    } else {
      console.log(this.#error);
    }
  };
  /**
   * Validate if the product exist
   */
  #productExist = async (title, description, price, thumbnail, code, stock) => {
    if (
      !title ||
      !description ||
      !price ||
      !thumbnail ||
      !code ||
      !stock ||
      isNaN(price)
    ) {
      return (this.#error = `[${title}] Unos o varios campos estan vacios o son incorrectos`);
    }
    let findProductId = await this.getProducts();
    findProductId = findProductId.find((product) => product.code === code);
    return !findProductId
      ? false
      : (this.#error = `El codigo ${code} no existe`);
  };
  /**
   * Create a new product
   */
  createProduct = async (
    title,
    description,
    price,
    thumbnail,
    code,
    stock
  ) => {
    const productValid = await this.#productExist(
      title,
      description,
      price,
      thumbnail,
      code,
      stock
    );
    // If the product exist, return a error
    if (productValid) return console.log(this.#error);
    const product = await this.getProducts();
    product.push({
      id: await this.#createId(),
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    });
    return await this.#saveFile(product);
  };
}

export default ProductManager;
