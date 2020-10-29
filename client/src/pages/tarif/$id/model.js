import api from 'api';
import notification from 'antd/es/notification';

export default ({
  namespace: 'tarif',
  subscriptions: {
    setup({dispatch, history}) {
      history.listen((location) => {
        if (location.pathname.includes('/tarif')) {
          const id = location.pathname.split('/')[2];
          dispatch({type: 'app/updateState', payload: {operator: id}})
          dispatch({type: 'updateState', payload: {operator: id, list: []}})
          dispatch({type: 'read', payload: {path: id}})
          dispatch({type: 'app/getOperators', payload: {}}).then(res => {
            if (res.list.length > 0) {
              dispatch({
                type: 'getByOperator',
                payload: {path: res.list[0].id, state: 'similarTarifUzmobile'}
              });
              dispatch({
                type: 'getByOperator',
                payload: {path: res.list[1].id, state: 'similarTarifUms'}
              });
              dispatch({
                type: 'getByOperator',
                payload: {path: res.list[2].id, state: 'similarTarifUcell'}
              });
              dispatch({
                type: 'getByOperator',
                payload: {path: res.list[3].id, state: 'similarTarifBeeline'}
              });
              dispatch({
                type: 'getByOperator',
                payload: {path: res.list[4].id, state: 'similarTarifPerfectum'}
              })
            }
          });
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
    similarTarifUzmobile: [],
    similarTarifUms: [],
    similarTarifUcell: [],
    similarTarifBeeline: [],
    similarTarifPerfectum: [],
  },
  effects: {
    * createOrUpdate({payload}, {call, put, select}) {
      const {operator} = yield select(_ => _.tarif);
      yield put({type: 'updateState', payload: {confirmLoading: true,}});
      payload.append('operator', operator)
      const res = yield call(!!payload.get('path') ? api.updateTarif : api.createTarif, payload);
      if (res.error) {
        notification.error({message: res.error})
      } else {
        notification.success({message: payload.path ? "O'zgartirildi" : "Qo'shildi"})
        yield put({
          type: 'updateState',
          payload: {confirmLoading: false, currentItem: {}, visible: false, title: 'Create'}
        })
        yield put({type: 'read', payload: {}})
      }
      yield put({type: 'updateState', payload: {confirmLoading: false,}})
      return res;
    },
    * read({payload}, {call, put, select}) {
      const {operator} = yield select(_ => _.tarif);
      if (!payload.path) {
        payload.path = operator;
      }
      console.log(payload)
      yield put({
        type: 'updateState',
        payload: {tableLoading: true}
      })
      const res = yield call(api.getTarif, payload);
      yield put({type: 'updateState', payload: {list: res.list, tableLoading: false}})
    },
    * getByOperator({payload}, {call, put, select}) {
      const res = yield call(api.getTarif, payload);
      yield put({
        type: 'updateState',
        payload: {
          [payload.state]: res.list
        }
      })
    },
    * deleteItem({payload}, {call, put, select}) {
      const res = yield call(api.deleteTarif, payload);
      yield put({type: 'read'});
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
