import createBrowserHistory from 'history/createBrowserHistory';

const history = createBrowserHistory();
const historyPush = (path, params) => history.push(path, params);
export { history, historyPush };