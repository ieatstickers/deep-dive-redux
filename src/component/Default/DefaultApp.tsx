
import * as React from "react";

export interface DefaultAppProps {}

export interface DefaultAppState
{
  reduxState: any
}

export class DefaultApp extends React.Component<DefaultAppProps, DefaultAppState>
{
  public constructor(props: DefaultAppProps, state: DefaultAppState)
  {
    super(props, state);
    
    this.state = {
      reduxState: {}
    };
  }
  
  public componentDidMount() {
    window['redux'].subscribe(() => {
      this.setState({
        reduxState: window['redux'].getState()
      })
    })
  }
  
  public render()
  {
    return <div>
      <pre>
        {JSON.stringify(this.state.reduxState, null, 2)}
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
    window['redux'].dispatch({ type: 'counter/incremented' })
  }
  
  private decrement()
  {
    window['redux'].dispatch({ type: 'counter/decremented' })
  }
  
  private addToList()
  {
    window['redux'].dispatch({ type: 'list/add', data: "a new string"})
  }
  
  private removeFromList()
  {
    window['redux'].dispatch({ type: 'list/remove'})
  }
}
