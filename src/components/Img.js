import React, {Component, PropTypes} from 'react'

import colors from '../utils/colors'

class Img extends Component {
  state = {isLoaded: false, hasError: false}

  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    placeholderColor: PropTypes.string
  }

  static defaultProps = {
    width: 100,
    height: 100,
    placeholderColor: colors.gray.light
  }

  renderLoader () {
    const {width, height} = this.props

    return (
      <div
        style={{
          position: 'absolute'
        }}
        className="pt-spinner pt-small"
      >
        <div className="pt-spinner-svg-container">
          <svg viewBox={`0 0 ${width} ${height}`}>
            <path
              className="pt-spinner-track"
              d="M 50,50 m 0,-44.5 a 44.5,44.5 0 1 1 0,89 a 44.5,44.5 0 1 1 0,-89"
            />
            <path
              className="pt-spinner-head" d="M 94.5 50 A 44.5 44.5 0 0 0 50 5.5"
            />
          </svg>
        </div>
      </div>
    )
  }

  render () {
    const {placeholderColor} = this.props
    const {isLoaded} = this.state

    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: placeholderColor
        }}
      >
        {!isLoaded && this.renderLoader()}

        <img
          onLoad={() => this.setState({isLoaded: true})}
          {...this.props}
        />
      </div>
    )
  }
}

export default Img
