
import * as React from "react";
import { CounterDataStore } from "../../data/CounterDataStore";
import { ListDataStore } from "../../data/ListDataStore";
import { Redux } from "../../redux/Redux";

export interface DataStoreAppProps {}

export interface DataStoreAppState
{
  counterValue: number,
  counterState: any,
  listState: any,
}

export class DataStoreApp extends React.Component<DataStoreAppProps, DataStoreAppState>
{
  public constructor(props: DataStoreAppProps, state: DataStoreAppState)
  {
    super(props, state);
  
    this.state = {
      counterValue: CounterDataStore.getValue(),
      counterState: CounterDataStore.getState(),
      listState: ListDataStore.getState()
    }
  }
  
  
  public componentDidMount() {
    
    CounterDataStore.subscribe((state) => {
      this.setState({
        counterState: state
      })
    })
    
    ListDataStore.subscribe((state) => {
      this.setState({
        listState: state
      })
    })
    
    CounterDataStore.subscribeToValue((value) => {
      this.setState({
        counterValue: value
      })
    })
  }
  
  public render()
  {
    return <div>
      <div>
        Counter Value: {this.state.counterValue}
      </div>
      <pre>
        {JSON.stringify(this.state.counterState, null, 2)}
      </pre>
      <pre>
        {JSON.stringify(this.state.listState, null, 2)}
      </pre>
      <div>
        <button onClick={this.increment.bind(this)}>Increment</button>
        <button onClick={this.decrement.bind(this)}>Decrement</button>
      </div>
      <div>
        <button onClick={this.addToList.bind(this)}>Add to list</button>
        <button onClick={this.removeFromList.bind(this)}>Remove from list</button>
      </div>
    </div>
  }
  
  private increment()
  {
    Redux.dispatch({ type: 'counter/incremented' })
  }
  
  private decrement()
  {
    Redux.dispatch({ type: 'counter/decremented' })
  }
  
  private addToList()
  {
    Redux.dispatch({ type: 'list/add', data: "a new string"})
  }
  
  private removeFromList()
  {
    Redux.dispatch({ type: 'list/remove'})
  }
}
