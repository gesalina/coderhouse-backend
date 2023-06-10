import express from "express";
import handlebars from 'express-handlebars';
import {Server} from 'socket.io';
import productRouter from "../api/routers/products/product.router.js";
import cartRouter from "../api/routers/carts/cart.router.js";

const app = express();

// Templates engine config
app.engine('handlebars', handlebars.engine());
app.set('views', './api/routers/views');
app.set('view engine', 'handlebars');

app.use(express.json())
app.use('/content', express.static('./public'));

// Routers

app.use('/api/products', productRouter);
app.use('/api/cart', cartRouter);

const serverHttp = app.listen(8080, () => console.log(`Running server`));

const io = new Server(serverHttp);

app.set('socketio', io);

io.on('connection', socket => {
    console.log("Client connected");
    // socket.on('message', data => {
    //     io.emit('productList', data);
    // })
})
