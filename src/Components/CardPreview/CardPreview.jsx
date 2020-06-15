import { Carousel } from 'antd';
import React from "react";
import './CardPreview.css';
import { connect } from "react-redux";
import { readAllDishes } from "../../Redux/Reducers/DishesReducer";
import { getAllDishes } from "../../Redux/Actions/DishesActions";
const CardPreview = ({dishes}) =>{

    

return (
    <React.Fragment>
        <div className="mensaje">
        <p>Bienvenido a SocialBar, espere a ser atendido:</p>

        <p>Su mesa será asignada a un camarero de forma automática, en ese momento podrá realizar su pedido.</p>

        <p>Mientras espera, puede echar un vistazo a alguno de los platos de este establecimiento.</p>

        </div>
        <div>
    <Carousel autoplay>
    {dishes.map((dish)=>{
        return(
            <div>
            <h3>
        <img className="image" alt="" src={require('../../img/dishes/'+dish.imagen)}/>
        </h3>
        </div>
        )
    })}
  </Carousel>
  <div className="mensaje">

        <p>Si te interesa dejar una reseña de este local, no dudes en registrarte en nuestra aplicación</p>

        <p>Social Bar es una aplicación totalmente gratuita cuyo objetivo es facilitar la adaptación a la 'nueva normalidad' y de paso proporcionar nuevas tecnologías en el sector de la hostelería.</p>

        <p>Muchas gracias por su atención.</p>
        </div>
  </div>
  </React.Fragment>
)
}


const mapStateToProps = (state) => {
    return { dishes: readAllDishes(state)};
  };
  
  export default connect(mapStateToProps, {
    getAllDishes
  })(CardPreview);
