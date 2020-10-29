import React, {PureComponent} from 'react';
import {connect} from 'dva';
import CrudTable from './components/CrudTable';
import Input from 'antd/es/input';
import Select from 'antd/es/select';
import DatePicker from 'antd/es/date-picker';

@connect(({news}) => ({news}))
class News extends PureComponent {
  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'news/read'
    })
    dispatch({
      type: 'news/readOperators'
    })
  }

  render() {
    const model = 'news';
    const {news, dispatch} = this.props;
    const {visible, title, confirmLoading, currentItem, list, tableLoading, operators} = news;
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
        label: "Company",
        name: "company",
        rules: [{required: true, message: "Company is required"}],
        obj: <Select placeholder="Company">
          {/*<Select.Option value="mobiuz">mobiUz</Select.Option>*/}
          {operators.map(operator => (<Select.Option value={operator.name}>{operator.name}</Select.Option>))}
          {/*<Select.Option value="UCELL">UCELL</Select.Option>*/}
          {/*<Select.Option value="UZMOBILE">UZMOBILE</Select.Option>*/}
          {/*<Select.Option value="BEELINE">BEELINE</Select.Option>*/}
          {/*<Select.Option value="PERFECTUM">PERFECTUM</Select.Option>*/}
        </Select>
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
        title: 'Company',
        dataIndex: 'company',
        key: 'company',
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

export default News;
