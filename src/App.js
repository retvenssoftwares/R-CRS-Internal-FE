import { BrowserRouter, Switch } from 'react-router-dom';
import { Provider } from 'react-redux'
import {store} from './store/store'
import Routes from './routes/';

function App() {
  return (
   <Provider store={store}>
     <BrowserRouter>
        <Switch>
           <Routes />
        </Switch>
    </BrowserRouter>
   </Provider>
  );
}

export default App;
