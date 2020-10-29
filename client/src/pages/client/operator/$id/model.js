import api from 'api';

export default ({
  namespace: 'operator',
  subscriptions: {
    setup({dispatch, history}) {
      history.listen((location) => {
        if (location.pathname.startsWith('/client/operator/')) {
          const id = location.pathname.split('/')[3];
          if (!location.pathname.split('/')[4]) {
            dispatch({
              type: 'getOperators',
              payload: {}
            });
            dispatch({
              type: 'getOperatorById',
              payload: {path: id}
            }).then(res => {
              if (res.success)
                dispatch({
                  type: 'getOperatorNews',
                  payload: {
                    path: res.name.toUpperCase()
                  }
                })
            })
          } else {
            dispatch({
              type: 'getOperators',
              payload: {}
            });
            dispatch({
              type: 'getOperatorById',
              payload: {path: id}
            })
          }
        }
      })
    }
  },
  state: {
    operatorItem: {},
    operators: [],
    news: [],
  },
  effects: {
    * getOperatorById({payload}, {call, put, select}) {
      const res = yield call(api.getOperatorById, payload);
      yield put({type: 'updateState', payload: {operatorItem: res}});
      return res;
    },
    * getOperators({payload}, {call, put, select}) {
      const res = yield call(api.getOperators, payload);
      yield put({type: 'updateState', payload: {operators: res.list}})
    },
    * getOperatorNews({payload}, {call, put, select}) {
      yield put({type: 'updateState', payload: {news: []}})
      const res = yield call(api.getNewsByCompany, payload);
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
