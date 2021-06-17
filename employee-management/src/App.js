import './App.css';
import Login from './pages/login';
import Register from './pages/register';
import Manage from './pages/manage';
import Employees from './pages/employees';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'
import { DoorClosed, DoorClosedFill, DoorOpen, PencilFill } from 'react-bootstrap-icons';

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
  }


  return (

    <div className="App">
      <Router>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#"><img src="https://ls-techs.com/wp-content/uploads/2019/07/logo.png" /></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {localStorage.getItem("isLogin") !== null ?
              <Nav variant className="mr-auto">
                <Nav.Link href="#" eventKey="link-1"><Link to="/manage">Manage</Link></Nav.Link>
                <Nav.Link href="#" eventKey="link-2"><Link to="/employees">My Employees</Link></Nav.Link>
              </Nav>
              : null}
            {localStorage.getItem("userData") !== null ?
              <Nav>
                <table>
                  <tr>
                    <td>
                      <img width="30" src="https://cdn.icon-icons.com/icons2/1736/PNG/512/4043260-avatar-male-man-portrait_113269.png" />
                    </td>
                    <td>
                      {
                        JSON.parse(localStorage.getItem("userData")).firstname + " " +
                        JSON.parse(localStorage.getItem("userData")).lastname}
                    </td>
                    <td>
                      <Nav.Link title="Logout" onClick={logout}><DoorOpen /></Nav.Link>
                    </td>
                  </tr>
                </table>
              </Nav>

              : null
            }


          </Navbar.Collapse>
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
