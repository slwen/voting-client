import { List, Map, fromJS } from 'immutable'
import { expect } from 'chai'
import reducer from '../'

describe('reducer', () => {
  it('handles SET_STATE', () => {
    const initialState = Map()
    const action = {
      type: 'SET_STATE',
      state: Map({
        vote: Map({
          pair: List.of('Judas Priest', 'Black Sabbath'),
          tally: Map({ 'Judas Priest': 1 })
        })
      })
    }
    const nextState = reducer(initialState, action)

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Judas Priest', 'Black Sabbath'],
        tally: { 'Judas Priest': 1 }
      }
    }))
  })

  it('handles SET_STATE without initial state', () => {
    const action = {
      type: 'SET_STATE',
      state: {
        vote: {
          pair: ['Judas Priest', 'Black Sabbath'],
          tally: { 'Judas Priest': 1 }
        }
      }
    }
    const nextState = reducer(undefined, action)

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Judas Priest', 'Black Sabbath'],
        tally: { 'Judas Priest': 1 }
      }
    }))
  })

  it('handles SET_STATE with plain JS payload', () => {
    const initialState = Map()
    const action = {
      type: 'SET_STATE',
      state: {
        vote: {
          pair: ['Judas Priest', 'Black Sabbath'],
          tally: { 'Judas Priest': 1 }
        }
      }
    }
    const nextState = reducer(initialState, action)

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Judas Priest', 'Black Sabbath'],
        tally: { 'Judas Priest': 1 }
      }
    }))
  })

  it('handles VOTE by setting myVote', () => {
    const state = fromJS({
      vote: {
        round: 50,
        pair: ['Judas Priest', 'Black Sabbath'],
        tally: { 'Judas Priest': 1 }
      }
    })
    const action = { type: 'VOTE', entry: 'Judas Priest' }
    const nextState = reducer(state, action)

    expect(nextState).to.equal(fromJS({
      vote: {
        round: 50,
        pair: ['Judas Priest', 'Black Sabbath'],
        tally: { 'Judas Priest': 1 }
      },
      myVote: {
        round: 50,
        entry: 'Judas Priest'
      }
    }))
  })

  it('does not set myVote for VOTE on invalid entry', () => {
    const state = fromJS({
      vote: {
        round: 20,
        pair: ['Judas Priest', 'Black Sabbath'],
        tally: { 'Judas Priest': 1 }
      }
    })
    const action = { type: 'VOTE', entry: 'Iron Maiden' }
    const nextState = reducer(state, action)

    expect(nextState).to.equal(fromJS({
      vote: {
        round: 20,
        pair: ['Judas Priest', 'Black Sabbath'],
        tally: { 'Judas Priest': 1 }
      }
    }))
  })

  it('removes myVote on SET_STATE if round changes', () => {
    const initialState = fromJS({
      vote: {
        round: 6,
        pair: ['Judas Priest', 'Black Sabbath'],
        tally: { 'Judas Priest': 1 }
      },
      myVote: {
        round: 6,
        entry: 'Judas Priest'
      }
    });
    const action = {
      type: 'SET_STATE',
      state: {
        vote: {
          round: 7,
          pair: ['Iron Maiden', 'Accept']
        }
      }
    };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        round: 7,
        pair: ['Iron Maiden', 'Accept']
      }
    }));
  });
})
