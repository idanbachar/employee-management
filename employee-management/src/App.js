import './App.css';
import Login from './pages/login';
import Register from './pages/register';
import Manage from './pages/manage';
import Employees from './pages/employees';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'

function App() {
  return (

    <div className="App">

      <Router>
        <Navbar bg="light" variant="light" style={{ boxShadow: '0px 2px 29px 1px #888888' }}>
          <Navbar.Brand><img src="https://ls-techs.com/wp-content/uploads/2019/07/logo.png" /></Navbar.Brand>
          <Nav className="mr-auto">
            <Link to="/login"> Login</Link> |
            <Link to="/register"> Register</Link>  |
            <Link to="/manage"> Manage</Link>  |
            <Link to="/employees"> Employees</Link> 
          </Nav>

        </Navbar>


        <header className="App-header">

          <div>


            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            <Switch>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/register">
                <Register />
              </Route>
              <Route path="/manage">
                <Manage />
              </Route>
              <Route path="/employees">
                <Employees />
              </Route>
            </Switch>
          </div>
        </header>
      </Router>
    </div >
  );
}

export default App;
