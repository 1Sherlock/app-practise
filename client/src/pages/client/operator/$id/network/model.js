import api from 'api';

export default ({
  namespace: 'network',
  state: {
    categories: [],
    networks: [],
    activeCategory: 0
  },
  effects: {
    * getNetworkCategory({payload}, {call, put, select}) {
      yield put({
        type: 'updateState',
        payload: {
          categories: [],
          networks: []
        }
      })
      const res = yield call(api.getNetworkCategory, payload);
      yield put({
        type: 'updateState',
        payload: {
          categories: res.list
        }
      })
      if (res.list.length > 0) {
        yield put({
          type: 'getNetwork',
          payload: {path: res.list[0].id}
        })
      }
    },
    * getNetwork({payload}, {call, put, select}) {
      yield put({
        type: 'updateState',
        payload: {
          networks: []
        }
      })
      yield put({
        type: 'updateState',
        payload: {
          activeCategory: payload.path
        }
      })
      const res = yield call(api.getNetwork, payload);
      yield put({
        type: 'updateState',
        payload: {
          networks: res.list
        }
      })
    }
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
