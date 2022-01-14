
import {
  combineReducers,
  createStore,
  Action,
  Store,
  Unsubscribe,
  AnyAction
} from 'redux';
import initSubscriber from 'redux-subscriber';

export class Redux
{
  public static readonly CLEAR_ALL_DATA = 'clear_all_data';
  protected static dataStores: Object = {};
  protected static subscriber: any;
  protected static store: Store;
  protected static readOnly: boolean = false;
  protected static onDispatchListeners = {};
  
  public static init(initialState?: Object)
  {
    // Create Redux store
    this.createStore(initialState);
  }
  
  public static registerDataStore(key: string, dataStore: any)
  {
    this.dataStores[key] = dataStore;
  }
  
  public static createStore(initialState?: any)
  {
    let reducers = {};
    
    for (let key in this.dataStores)
      if (this.dataStores.hasOwnProperty(key))
      {
        let dataStore = this.dataStores[key];
        reducers[dataStore.key] = dataStore.reduce;
      }
    
    let reducerCount = Object.keys(reducers).length;
    
    if (!reducerCount)
    {
      throw new Error('Cannot create Redux store - no reducers added. Use Redux.registerDataStore()');
    }
    
    let appReducer = combineReducers(reducers);
    
    let rootReducer = (state, action: { type: string, value: any }) => {
      
      if (action.type == Redux.CLEAR_ALL_DATA)
      {
        state = undefined;
      }
      
      return appReducer(state, action)
    }
    
    this.store = createStore(rootReducer, initialState);
  }
  
  public static dispatch(action: AnyAction): Action<any>
  {
    if (!this.store)
    {
      throw new Error('Cannot dispatch Redux action - Redux store has not been created. Use Redux.createStore()');
    }
    
    // Dispatch action
    return this.store.dispatch(action);
  }
  
  public static getState(): any
  {
    if (!this.store)
    {
      throw new Error('Cannot getUser Redux state - Redux store has not been created. Use Redux.createStore()');
    }
    
    return this.store.getState();
  }
  
  public static subscribe(listener: () => void): Unsubscribe
  {
    if (!this.store)
    {
      throw new Error('Cannot subscribe to Redux store - store has not been created. Use Redux.createStore()');
    }
    
    return this.store.subscribe(listener);
  }
  
  public static subscribeByKeyPath(keyPath: string, listener: (state: any) => void): Unsubscribe
  {
    if (!this.store)
    {
      throw new Error('Cannot subscribe to Redux store - store has not been created. Use Redux.createStore()');
    }
    
    if (!this.subscriber)
    {
      this.subscriber = {subscribe: initSubscriber(this.store)};
    }
    
    // store is THE redux store
    return this.subscriber.subscribe(keyPath, listener);
  }
  
}
