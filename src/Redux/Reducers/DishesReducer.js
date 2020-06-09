const initialState = {dish:null,dishes:[],editDishId:-1};

const reducer = (state=initialState,action) => {
    switch(action.type){
        case "CREATE_DISH":
                return{
                    ...state,
                    cards:[action.dish].concat(state.dishes)
                }
        case "GET_ALL_DISHES":
                return{
                    ...state,
                    dishes:action.dishes
                }
        case "SELECTED_DISH":
            return {
                ...state,
                dish: state.dishes.filter(dish=>dish.id===action.id)[0]
            };
        case "REMOVE_DISH":
            return{
                ...state,
                dishes:state.dishes.filter(dish=>dish.id!==action.id)
            }
        case "EDITING_DISH":
            return{
                ...state,
                editDishId:action.id
            }
        case "EDIT_DISH":
            return{
                ...state,
                dishes:state.dishes.map( dish =>{
                    if(dish.id!==action.dish.id) return dish;
                    return action.dish;
                })
            }
        default:
            return {
                ...state
            }
    }
}

export const readDish = (state) => {
    return state.DishesReducer.dish;
}

/*export const readUserTech = (state) => {

    return state.UserReducer.users.filter(user=>user.id===state.TechReducer.tech.creador);
    
}*/

export const readAllDishes = (state) => {
    return state.DishesReducer.dishes;
}

export const readDishById = (state) => {
    return state.DishesReducer.dishes.filter(dish=>dish.id===state.CardsReducer.editCardId)[0];
}

export default reducer;