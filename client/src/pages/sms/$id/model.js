import api from 'api';
import notification from 'antd/es/notification';

export default ({
  namespace: 'sms',
  subscriptions: {
    setup({dispatch, history}) {
      history.listen((location) => {
        if (location.pathname.includes('/sms')) {
          const id = location.pathname.split('/')[2];
          dispatch({type: 'app/updateState', payload: {operator: id}})
          dispatch({type: 'updateState', payload: {operator: id, list: [], selectedCategoryId: ''}})
          dispatch({type: 'readCategories', payload: {operator: id}})
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
    visibleCategoryModal: false,
    listCategories: [],
    selectedCategoryId: '',
    currentCategory: {},
    confirmLoadingCategory: false,
    categoryListLoading: false,
    titleCategory: 'Create Category'
  },
  effects: {
    * createOrUpdate({payload}, {call, put, select}){
      const {operator, selectedCategoryId} = yield select(_ => _.sms);
      yield put({type: 'updateState', payload: {confirmLoading: true,}});
      const res = yield call(payload.path ? api.updateSms : api.createSms, {
        category: selectedCategoryId,
        operator, ...payload
      });
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
      const {selectedCategoryId} = yield select(_ => _.sms);
      let path = payload ? payload.selectedCategoryId : selectedCategoryId
      yield put({type: 'updateState', payload: {list: [], tableLoading: false}})
      yield put({
        type: 'updateState',
        payload: {tableLoading: true}
      })
      const res = yield call(api.getSms, path ? {path} : payload);
      yield put({type: 'updateState', payload: {list: res.list, tableLoading: false}})
    },
    * deleteItem({payload}, {call, put, select}){
      const res = yield call(api.deleteSms, payload);
      yield put({type: 'read'});
    },
    * createOrUpdateCategory({payload}, {call, put, select}){
      const {operator} = yield select(_ => _.sms);
      yield put({type: 'updateState', payload: {confirmLoadingCategory: true,}});
      const res = yield call(payload.path ? api.updateSmsCategory : api.createSmsCategory, {operator, ...payload});
      if (res.error) {
        notification.error({message: res.error})
      } else {
        notification.success({message: payload.path ? "O'zgartirildi" : "Qo'shildi"})
        yield put({
          type: 'updateState',
          payload: {
            confirmLoadingCategory: false,
            currentCategory: {},
            visibleCategoryModal: false,
            titleCategory: 'Create'
          }
        })
        yield put({type: 'readCategories'})
      }
      yield put({type: 'updateState', payload: {confirmLoadingCategory: false,}})
      return res;
    },
    * readCategories({payload}, {call, put, select}){
      const {operator} = yield select(_ => _.sms);
      yield put({
        type: 'updateState',
        payload: {categoryListLoading: true}
      })
      const res = yield call(api.getSmsCategory, operator ? {path: operator} : payload);
      yield put({type: 'updateState', payload: {listCategories: res.list, categoryListLoading: false}})
    },
    * deleteCategory({payload}, {call, put, select}){
      const res = yield call(api.deleteSmsCategory, payload);
      yield put({type: 'updateState', payload: {selectedCategoryId: ''}})
      yield put({type: 'readCategories'});
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
