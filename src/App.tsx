import { EffectCallback, useEffect } from 'react';
import './App.css';
import { connect } from 'react-redux';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import { Launches, Launch } from './pages'
import { fetchLaunches, setSearchTerm } from './actions';
import { Provider } from 'react-redux';
import { store } from './app/store';
import LaunchInterface from './domain/launch'
interface AppProps {
  getLaunches?: () => void,
  launches?: Array<LaunchInterface>,
  searchByTerm: (searchTerm: string) => void,
  searchTerm?: string
};
// eslint-disable-next-line react-hooks/exhaustive-deps
const useMountEffect = (onlyOnce: EffectCallback) => useEffect(onlyOnce, [])

const App = ({ launches, getLaunches, searchByTerm, searchTerm }: AppProps) => {
  useMountEffect(() => {
    if (getLaunches)
      getLaunches();
  });
   
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Launches launches={launches??[]} searchByTerm={(term) => searchByTerm(term)} searchTerm={searchTerm} />
          </Route>
          <Route path="/launch/:launchId" component={Launch} />         
        </Switch>
      </div>
    </Router>
  );
}

const mapDispatchToProps = (dispatch: (arg0: { type: string; }) => any) => ({
    getLaunches: async () => dispatch(await fetchLaunches()),
    searchByTerm: (searchTerm: String) => dispatch(setSearchTerm(searchTerm)),
});

const mapStateToProps = (state: any) => ({
      launches: state.launches,
      searchTerm: state.searchTerm
});

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);

// eslint-disable-next-line import/no-anonymous-default-export
export default () => (
  <Provider store={store}>
    <ConnectedApp/>
  </Provider>
)