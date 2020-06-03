import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Header from './Header'
import {connect} from 'react-redux'
import * as actions from '../actions'
import Landing from './Landing'
import Surveys from './Surveys'
import Dashboard from './Dashboard'

class App extends React.Component {
  componentDidMount(){
    this.props.fetchUser();
  }
  render() {
    return (
    <div className="container">
      <BrowserRouter>
          <Header />
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/surveys" component={Dashboard} />
          <Route path="/surveys/new" component={Surveys} />
        </Switch>
      </BrowserRouter>
    </div>
    )
  }
}

export default connect(null,actions)(App)