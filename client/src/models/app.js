import api from 'api';
import router from "umi/router";
import {openPages} from 'utils/config'

export default ({
  namespace: 'app',
  state: {
    user: {},
    operators: [],
    operator: '',
    menus: [],
    searchList: [],
    searchText: '',
    searchOperator: ''
  },
  subscriptions: {
    setup({dispatch, history}) {
      history.listen((location) => {
        if (!openPages.includes(location.pathname) && !location.pathname.includes('/client')) {
          dispatch({
            type: 'me'
          })
        }
        // if (location.pathname.startsWith('/search')) {
        //   dispatch({
        //     type: 'search'
        //   })
        // }
      })
    }
  },
  effects: {
    * me({payload}, {call, put, select}) {
      try {
        const res = yield call(api.me, {});
        if (res.login) {
          yield put({
            type: 'updateState',
            payload: {
              user: res
            }
          })
        } else {
          localStorage.removeItem('ussd-token');
          router.push('/login');
        }
      } catch (err) {
        localStorage.removeItem('ussd-token');
        router.push('/login');
      }
    },
    * getOperators({payload}, {call, put, select}) {
      const res = yield call(api.getOperators, {});
      yield put({type: 'updateState', payload: {operators: res.list}})
      return res;
    },
    * getMenu({payload}, {call, put, select}) {
      const res = yield call(api.getMenu, {});
      yield put({
        type: 'updateState',
        payload: {
          menus: res.list
        }
      })
    },
    * search({payload}, {call, put, select}) {
      const {searchText, searchOperator} = yield select(_ => _.app);
      let a = {};
      if (!payload) {
        if (searchText) {
          a.search = searchText;
        }
        if (searchOperator) {
          a.operator = searchOperator;
        }
        if (a.search) {
          payload = a;
        }
      }
      const res = yield call(api.search, payload);
      yield put({
        type: 'updateState',
        payload: {
          searchList: res.list
        }
      })
    },
    * updateNewsViewCount({payload}, {call, put, select}) {
      console.log(payload)
      yield call(api.updateViewCount, payload);
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
