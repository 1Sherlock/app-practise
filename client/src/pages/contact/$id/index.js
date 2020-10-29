import React, {PureComponent} from 'react';
import {connect} from 'dva';
import CrudTable from 'components/CrudTable';
import Input from 'antd/es/input';
import InputNumber from 'antd/es/input-number';

@connect(({contact}) => ({contact}))
class Contact extends PureComponent {

  render() {
    const model = 'contact';
    const {contact, dispatch} = this.props;
    const {visible, title, confirmLoading, currentItem, list, tableLoading} = contact;
    const formItems = [
      {
        label: "Description",
        name: "description",
        rules: [{required: true, message: "Description is required"}],
        obj: <Input.TextArea placeholder='Description'/>
      },
      {
        label: "Description Ru",
        name: "descriptionRu",
        rules: [{required: true, message: "Description Ru is required"}],
        obj: <Input.TextArea placeholder='Description Ru'/>
      },
      {
        label: "Description Kiril",
        name: "descriptionKr",
        rules: [{required: true, message: "Description Kiril is required"}],
        obj: <Input.TextArea placeholder='Description Kiril'/>
      },
      {
        label: "Ussd or Phone",
        name: "ussdOrPhone",
        rules: [{required: true, message: "Ussd or Phone is required"}],
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
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
      },
      {
        title: 'Description Ru',
        dataIndex: 'descriptionRu',
        key: 'descriptionRu',
      },
      {
        title: 'Description Kiril',
        dataIndex: 'descriptionKr',
        key: 'descriptionKr',
      },
      {
        title: 'Ussd or Phone',
        dataIndex: 'ussdOrPhone',
        key: 'ussdOrPhone',
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

export default Contact;
