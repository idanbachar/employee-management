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
        <header className="App-header">
        </header>
        <div class="row">
          <div class="col-md-12">

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
                {localStorage.getItem("userData") !== null && localStorage.getItem("userData") !== undefined ?
                  <Nav>
                    <div class="col-md-2">
                      <img width="35" height="35" src="https://cdn.icon-icons.com/icons2/1736/PNG/512/4043260-avatar-male-man-portrait_113269.png" />
                    </div>
                    <div class="col-md-6">
                      {
                        JSON.parse(localStorage.getItem("userData")).firstname + " " + JSON.parse(localStorage.getItem("userData")).lastname
                      }

                    </div>
                    <div class="col-md-4">
                      <Nav.Link><Link onClick={logout}><DoorOpen /></Link></Nav.Link>
                    </div>

                  </Nav>

                  : null
                }
              </Navbar.Collapse>
            </Navbar>

          </div>
        </div>


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
            {localStorage.getItem("isLogin") !== null ?
              <Manage /> :
              <Login />

            }
          </Route>
          <Route path="/employees">
            {localStorage.getItem("isLogin") !== null ?
              <Employees /> :
              <Login />
            }
          </Route>
        </Switch>

      </Router>
    </div >
  );
}

export default App;
