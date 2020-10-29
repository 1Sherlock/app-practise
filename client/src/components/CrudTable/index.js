import React, {PureComponent} from 'react';
import ModalComponent from '../ModalComponent'
import ListComponent from './List'

export default class CrudTable extends PureComponent {
  render() {
    const {modalProps, currentItem, formItems, list, columns, openModal, tableLoading, updateItem, deleteItem} = this.props
    return (
      <div>
        <ListComponent
          deleteItem={deleteItem}
          updateItem={updateItem}
          openModal={openModal}
          tableLoading={tableLoading}
          list={list}
          columns={columns}
        />
        <ModalComponent
          modalProps={modalProps}
          formItems={formItems}
          currentItem={currentItem}
        />
      </div>
    )
  }
}
