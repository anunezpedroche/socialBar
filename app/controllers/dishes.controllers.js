const model = require("../model/socialBar.model");
const {
    allDishes,
  parseUserExported: parseUser,
} = require("./dishes.controllers");
const { fstat } = require("fs");

exports.allCategories = async (req,res) => {

  const connection = await model.getConnection();

  const [ categories ] = await connection.query("SELECT * FROM Categorias");

  res.send(categories);

};

exports.allDishes = async (req, res) => {
    const connection = await model.getConnection();
  
    let consulta;
  
    if (req.user.admin == true) {
      consulta = "SELECT * FROM `Locales`";
    } else {

      consulta =
        "SELECT * FROM `Locales` INNER JOIN `LocalesPerfilesPersonal` locPerfPers ON locPerfPers.id_local = `Locales`.id WHERE locPerfPers.id_personal = ?";
    
      }
  
  const [
    dishes
  ]
    = await connection.execute(
    "SELECT plts.*,ctg.nombre AS categoria FROM `Platos` plts INNER JOIN `PlatosPersonal` pltsprs ON pltsprs.id_plato = plts.id INNER JOIN `Categorias` ctg ON plts.id_categoria = ctg.id WHERE pltsprs.id_personal = ?",
    [req.user.id]
  );

    connection.end();
    res.send(dishes);

};

exports.createDish = async (req, res) => {

  const connection = await model.getConnection();
  const dish = parseDish(req.body.dish);

  dish.creador = req.user.id ? req.user.id : 1;

  let imageName = "add.jpg";

  if (req.body.dish.imagen) {
    var base64Data = req.body.dish.imagen.replace(
      /^data:image\/jpeg;base64,/,
      ""
    );

    imageName =
      req.body.dish.titulo + "_" + Date.now() + "_" + dish.creador + ".jpeg";

    require("fs").writeFile(
      `./src/img/dishes/${imageName}`,
      base64Data,
      "base64",
      function (err) {
        console.log(err);
      }
    );
  }

  const [
    rows,
  ] = await connection.execute(
    "INSERT INTO `Platos` VALUES (NULL,?,?,?,?,?)",
    [dish.titulo, dish.descripcion,dish.precio, imageName,parseInt(dish.categoria)]
  );

  const [ platosPersonal ] = await connection.execute("INSERT INTO `PlatosPersonal` VALUES(?,?)",[rows.insertId,dish.creador]);
  connection.end();

  dish.id = rows.insertId;
  dish.user = req.user;

  res.status(200).send(dish);
};

const parseDish = (results) => {
  return {
    id: results.id,
    titulo: results.titulo,
    descripcion: results.descripcion,
    precio: parseFloat(results.precio),
    imagen: results.imagen,
    creador: results.creador,
    categoria: parseInt(results.categoria)
  };
};