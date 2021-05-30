import logo from './logo.svg';
import './App.css';
import SignIn from './components/SignIn'
import Dashboard from './components/Dashboard'
import { AuthProvider }  from './contexts/AuthContext'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'

function App() {
  return (
    <Router>
    <AuthProvider>
      <Switch>
        <PrivateRoute exact path="/" component={Dashboard} />
        <Route path='/signin' component={SignIn}/>
      </Switch>
    </AuthProvider>
    </Router>
  );
}

export default App;
