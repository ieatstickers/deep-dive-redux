import React from "react";
import * as ReactDOM from "react-dom";
import { DataStoreApp } from "./component/DataStore/DataStoreApp";
import { CounterDataStore } from "./data/CounterDataStore";
import { ListDataStore } from "./data/ListDataStore";
import { Redux } from "./redux/Redux";

Redux.registerDataStore(ListDataStore.key, ListDataStore);
Redux.registerDataStore(CounterDataStore.key, CounterDataStore);

Redux.init();

Redux.subscribe(() => console.log(Redux.getState()))

ReactDOM.render(
  <DataStoreApp/>,
  document.querySelector('#root')
);
