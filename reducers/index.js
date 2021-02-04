import { combineReducers } from "redux";
import filterShow from "./filterShow";
import todo from "./todo";

export default combineReducers({ todo, filterShow });
