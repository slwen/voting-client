import { Voting } from '../'
import Winner from '../../Winner'
import Vote from '../../Vote'

const shallowRenderer = TestUtils.createRenderer()
const mockPair = ["Judas Priest", "Black Sabbath"]

describe('Voting component', () => {
  it('renders a winner component if there is a winner', () => {
    shallowRenderer.render(<Voting pair={ mockPair } winner="foobar" />)
    const component = shallowRenderer.getRenderOutput()
    component.props.children.type.should.equal(Winner)
  })

  it('renders voting buttons if there is no winner', () => {
    shallowRenderer.render(<Voting pair={ mockPair } />)
    const component = shallowRenderer.getRenderOutput()
    component.props.children.type.should.equal(Vote)
  })
})
