import React, {PureComponent} from 'react';
import {connect} from 'dva';
import CrudTable from 'components/CrudTable';
import Input from 'antd/es/input';

@connect(({menu}) => ({menu}))
class Menu extends PureComponent {
  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'menu/read'
    })
  }

  render() {
    const model = 'menu';
    const {menu, dispatch} = this.props;
    const {visible, title, confirmLoading, currentItem, list, tableLoading} = menu;
    const formItems = [
      {
        label: "Telegram channel",
        name: "botUrl",
        rules: [{required: true, message: "Telegram channel is required"}],
        obj: <Input placeholder='Bot Url'/>
      },
      {
        label: "Facebook",
        name: "facebook",
        rules: [{required: true, message: "Facebook is required"}],
        obj: <Input placeholder='Facebook'/>
      },
      {
        label: "Instagram",
        name: "instagram",
        rules: [{required: true, message: "Instagram is required"}],
        obj: <Input placeholder='Instagram'/>
      },
      {
        label: "Email",
        name: "email",
        rules: [{required: true, message: "Email is required"}],
        obj: <Input placeholder='Email'/>
      },
      {
        label: "Info",
        name: "info",
        rules: [{required: true, message: "Info is required"}],
        obj: <Input.TextArea placeholder='Info'/>
      },
      {
        label: "Info Ru",
        name: "infoRu",
        rules: [{required: true, message: "Info Ru is required"}],
        obj: <Input.TextArea placeholder='Info Ru'/>
      },
      {
        label: "Info Kiril",
        name: "infoKr",
        rules: [{required: true, message: "Info Kiril is required"}],
        obj: <Input.TextArea placeholder='Info Kiril'/>
      }
    ];
    const columns = [
      {
        title: 'Telegram channel',
        dataIndex: 'botUrl',
        key: 'botUrl',
      },
      {
        title: 'Facebook',
        dataIndex: 'facebook',
        key: 'facebook',
      },
      {
        title: 'Instagram',
        dataIndex: 'instagram',
        key: 'instagram',
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: 'Info',
        dataIndex: 'info',
        key: 'info',
      },
      {
        title: 'Info Ru',
        dataIndex: 'infoRu',
        key: 'infoRu',
      },
      {
        title: 'InfoKr',
        dataIndex: 'infoKr',
        key: 'infoKr',
      }
    ]
    const onCancel = () => {
      dispatch({
        type: model + '/updateState',
        payload: {visible: false, currentItem: {}, confirmLoading: false, title: 'Create'}
      })
    }
    const onOk = async (values) => {
      values = currentItem.id ? {...values, path: currentItem.id} : {};
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

export default Menu;
