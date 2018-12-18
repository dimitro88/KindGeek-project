import React, { Component } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';

import './styles/base.scss';
import MainLayout from "./Layout/Main";
import Login from "./containers/Login";
import Register from "./containers/Register";

import AuthService from "./services/AuthService"

import AddNewItemContainer from "./containers/AddNewItemContainer";
import TasksContainer from "./containers/TasksContainer";
import TaskDetailsContainer from "./containers/TaskDetailsContainer";
import Error404 from "./components/Error404";


import { history } from "./helpers/historyPush"
import store from "./store";

import {PATHS} from "./constants/routes";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <div className="App">
            <MainLayout>
              <Switch>
                <Route exact path={PATHS.INDEX} render={()=>(
                  <Redirect to={PATHS.TASKS} />
                )} />
                <Route exact path={PATHS.LOGIN} component={Login} />
                <Route exact path={PATHS.REGISTER} component={Register}/>
                <Route exact path={PATHS.TASKS} render={ () => (
                  AuthService.isAuth() ? <TasksContainer/> : <Redirect to={PATHS.LOGIN} />
                )}/>
                <Route exact path={PATHS.TASK_DETAILS} render={(params)=>(
                  AuthService.isAuth() ? <TaskDetailsContainer params={params}/> : <Redirect to={PATHS.LOGIN} />
                  )}/>
                <Route exact path={PATHS.CREATE_TASK} render={ () => (
                  AuthService.isAuth() ? <AddNewItemContainer/> : <Redirect to={PATHS.LOGIN} />
                )}/>
                <Route component={Error404}/>
              </Switch>
            </MainLayout>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
