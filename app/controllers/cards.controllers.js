const model = require("../model/socialBar.model");
const {
  findById,
  parseUserExported: parseUser,
} = require("./users.controllers");

exports.dishesToCard = async(req,res) => {
  const connection = await model.getConnection();
  
  let card = req.body;

  let {platos} = req.body;

  //console.log(platosCarta);

  if(!card.platos[0]){
    const [deleteDishToCard] = await connection.execute("DELETE FROM `PlatosCarta` WHERE id_carta = ?",[card.id]);
    console.log("fiesta");
  }

  console.log(card);

  platos.map(async(dish)=>{
    await connection.execute("DELETE FROM `PlatosCarta` WHERE id_plato = ? AND id_carta=?",[dish.id,card.id]);
    await connection.execute("INSERT INTO `PlatosCarta` VALUE(?,?)",[dish.id,card.id]);
  });

  res.send({message:"OK",status:200});

}

exports.createCard = async (req,res) =>{

  let imageName = "default.png";

  if (req.body.card.imagen) {
    var base64Data = req.body.card.imagen.replace(
      /^data:image\/jpeg;base64,/,
      ""
    );

    imageName =
      req.body.card.nombre+ "_" + Date.now() + "_" +  ".jpeg";
    require("fs").writeFile(
      `./src/img/cards/${imageName}`,
      base64Data,
      "base64",
      function (err) {
        console.log(err);
      }
    );
  }

/*
CREATE TABLE  Cartas ( 
	id INT NOT NULL AUTO_INCREMENT ,
    id_local INT NOT NULL,
	nombre VARCHAR(255),
	descripcion VARCHAR(255),
	imagen VARCHAR(255) DEFAULT 'card_default.png',
    PRIMARY KEY (id,id_local)
);
*/

  const connection = await model.getConnection();

  const card = parseCard(req.body.card);

  console.log(card);

  const [rows] = await connection.execute("INSERT INTO `Cartas` VALUES(NULL,?,?,?,?)",[card.local,card.nombre,card.descripcion,imageName]);

  console.log("Usuario "+req.user.id);
  console.log(rows);


//  const [rowsProfiles] = await connection.execute("INSERT INTO `LocalesPerfilesPersonal` VALUES(?,?,?)",[req.user.id,2,rows.insertId]);


  connection.end();
  res.send({message:'ok'});

}

exports.allCardsEstablishmentsId = async (req, res) => {
  const connection = await model.getConnection();
 
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
        "SELECT plts.*, ctg.nombre AS categoria FROM `Platos` plts INNER JOIN `PlatosCarta` pltsCrt ON plts.id = pltsCrt.id_plato INNER JOIN Categorias ctg ON ctg.id = plts.id_categoria WHERE pltsCrt.id_carta = ?"
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


const parseCard = (results) =>{
  console.log(results);
  return{
    id:results.id,
    nombre:results.nombre,
    descripcion:results.descripcion,
    local: results.establecimiento,
    imagen: results.imagen
  }
}