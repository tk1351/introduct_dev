import reducer, {
  logout,
  AuthState,
  registerUser,
  loadUser,
  loginUser,
} from '../features/authSlice'

let initialState: AuthState = {
  auth: {
    token: null,
    isAuthenticated: false,
    loading: false,
    user: null,
  },
  status: 'idle',
  error: null,
}

let authState: AuthState = {
  auth: {
    token: 'token1',
    isAuthenticated: true,
    loading: false,
    user: {
      _id: '_id1',
      name: 'name1',
      email: 'email1',
      avatar: 'avatar1',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  },
  status: 'succeeded',
  error: null,
}

const userData = {
  _id: '_id1',
  name: 'name1',
  email: 'email1',
  avatar: 'avatar1',
  createdAt: new Date(),
  updatedAt: new Date(),
}

const loginData = {
  email: 'email1',
  password: 'password1',
}

describe('logout', () => {
  it('Should return empty when logout', () => {
    const action = { type: logout.type }
    const state = reducer(authState, action)
    expect(state).toEqual(initialState)
  })
})

describe('loadUser', () => {
  it('Should work loadUser when fulfilled', () => {
    const action = {
      type: loadUser.fulfilled.type,
      payload: authState.auth.user,
    }
    const state = reducer(initialState, action)
    expect(state.status).toEqual('succeeded')
    expect(state.auth.isAuthenticated).toBeTruthy()
    expect(state.auth.loading).toBeFalsy()

    expect(state.auth.user).toEqual(
      expect.objectContaining({
        name: 'name1',
        email: 'email1',
        avatar: 'avatar1',
      })
    )
  }),
    it('Should not work loadUser when pending', () => {
      const action = { type: loadUser.pending.type }
      const state = reducer(initialState, action)
      expect(state.status).toEqual('loading')
    }),
    it('Should not work loadUser when rejected', () => {
      const action = {
        type: loadUser.rejected.type,
        payload: authState,
        error: { message: 'Error' },
      }
      const state = reducer(initialState, action)
      expect(state.status).toEqual('failed')
      expect(state.auth.isAuthenticated).toBeFalsy()
      expect(state.auth.loading).toBeFalsy()
      expect(state.auth.user).toBeNull()
    })
})

describe('registerUser', () => {
  it('Should work registerUser when fulfilled', () => {
    const action = { type: registerUser.fulfilled.type, payload: { userData } }
    const state = reducer(initialState, action)
    expect(state.status).toEqual('succeeded')
    expect(state.auth.isAuthenticated).toBeTruthy()
    expect(state.auth.loading).toBeFalsy()

    expect(state.auth.user).toEqual(
      expect.objectContaining({
        name: 'name1',
        email: 'email1',
        avatar: 'avatar1',
      })
    )
  })
  it('Should not work registerUser when pending', () => {
    const action = { type: registerUser.pending.type }
    const state = reducer(initialState, action)
    expect(state.status).toEqual('loading')
  })
  it('Should not work registerUser when rejected', () => {
    const action = {
      type: registerUser.rejected.type,
      payload: { userData },
      error: { message: 'Error' },
    }
    const state = reducer(initialState, action)
    expect(state.status).toEqual('failed')
    expect(state.auth.isAuthenticated).toBeFalsy()
    expect(state.auth.loading).toBeFalsy()
    expect(state.auth.token).toBeNull()
    expect(state.auth.user).toBeNull()
  })
})

describe('loginUser', () => {
  it('Should work loginUser when fulfilled', () => {
    const action = { type: loginUser.fulfilled.type, payload: { loginData } }
    const state = reducer(authState, action)
    expect(state.status).toEqual('succeeded')
    expect(state.auth.isAuthenticated).toBeTruthy()
    expect(state.auth.loading).toBeFalsy()
  }),
    it('Should not work loginUser when pending', () => {
      const action = { type: loginUser.pending.type }
      const state = reducer(authState, action)
      expect(state.status).toEqual('loading')
    }),
    it('Should not work loginUser when rejected', () => {
      const action = {
        type: loginUser.rejected.type,
        payload: { loginData },
        error: { message: 'Error' },
      }
      const state = reducer(authState, action)
      expect(state.status).toEqual('failed')
      expect(state.auth.isAuthenticated).toBeFalsy()
      expect(state.auth.loading).toBeFalsy()
    })
})
