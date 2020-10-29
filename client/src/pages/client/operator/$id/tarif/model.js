import api from 'api';

export default ({
  namespace: 'tarif',
  state: {
    list: []
  },
  effects: {
    * getTarif({payload}, {call, put, select}) {
      const res = yield call(api.getTarif, payload);
      yield put({
        type: 'updateState',
        payload: {list: res.list}
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
