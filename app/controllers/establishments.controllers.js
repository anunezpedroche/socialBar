const model = require("../model/socialBar.model");
const {
  findById,
  parseUserExported: parseUser,
} = require("./users.controllers");

exports.allEstablishments = async (req, res) => {
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
