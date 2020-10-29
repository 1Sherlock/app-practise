import api from 'api';

export default ({
  namespace: 'home',
  subscriptions: {
    setup({dispatch, history}) {
      history.listen((location) => {
        if (location.pathname === '/client') {
          dispatch({type: 'getSlider', payload: {}})
          dispatch({type: 'get3News', payload: {}})
        }
      })
    }
  },
  state: {
    sliders: [],
    news: [],
  },
  effects: {
    * getSlider({payload}, {call, put, select}) {
      const res = yield call(api.getSlider, {});
      yield put({type: 'updateState', payload: {sliders: res.list}})
    },
    * get3News({payload}, {call, put, select}) {
      const res = yield call(api.get3News, {});
      yield put({type: 'updateState', payload: {news: res.list}})
    },
  },
  reducers: {
    updateState(state, {payload}) {
      return {
        ...state,
        ...payload
      }
    }
  }
})
