const express      = require("express");
const path         = require("path");
const cors         = require("cors");
const passport     = require('passport');
const session      = require('express-session');
const cookieParser = require('cookie-parser');
const socketIO     = require('socket.io');
const app          = express();

// Middleware for passport
require('./config/passport');

//ESTUDIAR PORTAL CAUTIVO

/* 
* 
*  https://mikrotik.com/product/RB960PGS
*   
*/  
const dev = 'http://localhost:3001';
const prod = 'http://www.tacumba.es';
// Middlewares
app.use(express.json({limit:'10mb'}));
app.use(cors({credentials: true, origin: dev}));
app.use(cookieParser());

app.use(express.urlencoded({limit:'10mb', extended: true }));

app.use(session({ 
    secret: 'secretKey',
    resave: false,
    saveUninitialized: false 
}));
app.use(passport.initialize());
app.use(passport.session());

let interval;

function initSocket(server){
    const io = socketIO(server);
    const tableCtrl = require('./lib/socket.js')(io);
    app.locals.tableCtrl = tableCtrl;
}

// Paginas publicas (estaticas)
app.use(express.static(path.join(__dirname, "public")));
const port = process.env.PORT || 3000;

// Require Users routes
app.use("/api/users", require("./app/routes/users.routes.js"));
app.use("/api/establishments", require("./app/routes/establishments.routes.js"));
app.use("/api/cards", require("./app/routes/cards.routes.js"));
app.use("/api/dishes", require("./app/routes/dishes.routes.js"));
app.use("/api/tables", require("./app/routes/tables.routes.js"));

app.listen(port, () => {
    console.log(" * Servidor corriendo en: http://localhost:3000");
});

const server = app.listen(5000, ()=> console.log('Listening at port 5000'));

initSocket(server);