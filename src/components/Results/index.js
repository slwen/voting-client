import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { connect } from 'react-redux'
import Winner from '../Winner'
import * as actions from '../../actions'

export const Results = React.createClass({
  displayName: 'Results',
  mixins: [PureRenderMixin],
  propTypes: {
    pair: React.PropTypes.oneOfType([
      React.PropTypes.array,
      React.PropTypes.object
    ]),
    tally: React.PropTypes.object,
    next: React.PropTypes.func.isRequired,
    winner: React.PropTypes.string
  },

  getDefaultProps() {
    return {
      pair: [],
      tally: {}
    }
  },

  getVotes(entry) {
    const tally = this.props.tally

    if (tally && tally.has(entry)) {
      return tally.get(entry)
    }

    return 0;
  },

  renderEntries() {
    return this.props.pair.map(entry => {
      return (
        <div key={ entry } className="Results__entry">
          <h2>{ entry }</h2>
          <div>
            { this.getVotes(entry) }
          </div>
        </div>
      )
    })
  },

  renderControls() {
    return (
      <div className="Results__controls">
        <button
          ref="next"
          className="Results__next"
          onClick={ this.props.next }>
          Next
        </button>
      </div>
    )
  },

  render() {
    if (this.props.winner) {
      return <Winner ref="winner" name={ this.props.winner } />
    }

    return (
      <div className="Results">
        { this.renderEntries() }
        { this.renderControls() }
      </div>
    )
  }
})

function mapStateToProps(state) {
  return {
    pair: state.getIn(['vote', 'pair']),
    tally: state.getIn(['vote', 'tally']),
    winner: state.get('winner')
  }
}

export const ResultsContainer = connect(mapStateToProps, actions)(Results)
