import { DataStore } from "../redux/DataStore/DataStore";

export class ListDataStore extends DataStore
{
  public static readonly key: string = 'list';
  
  public static reduce(state = { list: [] }, action: {
    type: string,
    data: any
  })
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
}
