import ReactDOM from 'react-dom'
import { List, Map } from 'immutable'
import { Results } from '../'

const stub = () => {}

describe('Results component', () => {
  it('renders entries with vote counts or zero', () => {
    const pair = List.of('Judas Priest', 'Black Sabbath')
    const tally = Map({ 'Judas Priest': 5 })
    const component = renderIntoDocument(
      <Results pair={ pair } tally={ tally } next={ stub } />
    )
    const entries = scryByClass(component, 'Results__entry')
    const [judas, black] = entries.map(e => e.textContent)

    expect(entries.length).to.equal(2)
    expect(judas).to.contain('Judas Priest')
    expect(judas).to.contain('5')
    expect(black).to.contain('Black Sabbath')
    expect(black).to.contain('0')
  })

  it('invokes the next callback when next button is clicked', () => {
    let nextInvoked = false
    const next = () => nextInvoked = true
    const pair = List.of('Judas Priest', 'Black Sabbath')
    const component = renderIntoDocument(
      <Results
        pair={ pair }
        tally={ Map() }
        next={ next }/>
    )

    Simulate.click(ReactDOM.findDOMNode(component.refs.next))
    nextInvoked.should.equal(true)
  })

  it('renders the winner when there is one', () => {
    const component = renderIntoDocument(
      <Results
        winner="Judas Priest"
        pair={[ 'Judas Priest', '28 Days Later' ]}
        tally={ Map() }
        next={ stub } />
    )
    const winner = ReactDOM.findDOMNode(component.refs.winner)
    winner.should.be.ok
    winner.textContent.should.contain('Judas Priest')
  });
})
