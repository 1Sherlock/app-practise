import api from 'api';
import notification from 'antd/es/notification';

export default ({
  namespace: 'menu',
  state: {
    visible: false,
    tableLoading: false,
    title: 'Create',
    confirmLoading: false,
    currentItem: {},
    list: [],
  },
  effects: {
    * createOrUpdate({payload}, {call, put, select}){
      yield put({
        type: 'updateState',
        payload: {
          confirmLoading: true,
        }
      })
      const res = yield call(payload.path ? api.updateMenu : ()=>{return {error:"Qo'shib bo'lmaydi"}}, payload);
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
        yield put({type: 'read'})
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
      yield put({
        type: 'updateState',
        payload: {tableLoading: true}
      })
      const res = yield call(api.getMenu, {});
      yield put({type: 'updateState', payload: {list: res.list, tableLoading: false}})
    },
    // * deleteItem({payload}, {call, put, select}){
    //   const res = yield call(api.deleteMenu, payload);
    //   yield put({type: 'read'});
    // }
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
