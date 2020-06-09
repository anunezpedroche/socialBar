export const createCard = (card) => {
    return {type:"CREATE_CARD",card}
}

export const getAllCards= (cards) =>{
    return {type:"GET_ALL_CARDS",cards}
}

export const removeCard = (id) =>{
    return {type:"REMOVE_CARD",id}
}

export const cardEdit = id => {
    return {type:"EDITING_CARD",id}
}

export const editCard = card => {
    return {type:"EDIT_CARD",card}
}

export const selectedCard = (id) => {
    return {type:"SELECTED_CARD",id}
}