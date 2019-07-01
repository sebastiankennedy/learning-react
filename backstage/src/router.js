import React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';

import Container from './Container'
import Login from "./Login";
import App from './App'
import Dashboard from './pages/dashboard'
import NotMatch from './pages/noMatch'
import Loading from './pages/ui/loading'
import User from './pages/user';

class GlobalRouter extends React.Component {
    render() {
        return (
            <HashRouter>
                <Container>
                    <Route path="/login" component={Login}/>
                    <Route path="/admin" render={() =>
                        <App>
                            <Switch>
                                <Route path="/" component={User}/>
                                <Route path="/admin/dashboard" component={Dashboard}/>
                                <Route path="/admin/ui/loading" component={Loading}/>
                                <Route component={NotMatch}/>
                            </Switch>
                        </App>
                    }/>
                </Container>
            </HashRouter>
        )
    }
}

export default GlobalRouter;