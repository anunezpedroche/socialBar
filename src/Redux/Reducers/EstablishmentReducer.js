const initialState = {establishment:null,establishments:[],editEstablishmentId:-1};

const reducer = (state=initialState,action) => {
    switch(action.type){
        case "CREATE_ESTABLISHMENT":
                return{
                    ...state,
                    establishments:[action.establishment].concat(state.establishments)
                }
        case "GET_ALL_ESTABLISHMENTS":
                return{
                    ...state,
                    establishments:action.establishments
                }
        case "SELECTED_ESTABLISHMENT":
            return {
                ...state,
                establishment: state.establishments.filter(establishment=>establishment.id===action.id)[0]
            };
        case "REMOVE_ESTABLISHMENT":
            return{
                ...state,
                establishments:state.establishments.filter(establishment=>establishment.id!==action.id)
            }
        case "EDITING_ESTABLISHMENT":
            return{
                ...state,
                editEstablishmentId:action.id
            }
        case "EDIT_ESTABLISHMENT":
            return{
                ...state,
                establishments:state.establishments.map( establishment =>{
                    if(establishment.id!==action.establishment.id) return establishment;
                    return action.establishment;
                })
            }
        default:
            return {
                ...state
            }
    }
}

export const readEstablishment = (state) => {
    return state.EstablishmentReducer.establishment;
}

/*export const readUserTech = (state) => {

    return state.UserReducer.users.filter(user=>user.id===state.TechReducer.tech.creador);
}
*/
export const readAllEstablishments = (state) => {
    return state.EstablishmentReducer.establishments;
}

export const readEstablishmentById = (state) => {
    return state.EstablishmentReducer.establishments.filter(establishment=>establishment.id===state.EstablishmentReducer.editEstablishmentId)[0];
}


export default reducer;