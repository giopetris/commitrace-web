import React from 'react'
import ReactDOM from 'react-dom'
import '@blueprintjs/core'
import '@blueprintjs/core/dist/blueprint.css'

import App from './App'
import configureStore from './store/configureStore'

import 'normalize.css/normalize.css'
import './index.css'

const store = configureStore()

ReactDOM.render(<App store={store} />, document.getElementById('root'))
