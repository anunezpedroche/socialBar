const model = require("../model/socialBar.model");
const {
  findById,
  parseUserExported: parseUser,
} = require("./users.controllers");

exports.allTables = async (req, res) => {
  const connection = await model.getConnection();
  
  let consulta;

  if (req.user.admin == true) {
    consulta = "SELECT * FROM `Locales`";
  } else {
    // "select * from Proyectos inner join PerfilesProyecto where PerfilesProyecto.id = req.user.id"
    consulta =
      "SELECT * FROM `Locales` INNER JOIN `LocalesPerfilesPersonal` locPerfPers ON locPerfPers.id_local = `Locales`.id WHERE locPerfPers.id_personal = ?";
  }

  const [rows] = await connection.execute(consulta, [req.user.id]);

  connection.end();
  res.send(rows);
};

exports.createTable = async (req,res) => {

};

exports.cardFromTable = async (req,res) => {
  const connection = await model.getConnection();

  const {idTable, idCard } = req.params;  

      const [
        platos
      ] = await connection.execute(
        "SELECT plts.*, ctg.nombre AS categoria FROM `Platos` plts INNER JOIN `PlatosCarta` pltsCrt ON plts.id = pltsCrt.id_plato INNER JOIN Categorias ctg ON ctg.id = pltsCrt.id_categoria WHERE pltsCrt.id_carta = ?"
        , [idCard]
      );

    connection.end();
    res.send(platos);
}