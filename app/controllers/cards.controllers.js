const model = require("../model/socialBar.model");
const {
  findById,
  parseUserExported: parseUser,
} = require("./users.controllers");

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
exports.allCardsEstablishmentsId = async (req, res) => {
  const connection = await model.getConnection();
  console.log(req.params.id);
 
  const [
    cards,
  ]
    = await connection.execute(
    "SELECT * FROM `Cartas` cards WHERE cards.id_local= ?",
    [req.params.id]
  );
  
  const dishesCard = Promise.all(

    cards.map(async (row) => {
      const [
        platos
      ] = await connection.execute(
        "SELECT plts.*, ctg.nombre AS categoria FROM `Platos` plts INNER JOIN `PlatosCarta` pltsCrt ON plts.id = pltsCrt.id_plato INNER JOIN Categorias ctg ON ctg.id = pltsCrt.id_categoria WHERE pltsCrt.id_carta = ?"
        , [row.id]
      );

      return {
        ...row,
        platos: platos
      }
    }
    )


  ).then((resp) =>{
    connection.end();
    res.send(resp);
  });

};
