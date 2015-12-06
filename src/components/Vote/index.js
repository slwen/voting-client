import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

export default React.createClass({
  displayName: 'Vote',
  mixins: [PureRenderMixin],
  propTypes: {
    pair: React.PropTypes.array.isRequired,
    vote: React.PropTypes.func,
    hasVoted: React.PropTypes.string
  },

  getDefaultProps() {
    return {
      pair: [],
      hasVoted: ''
    }
  },

  handleVote(entry) {
    this.props.vote(entry)
  },

  isDisabled() {
    return !!this.props.hasVoted
  },

  renderVotedLabel(entry) {
    return this.props.hasVoted === entry && (
      <span className="Voting__voted-for">
        Voted
      </span>
    )
  },

  renderPair() {
    return this.props.pair.map(entry => {
      return (
        <div className="Voting__entry" key={ entry }>
          <button
            onClick={ this.handleVote.bind(null, entry) }
            disabled={ this.isDisabled() }>
            <div className="Voting__entry-name">
              { entry }{ this.renderVotedLabel(entry) }
            </div>
          </button>
        </div>
      )
    })
  },

  render() {
    return (
      <div className="Voting">
        { this.renderPair() }
      </div>
    )
  }
})
