import React, {PureComponent} from 'react';
import CrudTable from 'components/CrudTable';
import CategoryCrud from 'components/CategoryCrud';
import {connect} from 'dva';
import Input from 'antd/es/input'
import InputNumber from 'antd/es/input-number'
@connect(({network}) => ({network}))
class Network extends PureComponent {
  render() {
    const model = 'network';
    const {network, dispatch} = this.props;
    const {
      visible, title, confirmLoading, currentItem, list, tableLoading,
      visibleCategoryModal, listCategories, selectedCategoryId, currentCategory, confirmLoadingCategory,
      categoryListLoading, titleCategory
    } = network;
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
        label: "Narxi",
        name: "price",
        rules: [{required: true, message: "Narxi is required"}],
        obj: <Input placeholder='Narxi'/>
      },
      {
        label: "Narxi Ru",
        name: "priceRu",
        rules: [{required: true, message: "Narxi Ru is required"}],
        obj: <Input placeholder='Narxi Ru'/>
      },
      {
        label: "Narxi Kiril",
        name: "priceKr",
        rules: [{required: true, message: "Narxi Kiril is required"}],
        obj: <Input placeholder='Narxi Kiril'/>
      },
      {
        label: "Hajmi",
        name: "hajmi",
        rules: [{required: true, message: "Hajmi is required"}],
        obj: <Input placeholder='Hajmi'/>
      },
      {
        label: "Hajmi Ru",
        name: "hajmiRu",
        rules: [{required: true, message: "Hajmi Ru is required"}],
        obj: <Input placeholder='Hajmi Ru'/>
      },
      {
        label: "Hajmi Kiril",
        name: "hajmiKr",
        rules: [{required: true, message: "Hajmi Kiril is required"}],
        obj: <Input placeholder='Hajmi Kiril'/>
      },
      {
        label: "Muddat",
        name: "muddat",
        rules: [{required: true, message: "Muddat is required"}],
        obj: <Input placeholder='Muddat'/>
      },
      {
        label: "Muddat Ru",
        name: "muddatRu",
        rules: [{required: true, message: "Muddat Ru is required"}],
        obj: <Input placeholder='Muddat Ru'/>
      },
      {
        label: "Muddat Kiril",
        name: "muddatKr",
        rules: [{required: true, message: "Muddat Kiril is required"}],
        obj: <Input placeholder='Muddat Kiril'/>
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
    ];
    const onCancel = () => {
      dispatch({
        type: model + '/updateState',
        payload: {visible: false, currentItem: {}, confirmLoading: false, title: 'Create'}
      })
    };
    const onOk = async (values) => {
      if (currentItem.id) {
        values = {path: currentItem.id, ...values}
      }
      // values = currentItem.id ? {...values, path: currentItem.id} : values;
      const res = await dispatch({
        type: model + '/createOrUpdate',
        payload: values
      })
      return res;
    };
    const openModal = () => {
      dispatch({
        type: model + '/updateState',
        payload: {visible: true}
      })
    };
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

    const changeSelectedItemId = (id) => {
      dispatch({
        type: model + '/updateState',
        payload: {
          selectedCategoryId: id
        }
      })
      dispatch({
        type: model + '/read',
        payload: {
          selectedCategoryId: id
        }
      })
    };
    const updateCategory = (item) => {
      dispatch({
        type: model + '/updateState',
        payload: {
          currentCategory: item,
          visibleCategoryModal: true
        }
      })
    };
    const deleteCategory = (id) => {
      if (window.confirm("O'chirasizmi")) {
        dispatch({type: model + '/deleteCategory', payload: {path:id}})
      }
    };
    const openModalCategory = () => {
      dispatch({type: model + '/updateState', payload: {currentCategory: {}, visibleCategoryModal: true}})
    };
    const modalPropsCategory = {
      visible: visibleCategoryModal,
      title: titleCategory,
      confirmLoading: confirmLoadingCategory,
      onCancel: () => {
        onCancelCategory()
      },
      onOk: async v => {
        return onOkCategory(v)
      }
    };
    const formItemsCategory = [
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
      },
      {
        label: "Order",
        name: "order",
        rules: [{required: true, message: "Order is required"}],
        obj: <InputNumber min={1} placeholder='Order'/>
      }
    ];
    const onOkCategory = async (values) => {
      if (currentCategory.id) {
        values = {path: currentCategory.id, ...values}
      }
      const res = await dispatch({
        type: model + '/createOrUpdateCategory',
        payload: values
      })
      return res;
    };
    const onCancelCategory = () => {
      dispatch({
        type: model + '/updateState',
        payload: {
          visibleCategoryModal: false,
          currentCategory: {},
          confirmLoadingCategory: false,
          titleCategory: 'Create'
        }
      })
    };
    return (
      <div>
        <CategoryCrud
          list={listCategories}
          selectedItemId={selectedCategoryId}
          changeSelectedItemId={changeSelectedItemId}
          updateCategory={updateCategory}
          deleteCategory={deleteCategory}
          openModal={openModalCategory}
          modalProps={modalPropsCategory}
          formItems={formItemsCategory}
          currentItem={currentCategory}
          categoryListLoading={categoryListLoading}
        />
        {selectedCategoryId ?
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
          /> : ''}
      </div>
    )
  }
}

export default Network;
