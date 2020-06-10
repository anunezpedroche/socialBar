const model = require("../model/socialBar.model");
const {
    allDishes,
  parseUserExported: parseUser,
} = require("./dishes.controllers");

/*
exports.findAllProjectsByCourse = async (req,res) => {
  const connection = await model.getConnection();
  const { id } = req.params;

  const [
    rows,
  ] = await connection.execute("SELECT * FROM Usuarios WHERE id IN (SELECT id_usuario FROM `UsuariosCurso` WHERE `id_curso` = ?)", [id]);
  connection.end();
  res.send(JSON.stringify(rows));

};

exports.updateKanbanProject = async (req,res)=>{

  const connection = await model.getConnection();

  let proyecto = req.body;
  
  const { tablero } = proyecto;
  console.log(tablero);
  const [projectUpdated] = await connection.query("SELECT JSON_SET(tablero,'columns',"+tablero+") FROM `Proyectos` WHERE id = "+proyecto.id);

  connection.end();

  res.send({message:"ok"});

}

exports.updateProject = async (req, res) => {
  const alertMessage = {
    message: "",
    type: "",
  };

  const connection = await model.getConnection();

  let projecto = req.body;
  const { usuarios, tecnologias } = projecto;
  const { alumnos, profesores } = usuarios;

  const [
    tecnologiasDeleted,
  ] = await connection.execute(
    "DELETE FROM `TecnologiasProyecto` WHERE id_proyecto = ? ",
    [projecto.id]
  );
  tecnologias.map(async (tecnologia) => {
    await connection.execute("INSERT INTO `TecnologiasProyecto` VALUES (?,?)", [
      projecto.id,
      tecnologia.id,
    ]);
  });

  const [
    usuariosDeleted,
  ] = await connection.execute(
    "DELETE FROM `PerfilesProyecto` WHERE id_proyecto = ? ",
    [projecto.id]
  );
  alumnos.map(async (alumno) => {
    await connection.execute("INSERT INTO `PerfilesProyecto` VALUES (3,?,?)", [
      alumno.id,
      projecto.id,
    ]);
  });
  profesores.map(async (profesor) => {
    await connection.execute("INSERT INTO `PerfilesProyecto` VALUES (4,?,?)", [
      profesor.id,
      projecto.id,
    ]);
  });

  const [
    projectoUpdated,
  ] = await connection.execute(
    "UPDATE `Proyectos` SET nombre = ? , descripcion = ? WHERE id = ? ",
    [projecto.nombre, projecto.descripcion, projecto.id]
  );

  alertMessage.message = "Proyecto actualizado correctamente";
  alertMessage.type = "success";

  connection.end();
  res.status(200).send(alertMessage);
};
*/
exports.allDishes = async (req, res) => {
    const connection = await model.getConnection();
  
    let consulta;
  
    if (req.user.admin == true) {
      consulta = "SELECT * FROM `Locales`";
    } else {
      // "select * from Proyectos inner join PerfilesProyecto where PerfilesProyecto.id = req.user.id"
      consulta =
        "SELECT * FROM `Locales` INNER JOIN `LocalesPerfilesPersonal` locPerfPers ON locPerfPers.id_local = `Locales`.id WHERE locPerfPers.id_personal = ?";
    }
  
  const [
    dishes
  ]
    = await connection.execute(
    "SELECT * FROM `Platos` plts INNER JOIN `PlatosPersonal` pltsprs ON pltsprs.id_plato = plts.id WHERE pltsprs.id_personal = ?",
    [req.user.id]
  );
      console.log(dishes);
    connection.end();
    res.send(dishes);

};

exports.createDish = async (req, res) => {

  const connection = await model.getConnection();
  const dish = parseDish(req.body.dish);

  console.log(req);

  dish.creador = req.user.id ? req.user.id : 1;
  //console.log(dish);

  let imageName = "default.png";
  console.log("hola");
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
  console.log("adios");
  const [
    rows,
  ] = await connection.execute(
    "INSERT INTO `Platos` VALUES (NULL,?,?,?,?)",
    [dish.titulo, dish.descripcion,dish.precio, imageName]
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
  };
};