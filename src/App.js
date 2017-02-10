import React, {PropTypes} from 'react'
import {Provider} from 'react-redux'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import Home from './containers/Home'
import Race from './containers/Race'
import colors from './utils/colors'
import DevTools from './utils/DevTools'

const isDev = process.env.NODE_ENV !== 'production'

const App = ({store}) => {
  return (
    <Provider store={store}>
      <div>
        <Router>
          <div>
            <Route exact path="/" component={Home} />
            <Route path="/race" component={Race} />

            <footer
              style={{
                position: 'absolute',
                bottom: 15,
                width: '100%',
                textAlign: 'center'
              }}
            >
              <small
                style={{
                  color: colors.gray.medium
                }}
              >
                Written by <a
                  rel="noopener"
                  href="https://github.com/chiefGui"
                  target="_blank"
                  style={anchorStyles}
                >
                  chiefGui
                </a>, <a
                  rel="noopener"
                  href="https://github.com/gabrielsch"
                  target="_blank"
                  style={anchorStyles}
                >
                   gabrielsch
                </a> and <a
                  rel="noopener"
                  target="_blank"
                  href="https://github.com/CentaurWarchief"
                  style={anchorStyles}
                >
                  CentaurWarchief
                </a>
              </small>
            </footer>
          </div>
        </Router>
        {isDev && <DevTools />}
      </div>
    </Provider>
  )
}

const anchorStyles = {
  color: colors.blue.light
}

App.propTypes = {
  store: PropTypes.object
}

export default App
