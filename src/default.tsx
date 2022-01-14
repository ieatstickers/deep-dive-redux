import React from "react";
import * as ReactDOM from "react-dom";
import { combineReducers, createStore } from 'redux'
import { DefaultApp } from "./component/Default/DefaultApp";

function listReducer(state = {list: []}, action)
{
  switch (action.type)
  {
    case 'list/add': {
      state.list.push(action.data)
      return state;
    }
    case 'list/remove': {
      state.list.splice(state.list.length - 1, 1);
      return state;
    }
    default:
      return state;
  }
}

function counterReducer(state = { value: 0 }, action) {
  switch (action.type) {
    case 'counter/incremented':
      return { value: state.value + 1 }
    case 'counter/decremented':
      return { value: state.value - 1 }
    default:
      return state
  }
}

const appReducer = combineReducers({
  list: listReducer,
  counter: counterReducer
})

window['redux'] = createStore(appReducer)

window['redux'].subscribe(() => console.log(window['redux'].getState()))

ReactDOM.render(
  <DefaultApp/>,
  document.querySelector('#root')
);
