import { Objects } from "phusion/src/Core/Objects/Objects";
import { AnyAction } from "redux";
import { DataStore } from "../redux/DataStore/DataStore";

export class CounterDataStore extends DataStore
{
  public static readonly key: string = 'counter';
  
  public static reduce(state = { value: 0 }, action: AnyAction)
  {
    switch (action.type) {
      case 'counter/incremented':
        return { value: state.value + 1 }
      case 'counter/decremented':
        return { value: state.value - 1 }
      default:
        return state
    }
  }
  
  public static getValue(): number
  {
    return Number(Objects.getByKeyPath('value', this.getState()));
  }
  
  public static subscribeToValue(
    subscriber: (value: number) => void,
    currentValue: number = null
  )
  {
    this.subscribe(() => {
      const newValue = this.getValue();
      
      if (newValue !== currentValue)
      {
        currentValue = newValue;
        
        subscriber(newValue);
      }
    })
  }
}
