import api from 'api';

export default ({
  namespace: 'paynet',
  state: {
    news: []
  },
  effects: {
    * getNews({payload}, {call, put, select}) {
      yield put({type: 'updateState', payload: {news: []}});
      const res = yield call(api.getPaynetNews, payload);
      console.log(res)
      yield put({type: 'updateState', payload: {news: res.list}})
    },
    * updateViewCountPaynet({payload}, {call, put, select}) {
      yield call(api.updateViewCountPaynet, payload)
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
