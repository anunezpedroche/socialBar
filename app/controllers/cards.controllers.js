const model = require("../model/socialBar.model");
const {
  findById,
  parseUserExported: parseUser,
} = require("./users.controllers");

exports.dishesToCard = async(req,res) => {
  const connection = await model.getConnection();
  
  let card = req.body;

  let {platos} = req.body;

  if(!card.platos[0]){
    const [deleteDishToCard] = await connection.execute("DELETE FROM `PlatosCarta` WHERE id_carta = ?",[card.id]);
  }

  platos.map(async(dish)=>{
    await connection.execute("DELETE FROM `PlatosCarta` WHERE id_plato = ? AND id_carta=?",[dish.id,card.id]);
    await connection.execute("INSERT INTO `PlatosCarta` VALUE(?,?)",[dish.id,card.id]);
  });

  res.send({message:"OK",status:200});

}

exports.createCard = async (req,res) =>{

  let imageName = "default_card.svg";

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

  const connection = await model.getConnection();

  const card = parseCard(req.body.card);

  const [rows] = await connection.execute("INSERT INTO `Cartas` VALUES(NULL,?,?,?,?)",[card.local,card.nombre,card.descripcion,imageName]);

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

exports.cardFromId = async (req, res) => {
  const connection = await model.getConnection();
 
  const [
    cards,
  ]
    = await connection.execute(
    "SELECT * FROM `Cartas` cards WHERE cards.id= ?",
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
  
  return{
    id:results.id,
    nombre:results.nombre,
    descripcion:results.descripcion,
    local: results.establecimiento,
    imagen: results.imagen
  }
}