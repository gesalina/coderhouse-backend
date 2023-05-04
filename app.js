class ProductManager {
  /**
   * Private Methods
   */
  #products;
  #error;
  constructor() {
    this.#products = [];
    this.#error = undefined;
  }
  getProducts = () => this.#products;

  getElementById = (id) => {
    const findElement = this.#products.find((product) => product.id === id);
    if (!findElement) return `[${id} no existe]`;
    return findElement;
  };
  /**
   * Create ID
   */
  createId = () =>
    this.#products.length === 0 ? 1 : this.#products.at(-1).id + 1;
  /**
   * Validate existent product
   */
  #validProduct = (title, description, price, thumbnail, code, stock) => {
    if (
      !title ||
      !description ||
      !price ||
      !thumbnail ||
      !code ||
      !stock ||
      isNaN(price)
    ) {
      this.#error = `[${title}] Unos o varios campos estan vacios o son incorrectos`;
    } else {
      const findProduct = this.#products.find(
        (product) => product.code === code
      );
      if (findProduct) this.#error = `[${title}]Este codigo ya existe`;
      else this.#error = undefined;
    }
  };
  /**
   * This function add a new product
   */
  addProduct = (title, description, price, thumbnail, code, stock) => {
    this.#validProduct(title, description, price, thumbnail, code, stock);
    if (this.#error === undefined)
      this.#products.push({
        id: this.createId(),
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      });
    else console.log(this.#error);
  };
}

let test = new ProductManager();
test.addProduct(
  "Alfajor",
  "Alfajor bañado en chocolate",
  120,
  "img/alfajor.png",
  "ALF101",
  10
);
test.addProduct(
  "Barra de cereal",
  "Barra de cereal con semillas",
  350,
  "img/barra-cereal.png",
  "CER101",
  25
);
test.addProduct(
  "Chicle de frutilla",
  "Chicle sabor frutilla",
  15,
  "img/chicle-frutilla.png",
  "CHI201",
  50
);
// Producto con errores
test.addProduct(
  "Caramelo de frutilla",
  "Caramelo sabor a frutilla",
  "img/caramelof.png",
  "CER055",
  120
);
// Producto existente
test.addProduct(
  "Caramelo de frutilla",
  "Caramelo sabor a frutilla",
  10,
  "img/caramelof.png",
  "CER101",
  120
);
console.log(test.getProducts());
console.log(test.getElementById(1));
console.log(test.getElementById(3));
console.log(test.getElementById(6));
