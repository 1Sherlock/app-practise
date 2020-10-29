import api from 'api';
import notification from 'antd/es/notification';

export default ({
  namespace: 'network',
  subscriptions: {
    setup({dispatch, history}) {
      history.listen((location) => {
        if (location.pathname.includes('/network')) {
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
      const {operator, selectedCategoryId} = yield select(_ => _.network);
      yield put({type: 'updateState', payload: {confirmLoading: true,}});
      const res = yield call(payload.path ? api.updateNetwork : api.createNetwork, {
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
      const {selectedCategoryId} = yield select(_ => _.network);
      let path = payload ? payload.selectedCategoryId : selectedCategoryId
      yield put({type: 'updateState', payload: {list: [], tableLoading: false}})
      yield put({
        type: 'updateState',
        payload: {tableLoading: true}
      })
      const res = yield call(api.getNetwork, path ? {path} : payload);
      yield put({type: 'updateState', payload: {list: res.list, tableLoading: false}})
    },
    * deleteItem({payload}, {call, put, select}){
      const res = yield call(api.deleteNetwork, payload);
      yield put({type: 'read'});
    },
    * createOrUpdateCategory({payload}, {call, put, select}){
      const {operator} = yield select(_ => _.network);
      yield put({type: 'updateState', payload: {confirmLoadingCategory: true,}});
      const res = yield call(payload.path ? api.updateNetworkCategory : api.createNetworkCategory, {operator, ...payload});
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
      const {operator} = yield select(_ => _.network);
      yield put({
        type: 'updateState',
        payload: {categoryListLoading: true}
      })
      const res = yield call(api.getNetworkCategory, operator ? {path: operator} : payload);
      yield put({type: 'updateState', payload: {listCategories: res.list, categoryListLoading: false}})
    },
    * deleteCategory({payload}, {call, put, select}){
      const res = yield call(api.deleteNetworkCategory, payload);
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
