import React, {PureComponent} from 'react';
import Button from 'antd/es/button';
import Table from 'antd/es/table';
import Menu from 'antd/es/menu';
import Dropdown from 'antd/es/dropdown';
import Icon from 'antd/es/icon';

class ListComponent extends PureComponent {
  render() {
    const {list, columns, openModal, tableLoading, updateItem, deleteItem} = this.props;
    const handleMenuClick = (e, item) => {
      if (e.key === 'update') {
        updateItem(item)
      } else if (e.key === 'delete') {
        deleteItem(item)
      }
    }
    const tableColumns = [
      ...columns,
      {
        title: 'Action',
        key: 'action',
        render: (text, item) => (
          <Dropdown overlay={<Menu onClick={(e) => handleMenuClick(e, item)}>
            <Menu.Item key="update">
              Update
            </Menu.Item>
            <Menu.Item key="delete">
              Delete
            </Menu.Item>
          </Menu>}>
            <Button>
              <Icon type="down"/>
            </Button>
          </Dropdown>
        )
      }
    ]
    return (
      <div>
        <Button type="primary" ghost onClick={openModal}>
          Create
        </Button>
        <Table loading={tableLoading} columns={tableColumns} dataSource={list.map(item => {
          return {key: item.id, ...item}
        })}/>
      </div>
    )
  }
}

export default ListComponent;
