import api from 'api';
import notification from 'antd/es/notification';

export default ({
  namespace: 'news',
  state: {
    visible: false,
    tableLoading: false,
    title: 'Create',
    confirmLoading: false,
    currentItem: {},
    list: [],
    operators: []
  },
  effects: {
    * createOrUpdate({payload}, {call, put, select}){
      yield put({type: 'updateState', payload: {confirmLoading: true,}});
      const res = yield call(payload.get('path') ? api.updateNews : api.createNews, payload);
      if (res.error) {
        notification.error({message: res.error})
      } else {
        notification.success({message: payload.path ? "O'zgartirildi" : "Qo'shildi"})
        yield put({
          type: 'updateState',
          payload: {confirmLoading: false, currentItem: {}, visible: false, title: 'Create'}
        })
        yield put({type: 'read'})
      }
      yield put({type: 'updateState', payload: {confirmLoading: false,}})
      return res;
    },
    * read({payload}, {call, put, select}){
      yield put({
        type: 'updateState',
        payload: {tableLoading: true}
      })
      const res = yield call(api.getNews, {});
      yield put({type: 'updateState', payload: {list: res.list, tableLoading: false}})
    },
    * readOperators({payload}, {call, put, select}){
      const res = yield call(api.getOperators, {});
      console.log(res)
      yield put({type: 'updateState', payload: {operators: res.list}});
    },
    * deleteItem({payload}, {call, put, select}){
      const res = yield call(api.deleteNews, payload);
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
