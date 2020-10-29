import React, {PureComponent} from 'react';
import Form from 'antd/es/form';
import Modal from 'antd/es/modal';
import Input from "antd/es/input";

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
        let data = new FormData();
        Object.keys(values).forEach(key => {
          if (key == 'image') {
            if (document.getElementById("image").files.length > 0)
              data.append("image", document.getElementById("image").files[0]);
          }
          else
            data.append(key, values[key])
        })
        modalProps.onOk(data).then(data => {
          form.resetFields();
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
          <Form.Item key={'file'} label="Image">
            {getFieldDecorator("image", {
              rules: [{required: modalProps.title == 'Create'}],
            })(<Input type="file" id="image"/>)}
          </Form.Item>
          {formItems.map((item, index) => (
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
