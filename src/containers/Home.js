import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import autoBind from 'react-autobind'

import * as matchActions from '../actions/match'
import colors from '../utils/colors'

class Home extends Component {
  constructor () {
    super()

    autoBind(this)
  }

  static propTypes = {
    match: PropTypes.object,
    addUser: PropTypes.func,
    removeUser: PropTypes.func
  }

  addUser (event) {
    event.preventDefault()

    const {addUser} = this.props
    const user = {
      name: this.usernameInput.value
    }

    addUser(user)

    this.usernameInput.focus()
    this.usernameInput.value = ''
  }

  removeUser (user) {
    const {removeUser} = this.props

    removeUser(user)
  }

  renderUser (user) {
    return (
      <div
        key={user.name}
        style={{
          position: 'relative',
          margin: '0 2em',
          width: 200,
          textAlign: 'center'
        }}
        className="pt-card pt-interactive"
        onClick={() => this.removeUser(user)}
      >
        <img
          style={{
            width: 60,
            height: 60
          }}
          src={`https://github.com/${user.name}.png`}
          role="presentation"
        /><br />

        <b
          style={{
            fontSize: '1.4em'
          }}
        >
          {user.name}
        </b>
      </div>
    )
  }

  renderUsers () {
    const {match} = this.props

    return (
      <div
        style={{
          display: 'flex',
          margin: '4em 0',
          maxWidth: 1150
        }}
      >
        {match.users.map(this.renderUser)}
      </div>
    )
  }

  render () {
    const {users} = this.props.match
    const inputPlaceholder = users.length === 0
      ? 'Type your username on GitHub'
      : 'Type another username on GitHub'
    const addUserButtonText = () => {
      if (users.length === 0) {
        return 'Add yourself'
      }

      if (users.length === 3) {
        return 'Add one last person'
      }

      return 'Add someone else'
    }

    return (
      <div
        style={{
          width: '100%',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colors.gray.lightest
        }}
      >
        <div>
          <section
            style={{
              marginBottom: '2em',
              textAlign: 'center'
            }}
          >
            <h1
              style={{
                marginTop: 0,
                color: colors.brand.medium
              }}
            >
              Commitment showtime
            </h1>

            <p
              style={{
                fontSize: '1.4em',
                color: colors.gray.dark
              }}
            >
              Compete to up 4 friends to decide who's the king of the hill on GitHub's commits.
            </p>
          </section>

          <section>
            <form onSubmit={this.addUser}>
              <div className="pt-control-group">
                <input
                  ref={input => { this.usernameInput = input }}
                  style={{
                    flex: 1
                  }}
                  className="pt-input pt-large"
                  placeholder={inputPlaceholder}
                />
                <button className="pt-button pt-intent-primary pt-large">
                  {addUserButtonText()}

                  <span className="pt-icon-standard pt-icon-plus pt-align-right" />
                </button>
              </div>
            </form>
          </section>
        </div>

        {this.renderUsers()}
      </div>
    )
  }
}

const mapStateToProps = ({match}) => ({match})

export default connect(mapStateToProps, matchActions)(Home)
