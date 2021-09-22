import Navbar from "./components/Navbar";
import style from "./App.css"
import { Switch, Route } from "react-router-dom";
import Home from "./views/Home";
import Login from "./views/Login";
import Profile from "./views/Profile";
import Signup from "./views/Signup";
import CreatePost from "./views/CreatePost";

function App() {
  return (
    <>
      <Navbar />

      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>

        <Route exact path='/signup'>
          <Signup />
        </Route>

        <Route exact path='/login'>
          <Login />
        </Route>

        <Route exact path='/profile'>
          <Profile />
        </Route>

        <Route exact path='/create'>
          <CreatePost />
        </Route>
      </Switch>
    </>
  );
}

export default App;
