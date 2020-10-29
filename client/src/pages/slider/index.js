import React, {PureComponent} from 'react';
import {connect} from 'dva';
import CrudTable from './components/CrudTable';
import Input from 'antd/es/input';
import Select from 'antd/es/select';
import DatePicker from 'antd/es/date-picker';
import InputNumber from "antd/es/input-number";

@connect(({slider}) => ({slider}))
class Slider extends PureComponent {
  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'slider/read'
    })
  }

  render() {
    const model = 'slider';
    const {slider, dispatch} = this.props;
    const {visible, title, confirmLoading, currentItem, list, tableLoading} = slider;
    const formItems = [
      {
        label: "Url",
        name: "url",
        rules: [{required: true, message: "Url is required"}],
        obj: <Input placeholder='Url'/>
      }, {
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
        title: 'Url',
        dataIndex: 'url',
        key: 'url',
      },
      {
        title: 'Image',
        key: 'image',
        render: (text, item) => (<img height="100" src={"/" + item.image}/>)
      }
    ]
    const onCancel = () => {
      dispatch({
        type: model + '/updateState',
        payload: {visible: false, currentItem: {}, confirmLoading: false, title: 'Create'}
      })
    }
    const onOk = async (values) => {
      if (currentItem.id) {
        values.append('path', currentItem.id)
      }
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

export default Slider;
