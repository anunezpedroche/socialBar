export const createDish = (dish) => {
    return {type:"CREATE_DISH",dish}
}

export const getAllDishes= (dishes) =>{
    return {type:"GET_ALL_DISHES",dishes}
}

export const removeDish = (id) =>{
    return {type:"REMOVE_DISH",id}
}

export const dishEdit = id => {
    return {type:"EDITING_DISH",id}
}

export const editDish = dish => {
    return {type:"EDIT_DISH",dish}
}

export const selectedDish = (id) => {
    return {type:"SELECTED_DISH",id}
}

export const getAllCategories= (categories) =>{
    return {type:"GET_ALL_CATEGORIES",categories}
}