import ReactDOM from 'react-dom'
import Vote from '../'
import { List } from 'immutable'

const mockPair = ["Judas Priest", "Black Sabbath"]

describe('Vote component', () => {
  it('renders a pair of buttons', () => {
    const component = renderIntoDocument(
      <Vote pair={ mockPair } />
    )
    const buttons = scryByTag(component, 'button')
    buttons.length.should.equal(2)
    buttons[0].textContent.should.equal('Judas Priest')
    buttons[1].textContent.should.equal('Black Sabbath')
  })

  it('invokes callback when a button is clicked', () => {
    let votedWith
    const vote = (entry) => votedWith = entry
    const component = renderIntoDocument(
      <Vote pair={ mockPair } vote={ vote } />
    )
    const buttons = scryByTag(component, 'button')

    Simulate.click(buttons[0])
    expect(votedWith).to.equal('Judas Priest')
  })

  it('disables buttons when user has voted', () => {
    const component = renderIntoDocument(
      <Vote
        pair={ ["Judas Priest", "Black Sabbath"] }
        hasVoted="Judas Priest" />
    )
    const buttons = scryByTag(component, 'button')

    expect(buttons.length).to.equal(2)
    expect(buttons[0].hasAttribute('disabled')).to.equal(true)
    expect(buttons[1].hasAttribute('disabled')).to.equal(true)
  })

  it('adds label to the voted entry', () => {
    const component = renderIntoDocument(
      <Vote
        pair={ ["Judas Priest", "Black Sabbath"] }
        hasVoted="Judas Priest" />
    )
    const buttons = scryByTag(component, 'button')

    expect(buttons[0].textContent).to.contain('Voted')
  })
})
