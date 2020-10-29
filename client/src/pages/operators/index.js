import React, {PureComponent} from 'react';
import {connect} from 'dva';
import CrudTable from 'components/CrudTable';
import Input from 'antd/es/input';

@connect(({operators}) => ({operators}))
class Operators extends PureComponent {
  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'operators/read'
    })
  }

  render() {
    const model = 'operators';
    const {operators, dispatch} = this.props;
    const {visible, title, confirmLoading, currentItem, list, tableLoading} = operators;
    const formItems = [
      {
        label: "Cabinet url",
        name: "cabinet",
        rules: [{required: true, message: "Cabinet url"}],
        obj: <Input placeholder='Cabinet url'/>
      },{
        label: "Operator number",
        name: "operatorNumber",
        rules: [{required: true, message: "Operator number"}],
        obj: <Input placeholder='Operator number'/>
      },
      {
        label: "Name",
        name: "name",
        rules: [{required: true, message: "Name is required"}],
        obj: <Input placeholder='Name'/>
      },
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
        label: "Balans USSD",
        name: "balansUssd",
        rules: [{required: true, message: "Balans USSD is required"}],
        obj: <Input placeholder='Balans USSD'/>
      },
      {
        label: "Trafik qoldiq USSD",
        name: "networkUssd",
        rules: [{required: true, message: "Trafik qoldiq USSD is required"}],
        obj: <Input placeholder='Trafik qoldiq USSD'/>
      },
      {
        label: "Daqiqa qoldiq USSD",
        name: "daqiqaUssd",
        rules: [{required: true, message: "Daqiqa qoldiq USSD is required"}],
        obj: <Input placeholder='Daqiqa qoldiq USSD'/>
      },
      {
        label: "Sms qoldiq USSD",
        name: "smsUssd",
        rules: [{required: true, message: "Sms qoldiq USSD is required"}],
        obj: <Input placeholder='Sms qoldiq USSD'/>
      },
    ];
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
      },
      {
        title: 'Balans USSD',
        dataIndex: 'balansUssd',
        key: 'balansUssd',
      },
      {
        title: 'Trafik USSD',
        dataIndex: 'networkUssd',
        key: 'networkUssd',
      },
      {
        title: 'Daqiqa USSD',
        dataIndex: 'daqiqaUssd',
        key: 'daqiqaUssd',
      },
      {
        title: 'Sms USSD',
        dataIndex: 'smsUssd',
        key: 'smsUssd',
      }
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

export default Operators;
