import api from 'api';

export default ({
  namespace: 'service',
  state: {
    categories: [],
    list: [],
    activeCategory: 0
  },
  effects: {
    * getServiceCategory({payload}, {call, put, select}) {
      yield put({
        type: 'updateState',
        payload: {
          categories: [],
          list: []
        }
      });
      const res = yield call(api.getServiceCategory, payload);
      yield put({
        type: 'updateState',
        payload: {
          categories: res.list
        }
      });
      if (res.list.length > 0) {
        yield put({
          type: 'getService',
          payload: {path: res.list[0].id}
        })
      }
    },
    * getService({payload}, {call, put, select}) {
      yield put({
        type: 'updateState',
        payload: {
          list: []
        }
      })
      yield put({
        type: 'updateState',
        payload: {
          activeCategory: payload.path
        }
      })
      const res = yield call(api.getService, payload);
      yield put({
        type: 'updateState',
        payload: {
          list: res.list
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
