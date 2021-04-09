import reducer, {
  setAlert,
  removeAlert,
  AlertState,
} from '../features/alertSlice'

describe('setAlert', () => {
  it('Should return empty if initialState was empty', () => {
    let initialState: AlertState = {
      alert: [
        {
          id: '',
          msg: '',
          alertType: '',
        },
      ],
    }
    const action = { type: setAlert.type, payload: initialState.alert[0] }
    const state = reducer(initialState, action)
    expect(state.alert[0]).toEqual(action.payload)
  })
  it('Should return alert if required was fulfilled', () => {
    let alertState: AlertState = {
      alert: [
        {
          id: 'id1',
          msg: 'msg1',
          alertType: 'danger',
        },
      ],
    }
    const action = { type: setAlert.type, payload: alertState.alert[0] }
    const state = reducer(alertState, action)
    expect(state.alert[0]).toEqual(action.payload)
  })
})

describe('removeAlert', () => {
  it('Should work removeAlert', () => {
    let alertState: AlertState = {
      alert: [
        {
          id: 'id1',
          msg: 'msg1',
          alertType: 'danger',
        },
        {
          id: 'id2',
          msg: 'msg2',
          alertType: 'danger',
        },
      ],
    }
    const action = { type: removeAlert.type, payload: alertState.alert[0] }
    const state = reducer(alertState, action)
    expect(state.alert).toEqual(
      expect.arrayContaining([
        {
          id: 'id2',
          msg: 'msg2',
          alertType: 'danger',
        },
      ])
    )
    // action.payloadのalertが消えているか確認
    expect(state.alert).toEqual(
      expect.not.arrayContaining([
        {
          id: 'id1',
          msg: 'msg1',
          alertType: 'danger',
        },
      ])
    )
  })
})
