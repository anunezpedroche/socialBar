const model = require("../model/socialBar.model");
const {
  findById,
  parseUserExported: parseUser,
} = require("./users.controllers");

exports.createEstablishment = async(req,res) =>{

  let imageName = "default_establishment.jpeg";

  if (req.body.establishment.imagen) {
    var base64Data = req.body.establishment.imagen.replace(
      /^data:image\/jpeg;base64,/,
      ""
    );

    imageName =
      req.body.establishment.nombre+ "_" + Date.now() + "_" +  ".jpeg";
    require("fs").writeFile(
      `./src/img/establishment/${imageName}`,
      base64Data,
      "base64",
      function (err) {
        console.log(err);
      }
    );
  }



  const connection = await model.getConnection();

  const establishment = parseEstablishment(req.body.establishment);

  console.log(establishment.mesas);

  const [rows] = await connection.execute("INSERT INTO `Locales` VALUES(NULL,?,?,?)",[establishment.nombre,establishment.ubicacion,imageName]);

  console.log("Usuario "+req.user.id);
  console.log(rows);


  const [rowsProfiles] = await connection.execute("INSERT INTO `LocalesPerfilesPersonal` VALUES(?,?,?)",[req.user.id,2,rows.insertId]);

  for(var i = 0;i<establishment.mesas;i++){
  
    const [tables] = await connection.execute("INSERT INTO `Mesas` VALUES(NULL,?,NULL,NULL,'Vacía')",[rows.insertId]);
  }

  connection.end();
  res.send({message:'ok',id_local:rows.insertId,id_perfil:2,id_usuario:req.user.id});

}


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

  const establishments = Promise.all(rows.map(async (establishment)=>{
    
    const [mesas] = await connection.execute("SELECT id, estado FROM `Mesas` WHERE id_local=?",[establishment.id]);

    const [
      cards,
    ]
      = await connection.execute(
      "SELECT * FROM `Cartas` cards WHERE cards.id_local= ?",
      [establishment.id]
    );

    return {
      ...establishment,
      mesas: mesas,
      cartas: cards
    }
  })).then((resp) => {

    connection.end();
    res.send(resp);
  });

};

const parseEstablishment = (results) =>{
  console.log(results);
  return{
    id:results.id,
    nombre:results.nombre,
    ubicacion:results.ubicacion,
    imagen: results.imagen,
    mesas: parseInt(results.mesas)
  }
}