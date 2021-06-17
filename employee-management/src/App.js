import './App.css';
import Login from './pages/login';
import Register from './pages/register';
import Manage from './pages/manage';
import Employees from './pages/employees';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from 'react-router-dom'

function App() {

  const logout = () => {

    localStorage.clear();
    window.location.reload();
    // dispatch({
    //   type: 'LOGOUT',
    //   payload: null
    // })
  }

  return (

    <div className="App">

      <Router>
        <Navbar bg="light" variant="light" style={{ boxShadow: '0px 2px 29px 1px #888888' }}>
          <Navbar.Brand><img src="https://ls-techs.com/wp-content/uploads/2019/07/logo.png" /></Navbar.Brand>
          <Nav fill variant="tabs" defaultActiveKey="/home">
            <Nav.Item>
              {
                localStorage.getItem("isLogin") !== null ?
                  <Nav>
                    <Nav.Link eventKey="link-3">
                      <Link to="/login" onClick={logout}>Logout</Link>
                    </Nav.Link>
                    <Nav.Link eventKey="link-4">
                      <Link to="/manage">Manage</Link>
                    </Nav.Link>

                    <Nav.Item>
                      <Nav.Link eventKey="link-5">
                        <Link to="/employees">Employees</Link>
                      </Nav.Link>


                    </Nav.Item>
                  </Nav>
                  : null}

            </Nav.Item>
          </Nav>
        </Navbar>

        <header className="App-header">
          <div>

            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            <Switch>

              <Route path="/login">
                <Login />
                Don't have an account? <Link to="/register">Sign Up</Link>.

              </Route>
              <Route path="/register">
                <Register />
                Have an account ? <Link to="/login">Sign In</Link>.
              </Route>
              <Route path="/manage">
                {localStorage.getItem("isLogin") !== null ?
                  <Manage /> :
                  <div>
                    <Login />
                    Don't have an account? <Link to="/register">Sign Up</Link>.
                  </div>

                }
              </Route>
              <Route path="/employees">
                {localStorage.getItem("isLogin") !== null ?
                  <Employees /> :
                  <div>
                    <Login />
                    Don't have an account? <Link to="/register">Sign Up</Link>.
                  </div>
                }
              </Route>
            </Switch>
          </div>
        </header>
      </Router>
    </div >
  );
}

export default App;
