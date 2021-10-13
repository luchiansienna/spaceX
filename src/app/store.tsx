import { mainReducer } from '../reducers/index'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { SET_LAUNCHES } from '../actions/types';

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))

export const store = createStore(
  mainReducer
  , composedEnhancer)

function select(state: State) {
  return state.searchTerm;
}

function selectLaunches(state: any, searchTerm: string) {
  if (!searchTerm || searchTerm === '') return state.cachedLaunches;
  return state.cachedLaunches.filter(({ name }: { name: any }) => name.toUpperCase().includes(searchTerm.toUpperCase()));//  val.name.includes(searchTerm)));
}

interface State {
  searchTerm: string
};

let currentValue = '';
export function handleChange() {
  let previousValue = currentValue;
  const currentState = store.getState() as State;
  currentValue = select(currentState)
  if (previousValue !== currentValue) {
    store.dispatch({ type: SET_LAUNCHES, payload: selectLaunches(currentState, currentValue) })
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const unsubscribe = store.subscribe(handleChange)
