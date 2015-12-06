import chai from 'chai'
import { expect, should } from 'chai'
import chaiImmutable from 'chai-immutable'
import React from 'react'
import ReactTestUtils from 'react-addons-test-utils'
import testDOM from './test_dom'

testDOM('<html><body></body></html>')

global.expect = expect
global.should = should()
global.React = React
global.TestUtils = ReactTestUtils
global.renderIntoDocument = ReactTestUtils.renderIntoDocument
global.scryByType = ReactTestUtils.scryRenderedComponentsWithType
global.scryByTag = ReactTestUtils.scryRenderedDOMComponentsWithTag
global.findByTag = ReactTestUtils.findRenderedDOMComponentWithTag
global.scryByClass = ReactTestUtils.scryRenderedDOMComponentsWithClass
global.findByClass = ReactTestUtils.findRenderedDOMComponentWithClass
global.Simulate = ReactTestUtils.Simulate

Object.keys(window).forEach((key) => {
  if (!(key in global)) {
    global[key] = window[key]
  }
})

chai.use(chaiImmutable)
