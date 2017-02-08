import React, {PropTypes} from 'react'
import {Provider} from 'react-redux'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import Home from './containers/Home'

const App = ({store}) => {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Route exact path="/" component={Home} />
        </div>
      </Router>
    </Provider>
  )
}

App.propTypes = {
  store: PropTypes.object
}

export default App
