import { combineReducers } from 'redux';
import ForestReducer from "./app/components/Forest/reducer/ForestReducer";

export default combineReducers({
    forest: ForestReducer
});
