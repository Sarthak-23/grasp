import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from '../src/components/Login/Login';
import Register from '../src/components/Register/Register';
import Home from '../src/components/Home/Home';
import Roadmap from '../src/components/Home/Roadmap/Roadmap';
import Search from '../src/components/Search/Search';
import { UserContext, UserProvider } from './context/UserContext';

//classes
import classes from './App.css';
import Profile from './components/Profile/Profile';

function Routes() {
    const [user, setUser] = React.useContext(UserContext);
    return (
        <Switch>
            <Route exact path="/login">
                <Login />
            </Route>
            <Route exact path="/register">
                <Register />
            </Route>
            <Route exact path="/search">
                <Search />
            </Route>
            <Route exact path="/roadmap/:id">
                <Roadmap />
            </Route>
            <Route exact path="/profile/:username">
                <Profile />
            </Route>
            <Route exact path="/">
                {!user || !user.id ? (
                    <Redirect to="/login" />
                ) : (
                    <Home user={user} setUser={setUser} />
                )}
            </Route>
        </Switch>
    );
}

function App() {
    return (
        <UserProvider>
            <Routes />
        </UserProvider>
    );
}

export default App;
