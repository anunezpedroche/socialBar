const initialState = {card:null,cards:[],editCardId:-1};

const reducer = (state=initialState,action) => {
    switch(action.type){
        case "CREATE_CARD":
                return{
                    ...state,
                    cards:[action.card].concat(state.cards)
                }
        case "GET_ALL_CARDS":
                return{
                    ...state,
                    cards:action.cards
                }
        case "SELECTED_CARD":
            return {
                ...state,
                card: state.cards.filter(card=>card.id===action.id)[0]
            };
        case "REMOVE_CARD":
            return{
                ...state,
                cards:state.cards.filter(card=>card.id!==action.id)
            }
        case "EDITING_CARD":
            return{
                ...state,
                editCardId:action.id
            }
        case "EDIT_CARD":
            return{
                ...state,
                cards:state.cards.map( card =>{
                    if(card.id!==action.card.id) return card;
                    return action.card;
                })
            }
        default:
            return {
                ...state
            }
    }
}

export const readCard = (state) => {
    return state.CardsReducer.card;
}

/*export const readUserTech = (state) => {

    return state.UserReducer.users.filter(user=>user.id===state.TechReducer.tech.creador);
    
}*/

export const readAllCards = (state) => {
    return state.CardsReducer.cards;
}

export const readCardById = (state) => {
    return state.CardsReducer.cards.filter(card=>card.id===state.CardsReducer.editCardId)[0];
}

export default reducer;