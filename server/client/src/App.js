import Navbar from "./components/Navbar";
import style from "./App.css"
import { Switch, Route, useHistory } from "react-router-dom";
import Home from "./views/Home";
import Login from "./views/Login";
import Profile from "./views/Profile";
import Signup from "./views/Signup";
import CreatePost from "./views/CreatePost";
import {useEffect, createContext, useReducer, useContext} from 'react'
import {reducer, initialState} from './reducers/userReducer'
import UserProfile from "./views/UserProfile"
import SubscribesUserPosts from "./views/SubscribesUserPosts"
import Reset from "./views/Reset"
import Newpassword from "./views/Newpassword"

export const UserContext = createContext()

const Routing = () => {
  const {state, dispatch} = useContext(UserContext)
  const history = useHistory()
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    console.log(user);
    if (user) {
      dispatch({type: "USER", payload: user})
    } else {
      if(!history.location.pathname.startsWith('/reset')){
        history.push('/login')
      }
    }
  }, [])

  return (
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

        <Route exact path='/profile/:userId'>
          <UserProfile />
        </Route>

        <Route exact path='/profile'>
          <Profile />
        </Route>

        <Route exact path='/create'>
          <CreatePost />
        </Route>

        <Route exact path='/followingpost'>
          <SubscribesUserPosts />
        </Route>

        <Route exact path='/reset/:token'>
          <Newpassword />
        </Route>

        <Route exact path='/reset'>
          <Reset />
        </Route>
      </Switch>
  )
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
      <Navbar />
      <Routing />
    </UserContext.Provider>
  );
}

export default App;
