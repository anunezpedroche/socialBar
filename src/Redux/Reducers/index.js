import {combineReducers} from 'redux';
import UserReducer from './UserReducer.js';
import EstablishmentReducer from './EstablishmentReducer.js';
import CardsReducer from './CardsReducer.js';

export default combineReducers({
    UserReducer,EstablishmentReducer, CardsReducer
})