import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { connect } from 'react-redux'
import Winner from '../Winner'
import Vote from '../Vote'
import * as actions from '../../actions'

export const Voting = React.createClass({
  displayName: 'Voting',
  mixins: [PureRenderMixin],
  propTypes: {
    pair: React.PropTypes.array.isRequired,
    vote: React.PropTypes.func,
    hasVoted: React.PropTypes.string,
    winner: React.PropTypes.string
  },

  getDefaultProps() {
    return {
      pair: [],
      hasVoted: ''
    }
  },

  render() {
    return (
      <div className="Voting">
        { this.props.winner ? <Winner name={ this.props.winner } />
          : <Vote { ...this.props } /> }
      </div>
    )
  }
})

function mapStateToProps(state) {
  return {
    pair: state.getIn(['vote', 'pair']),
    winner: state.get('winner'),
    hasVoted: state.get('hasVoted')
  }
}

export const VotingContainer = connect(mapStateToProps, actions)(Voting)
