const express      = require("express");
const path         = require("path");
const cors         = require("cors");
const passport     = require('passport');
const session      = require('express-session');
const cookieParser = require('cookie-parser');

const app = express();
const server = require('http').createServer(app);
//Creating server websocket
const io = require('socket.io')(server);
// Middleware for passport
require('./config/passport');

//ESTUDIAR PORTAL CAUTIVO

/* 
* 
*  https://mikrotik.com/product/RB960PGS
*   
*/  

// Middlewares
app.use(express.json({limit:'10mb'}));
app.use(cors({credentials: true, origin: 'http://localhost:3001'}));
app.use(cookieParser());
// Para enviar un FORM a traves de req. tal.
// Para que solo puedas pasar archivos texto plano 
// a traves de la URL. Gracias Carlos.
app.use(express.urlencoded({limit:'10mb', extended: true }));

app.use(session({ 
    secret: 'secretKey',
    resave: false,
    saveUninitialized: false 
}));
app.use(passport.initialize());
app.use(passport.session());
// WebSocket connection

server.listen(4000, ()=> console.log('Listening webSocket on port 4000'));

let interval;

io.on('connection',(socket)=>{
    socket.emit('news',{hello:'world'});
    socket.on('my other event', (data)=>{
        console.log(data);
    });
    socket.on('disconnect',()=>{});
});

const getApiAndEmit = socket => {
    const response = "Pendejo";
    //console.log(response);
    socket.emit("FromAPI", response);
};



// Paginas publicas (estaticas)
app.use(express.static(path.join(__dirname, "public")));
const port = process.env.PORT || 3000;
// Require Users routes
app.use("/api/users", require("./app/routes/users.routes.js"));
app.use("/api/establishments", require("./app/routes/establishments.routes.js"));
app.use("/api/cards", require("./app/routes/cards.routes.js"));
app.use("/api/dishes", require("./app/routes/dishes.routes.js"));
app.use("/api/tables", require("./app/routes/tables.routes.js"));
//app.use("/api/tables", require("./app/routes/tables.routes.js"));
/*app.use("/api/projects", require("./app/routes/projects.routes.js"));
app.use("/api/reports", require("./app/routes/reports.routes.js"));*/


app.listen(port, () => {
    console.log(" * Servidor corriendo en: http://localhost:3000");
});