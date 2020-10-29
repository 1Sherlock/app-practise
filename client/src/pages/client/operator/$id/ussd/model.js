import api from 'api';

export default ({
  namespace: 'ussds',
  state: {
    list: [],
  },
  effects: {
    * getUssd({payload}, {call, put, select}) {
      yield put({
        type: 'updateState',
        payload: {
          list:[]
        }
      })
      console.log(payload)
      const res = yield call(api.getUssd, payload);
      yield put({
        type: 'updateState',
        payload: {
          list:res.list
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
