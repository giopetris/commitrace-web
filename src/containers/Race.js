import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import autoBind from 'react-autobind'
import qs from 'querystring'
import moment from 'moment'
import {Motion, spring, presets} from 'react-motion'

import * as raceActions from '../actions/race'
import colors from '../utils/colors'
import Img from '../components/Img'

class Race extends Component {
  constructor () {
    super()

    autoBind(this)
  }

  static propTypes = {
    race: PropTypes.object,
    location: PropTypes.object,
    requestUsers: PropTypes.func
  }

  componentDidMount () {
    const {location, requestUsers} = this.props
    const parsedQueryString = qs.parse(location.search)

    this.fromDate = parsedQueryString.from
    this.toDate = parsedQueryString.to

    const usersFromQueryString = parsedQueryString['?users'].split(',')
    const raceOptions = {
      users: usersFromQueryString,
      fromDate: this.fromDate,
      toDate: this.toDate
    }

    requestUsers(raceOptions)
  }

  renderCommitsLine (commitsNumber) {
    const commitsNumberPercentage = Math.round(100 * commitsNumber / this.firstPlaceCommiter.commits)

    return (
      <div
        style={{
          position: 'relative',
          height: 8
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: colors.gray.light,
            borderRadius: 10
          }}
        >
          <Motion
            defaultStyle={{widthPercentage: 0}}
            style={{widthPercentage: spring(commitsNumberPercentage, presets.noWobble)}}
          >
            {({widthPercentage}) => {
              return (
                <div
                  style={{
                    width: `${widthPercentage}%`,
                    height: '100%',
                    backgroundColor: colors.green.medium,
                    borderRadius: 'inherit'
                  }}
                />
              )
            }}
          </Motion>
        </div>
      </div>
    )
  }

  renderUser ({name, commits}, index) {
    const actualPosition = index + 1
    const isFirstPlace = actualPosition === 1
    const getLastCharactersOfSupElement = () => {
      if (actualPosition === 1) {
        return 'st'
      }

      if (actualPosition === 2) {
        return 'nd'
      }

      if (actualPosition === 3) {
        return 'rd'
      }

      return 'th'
    }
    const getPhotoWidth = () => {
      if (actualPosition === 1) {
        return 120
      }

      if (actualPosition === 2) {
        return 100
      }

      if (actualPosition === 3) {
        return 80
      }

      return 60
    }
    let commitsNumberMessage = `${commits} commits`

    if (isFirstPlace) {
      const firstPlaceToSecondPlaceCommitsDifference = this.firstPlaceCommiter.commits - this.secondPlaceCommiter.commits
      commitsNumberMessage = `${commits} commits, winning by a difference of ${firstPlaceToSecondPlaceCommitsDifference}`
    }

    return (
      <div
        key={name}
        style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: 40
        }}
      >
        <a
          rel="noopener"
          target="_blank"
          href={`https://github.com/${name}`}
          style={{
            display: 'inline-block',
            marginRight: 40
          }}
        >
          <Img
            style={{
              display: 'block',
              width: getPhotoWidth(),
              height: getPhotoWidth()
            }}
            src={`https://github.com/${name}.png`}
          />
        </a>

        <div
          style={{
            width: '100%',
            height: '100%'
          }}
        >
          <p
            style={{
              fontSize: '1.1rem',
              color: colors.brand.medium
            }}
          >
            {actualPosition}<sup>{getLastCharactersOfSupElement()}</sup> {name}
          </p>

          {this.renderCommitsLine(commits, actualPosition)}

          <small
            style={{
              color: colors.gray.medium
            }}
          >
            {commitsNumberMessage}
          </small>
        </div>
      </div>
    )
  }

  renderContent () {
    const {race} = this.props
    const fromBiggerToLowerCommiters = race.users.sort((a, b) => b.commits - a.commits)
    const formattedFromDate = moment(this.fromDate).format('MMMM Do YYYY')
    const formattedToDate = moment(this.toDate).format('MMMM Do YYYY')
    const dateDifferenceInDays = moment(this.toDate).diff(this.fromDate, 'days')

    this.firstPlaceCommiter = fromBiggerToLowerCommiters[0]
    this.secondPlaceCommiter = fromBiggerToLowerCommiters[1]

    return (
      <div>
        <header
          style={{
            position: 'relative',
            padding: '40px 80px',
            width: '100%',
            zIndex: 1
          }}
        >
          <h3
            style={{
              color: colors.brand.medium,
              fontWeight: 400
            }}
          >
            From <date style={dateStyle}>{formattedFromDate}</date> to <date style={dateStyle}>{formattedToDate}</date>
          </h3>

          <span
            style={{
              color: colors.gray.medium
            }}
          >
            Range of {dateDifferenceInDays} days
          </span>
        </header>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '0 80px',
            maxWidth: 960,
            width: '100%',
            height: 'auto'
          }}
        >
          {fromBiggerToLowerCommiters.map(this.renderUser)}
        </div>
      </div>
    )
  }

  renderLoader () {
    return (
      <div style={centeredContainerStyle}>
        <h5
          style={{
            color: colors.gray.medium,
            fontWeight: 300
          }}
        >
          Loading...
        </h5>
      </div>
    )
  }

  render () {
    const {race} = this.props
    const shouldRenderLoader = race.users.length === 0

    if (shouldRenderLoader) { return this.renderLoader() }

    return (
      <div
        style={{
          width: '100%',
          height: '100vh',
          backgroundColor: colors.gray.lightest
        }}
      >
        {shouldRenderLoader ? this.renderLoader() : this.renderContent()}
      </div>
    )
  }
}

const centeredContainerStyle = {
  position: 'absolute',
  top: 0,
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center'
}

const dateStyle = {
  fontWeight: 600
}

const mapStateToProps = ({race}) => ({race})

export default connect(mapStateToProps, raceActions)(Race)
