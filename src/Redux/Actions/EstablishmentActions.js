export const createEstablishment = (establishment) => {
    return {type:"CREATE_ESTABLISHMENT",establishment}
}

export const getAllEstablishments = (establishments) =>{
    return {type:"GET_ALL_ESTABLISHMENTS",establishments}
}

export const removeEstablishment = (id) =>{
    return {type:"REMOVE_ESTABLISHMENT",id}
}

export const establishmentEdit = id => {
    return {type:"EDITING_ESTABLISHMENT",id}
}

export const editEstablishment = establishment => {
    return {type:"EDIT_ESTABLISHMENT",establishment}
}

export const selectedEstablishment = (id) => {
    return {type:"SELECTED_ESTABLISHMENT",id}
}