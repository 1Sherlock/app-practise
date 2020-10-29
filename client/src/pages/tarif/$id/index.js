import React, {PureComponent} from 'react';
import {connect} from 'dva';
import CrudTable from './components/CrudTable';
import Input from 'antd/es/input';
import InputNumber from 'antd/es/input-number';
import Select from 'antd/es/select';

@connect(({tarif}) => ({tarif}))
class Tarif extends PureComponent {

  render() {
    const model = 'tarif';
    const {tarif, dispatch} = this.props;
    const {
      visible, title, confirmLoading, currentItem, list, tableLoading,
      similarTarifUzmobile, similarTarifUms, similarTarifUcell, similarTarifBeeline, similarTarifPerfectum
    } = tarif;
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
        label: "Batafsil",
        name: "batafsil",
        rules: [{required: true, message: "Batafsil is required"}],
        obj: <Input.TextArea placeholder='Batafsil'/>
      },
      {
        label: "Batafsil Ru",
        name: "batafsilRu",
        rules: [{required: true, message: "Batafsil Ru is required"}],
        obj: <Input.TextArea placeholder='Batafsil Ru'/>
      },
      {
        label: "Batafsil Kiril",
        name: "batafsilKr",
        rules: [{required: true, message: "Batafsil Kiril is required"}],
        obj: <Input.TextArea placeholder='Batafsil Kiril'/>
      },
      {
        label: "Ussd code",
        name: "ussdCode",
        rules: [{required: true, message: "USSD code is required"}],
        obj: <Input placeholder='USSD code'/>
      }, {
        label: "Uzmobile o'xshash tarif",
        name: "similarTarifUzmobile",
        obj: <Select>
          {similarTarifUzmobile.map(item => <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>)}
        </Select>
      },
      {
        label: "Ums o'xshash tarif",
        name: "similarTarifUms",
        obj: <Select>
          {similarTarifUms.map(item => <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>)}
        </Select>
      },
      {
        label: "Ucell o'xshash tarif",
        name: "similarTarifUcell",
        obj: <Select>
          {similarTarifUcell.map(item => <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>)}
        </Select>
      },
      {
        label: "Beeline o'xshash tarif",
        name: "similarTarifBeeline",
        obj: <Select>
          {similarTarifBeeline.map(item => <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>)}
        </Select>
      },
      {
        label: "Perfectum o'xshash tarif",
        name: "similarTarifPerfectum",
        obj: <Select>
          {similarTarifPerfectum.map(item => <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>)}
        </Select>
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
        title: 'Image',
        key: 'image',
        render: (text, item) => (<img height="100" src={"/" + item.image}/>)
      },
      {
        title: 'Order',
        dataIndex: 'order',
        key: 'order',
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Name Ru',
        dataIndex: 'nameRu',
        key: 'nameRu',
      },
      {
        title: 'Name Kiril',
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
      if (currentItem.id) {
        values.append('path', currentItem.id)
      }
      // values = currentItem.id ? {...values, path: currentItem.id} : values;
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

    return (<div>
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
      </div>
    )
  }
}

export default Tarif;
