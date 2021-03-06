import api from 'api';
import notification from 'antd/es/notification';

export default ({
  namespace: 'ussd',
  subscriptions: {
    setup({dispatch, history}) {
      history.listen((location) => {
        if (location.pathname.includes('/ussd')) {
          const id = location.pathname.split('/')[2];
          dispatch({type: 'app/updateState', payload: {operator: id,}})
          dispatch({
            type: 'updateState',
            payload: {
              operator: id,
              list: [],
            }
          })
          dispatch({
            type: 'read',
            payload: {
              path: id
            }
          })
        }
      })
    }
  },
  state: {
    operator: '',
    visible: false,
    tableLoading: false,
    title: 'Create',
    confirmLoading: false,
    currentItem: {},
    list: [],
  },
  effects: {
    * createOrUpdate({payload}, {call, put, select}){
      const {operator} = yield select(_ => _.ussd);
      yield put({
        type: 'updateState',
        payload: {
          confirmLoading: true,
        }
      })
      const res = yield call(payload.path ? api.updateUssd : api.createUssd, {operator, ...payload});
      if (res.error) {
        notification.error({
          message: res.error
        })
      } else {
        notification.success({
          message: payload.path ? "O'zgartirildi" : "Qo'shildi"
        })
        yield put({
          type: 'updateState',
          payload: {
            confirmLoading: false,
            currentItem: {},
            visible: false,
            title: 'Create'
          }
        })
        yield put({type: 'read', payload: {path: operator}});
      }
      yield put({
        type: 'updateState',
        payload: {
          confirmLoading: false,
        }
      })
      return res;
    },
    * read({payload}, {call, put, select}){
      const {operator} = yield select(_ => _.ussd);
      yield put({
        type: 'updateState',
        payload: {tableLoading: true}
      })
      const res = yield call(api.getUssd, operator ? {path: operator} : payload);
      yield put({type: 'updateState', payload: {list: res.list, tableLoading: false}})
    },
    * deleteItem({payload}, {call, put, select}){
      const res = yield call(api.deleteUssd, payload);
      yield put({type: 'read'});
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
