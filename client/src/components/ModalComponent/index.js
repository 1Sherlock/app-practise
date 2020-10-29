import React, {PureComponent} from 'react';
import Form from 'antd/es/form';
import Modal from 'antd/es/modal';

@Form.create()
class ModalComponent extends PureComponent {
  render() {
    const {form, modalProps, formItems, currentItem} = this.props;
    const {getFieldDecorator} = form;
    const onOk = () => {
      form.validateFields((err, values) => {
        if (err) {
          return;
        }
        modalProps.onOk(values).then(data=>{
          if(data.success) form.resetFields();
        });
      })
    }
    return (
      <Modal
        width={700}
        {...modalProps}
        onOk={onOk}
      >
        <Form layout="vertical">
          {formItems.map((item,index) => (
            <Form.Item key={index} label={item.label}>
              {getFieldDecorator(item.name, {
                initialValue: currentItem[[item.name]],
                rules: item.rules,
              })(item.obj)}
            </Form.Item>
          ))}
        </Form>
      </Modal>
    )
  }
}

export default ModalComponent;
