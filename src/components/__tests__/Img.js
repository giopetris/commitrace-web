import React from 'react'
import {shallow} from 'enzyme'

import Img from '../Img'

it('renders a wrapper div', () => {
  const component = shallow(<Img />)

  expect(component.is('div')).toBeTruthy()
})

it('renders an img', () => {
  const component = shallow(<Img />)

  expect(component.containsMatchingElement(<img />)).toBeTruthy()
})

it('renders the loader when state isLoaded is true', () => {
  const component = shallow(<Img />)

  expect(component.find('.pt-spinner').exists()).toBeTruthy()
})

it('does not render the loader when state isLoaded is false', () => {
  const component = shallow(<Img />)

  component.setState({isLoaded: true})

  expect(component.find('.pt-spinner').exists()).toBeFalsy()
})
