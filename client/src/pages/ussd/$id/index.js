import React, {PureComponent} from 'react';
import {connect} from 'dva';
import CrudTable from 'components/CrudTable';
import Input from 'antd/es/input';
import InputNumber from 'antd/es/input-number';

@connect(({ussd}) => ({ussd}))
class Ussd extends PureComponent {

  render() {
    const model = 'ussd';
    const {ussd, dispatch} = this.props;
    const {visible, title, confirmLoading, currentItem, list, tableLoading} = ussd;
    const formItems = [
      {
        label: "Name",
        name: "name",
        rules: [{required: true, message: "Name is required"}],
        obj: <Input placeholder='Name'/>
      },
      {
        label: "Name Ru",
        name: "nameRu",
        rules: [{required: true, message: "Name Ru is required"}],
        obj: <Input placeholder='Name Ru'/>
      },
      {
        label: "Name Kiril",
        name: "nameKr",
        rules: [{required: true, message: "Name Kiril is required"}],
        obj: <Input placeholder='Name Kiril'/>
      },
      {
        label: "Ussd code",
        name: "ussdCode",
        rules: [{required: true, message: "USSD code is required"}],
        obj: <Input placeholder='USSD code'/>
      },
      {
        label: "Order",
        name: "order",
        rules: [{required: true, message: "Order is required"}],
        obj: <InputNumber min={1} placeholder='Order'/>
      }
    ];
    const columns = [
      {
        title: 'Order',
        dataIndex: 'order',
        key: 'order',
      },
      {
        title: 'Ussd kod nomi',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Ussd kod nomi Ru',
        dataIndex: 'nameRu',
        key: 'nameRu',
      },
      {
        title: 'Ussd kod nomi Kiril',
        dataIndex: 'nameKr',
        key: 'nameKr',
      },
      {
        title: 'Ussd code',
        dataIndex: 'ussdCode',
        key: 'ussdCode',
      },
    ]
    const onCancel = () => {
      dispatch({
        type: model + '/updateState',
        payload: {visible: false, currentItem: {}, confirmLoading: false, title: 'Create'}
      })
    }
    const onOk = async (values) => {
      values = currentItem.id ? {...values, path: currentItem.id} : values;
      const res = await dispatch({
        type: model + '/createOrUpdate',
        payload: values
      })
      return res;
    }
    const openModal = () => {
      dispatch({
        type: model + '/updateState',
        payload: {visible: true}
      })
    }
    const modalProps = {
      visible,
      title,
      confirmLoading,
      onCancel,
      onOk
    };
    const updateItem = (item) => {
      dispatch({
        type: model + '/updateState',
        payload: {currentItem: item, title: "Update", visible: true}
      })
    }
    const deleteItem = (item) => {
      if (window.confirm("O'chirishga rozimisiz?")) {
        dispatch({
          type: model + '/deleteItem',
          payload: {path: item.id}
        })
      }
    }
    return (
      <CrudTable
        deleteItem={deleteItem}
        updateItem={updateItem}
        openModal={openModal}
        list={list}
        tableLoading={tableLoading}
        columns={columns}
        modalProps={modalProps}
        currentItem={currentItem}
        formItems={formItems}
      />
    )
  }
}

export default Ussd;
