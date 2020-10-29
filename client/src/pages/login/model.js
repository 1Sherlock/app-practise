import api from 'api';
import router from "umi/router";
import notification from 'antd/es/notification';

export default ({
  namespace: 'login',
  state: {
    loading:false
  },
  subscriptions: {
    setup({dispatch, history}) {
      history.listen((location) => {
        if (location.pathname === "/login") {
          dispatch({
            type: 'me'
          })
        }
      })
    }
  },
  effects: {
    * signIn({payload}, {call, put, select}){
      yield put({
        type:'updateState',
        payload:{
          loading:true
        }
      })
      const res = yield call(api.signIn, payload);
      if (res.token) {
        yield put({
          type:'updateState',
          payload:{
            loading:false
          }
        })
        localStorage.setItem('ussd-token', 'Bearer ' + res.token)
        window.location.href='/dashboard';
        //router.push('/dashboard');
      } else {
        yield put({
          type:'updateState',
          payload:{
            loading:false
          }
        })
        notification.error({
          message: res.message
        })
      }
    },
    * me({payload}, {call, put, select}){
      try {
        const res = yield call(api.me, {});
        if (res.login) {
          window.location.href='/dashboard';
          //router.push('/dashboard');
        }
      } catch (err) {
      }
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
