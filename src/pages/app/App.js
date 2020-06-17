import React, { Component } from 'react';
import { HashRouter, Route, Redirect, Switch } from 'react-router-dom';
import StartPage from '../StartPage/StartPage'
import QuizPage from '../QuizPage/QuizPage'
import ClimatePage from '../ClimatePage/ClimatePage'
import './styles.css'

class App extends Component {
    render() {
        return (
          <div>
            <HashRouter>
                <Switch>
                    <Route exact path="/" render={() => <Redirect to="/start"/>} />
                    <Route path="/start" component={StartPage} />
                    <Route path="/quiz" component={QuizPage} />
                    <Route path="/climate" component={ClimatePage} />
                </Switch>
            </HashRouter>
          </div>
        );
    }
}

export default App;