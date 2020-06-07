import {combineReducers} from 'redux';
import UserReducer from './UserReducer.js';
import EstablishmentReducer from './EstablishmentReducer.js';

export default combineReducers({
    UserReducer,EstablishmentReducer
})