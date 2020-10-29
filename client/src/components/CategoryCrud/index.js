import React, {PureComponent} from 'react';
import Button from 'antd/es/button';
import Spin from 'antd/es/spin';
import ModalComponent from '../ModalComponent'
import style from './index.css'

class CategoryCrud extends React.PureComponent {

  render() {
    const {list, selectedItemId, changeSelectedItemId, updateCategory, deleteCategory, openModal, modalProps, formItems, currentItem, categoryListLoading} = this.props;
    return (<div>
      <Spin spinning={categoryListLoading}>
        {list.map(item => (
          <div className={style.item} key={item.id}>
            <Button type={item.id == selectedItemId ? 'primary' : 'default'} className={style.itemBtn} size="large"
                    onClick={() => changeSelectedItemId(item.id)}>{item.name}</Button>
            <Button.Group className={style.changeBtn} size="small">
              <Button onClick={() => updateCategory(item)} icon="edit"/>
              <Button onClick={() => deleteCategory(item.id)} type="danger" icon="delete"/>
            </Button.Group>
          </div>
        ))}
      </Spin>
      <div className={style.item}>
        <Button onClick={openModal} size="large" icon="plus-circle"/>
      </div>
      <ModalComponent
        modalProps={modalProps}
        formItems={formItems}
        currentItem={currentItem}/>
    </div>)
  }
}

export default CategoryCrud;
