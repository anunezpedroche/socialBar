const express      = require("express");
const path         = require("path");
const cors         = require("cors");
const passport     = require('passport');
const session      = require('express-session');
const cookieParser = require('cookie-parser');

const app = express();

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
app.use(cors({credentials: true, origin: 'http://www.tacumba.es'}));
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