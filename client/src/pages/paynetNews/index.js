import React, {PureComponent} from 'react';
import {connect} from 'dva';
import CrudTable from './components/CrudTable';
import Input from 'antd/es/input';
import Select from 'antd/es/select';
import DatePicker from 'antd/es/date-picker';

@connect(({paynetNews}) => ({paynetNews}))
class PaynetNews extends PureComponent {
  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'paynetNews/read'
    })
  }

  render() {
    const model = 'paynetNews';
    const {paynetNews, dispatch} = this.props;
    const {visible, title, confirmLoading, currentItem, list, tableLoading} = paynetNews;
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
        label: "Date",
        name: "date",
        rules: [{required: true, message: "Trafik qoldiq USSD is required"}],
        obj: <Input type="date"/>
      },
      {
        label: "Url",
        name: "url",
        rules: [{required: true, message: "Url is required"}],
        obj: <Input placeholder='Url'/>
      },
      {
        label: "Url Ru",
        name: "urlRu",
        rules: [{required: true, message: "Url Ru is required"}],
        obj: <Input placeholder='Url Ru'/>
      },
    ];
    const columns = [
      {
        title: 'Image',
        key: 'image',
        render: (text, item) => (<img height="100" src={"/"+item.image}/>)
      },
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
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
      },
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
    };
    const deleteItem = (item) => {
      if (window.confirm("O'chirishga rozimisiz?")) {
        dispatch({
          type: model + '/deleteItem',
          payload: {path: item.id}
        })
      }
    };
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

export default PaynetNews;
