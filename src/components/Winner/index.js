import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

export default React.createClass({
  displayName: 'Winner',
  mixins: [PureRenderMixin],
  propTypes: {
    name: React.PropTypes.string.isRequired
  },

  render() {
    return (
      <div className="Winner" ref="winner">
        Winner is <span className="Winner__name">{ this.props.name }</span>
      </div>
    )
  }
})
