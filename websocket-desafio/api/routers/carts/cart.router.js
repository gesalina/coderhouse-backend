import {Router} from 'express';
import cartManager from "../../controllers/CartManager.js";

const router = Router();
const cart = new cartManager("../database/carts.json");

router.get("/:cid", async (request, response) => {
    let cartId = request.params.cid;
    let getCartProducts = await cart.getCartProduct(cartId);
    if(!getCartProducts) return response.status(404).json({ message: `${getCartProducts}` });
    response.json(getCartProducts)
})

router.post("/", async (request, response) => {
    await cart.createCart();
    response.json({ message: "Producto creado satisfactoriamente"});
  });

router.post("/:cid/product/:pid", async (request, response) => {
    let cartId = request.params.cid;
    let productId = request.params.pid;
    const { quantity } = request.body;
    let getCartUpdate = await cart.updateCart(cartId, productId, quantity);
    if(getCartUpdate) return response.status(404).json({ message: `${getCartUpdate}` });
    response.json({message:'Producto agregar con exito'})
  })
export default router