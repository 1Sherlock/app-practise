import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import Button from 'antd/es/button';
import Row from 'antd/es/row';
import Form from 'antd/es/form';
import Input from 'antd/es/input';
import styles from './index.less'

const FormItem = Form.Item

@connect(({ login }) => ({ login }))
@Form.create()
class Login extends PureComponent {
  handleOk = () => {
    const { dispatch, form } = this.props
    const { validateFieldsAndScroll } = form
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }
      dispatch({ type: 'login/signIn', payload: values })
    })
  }

  render() {
    const { form,login } = this.props
    const { getFieldDecorator } = form
    const {loading} = login
    return (
      <Fragment>
        <div className={styles.form}>
          <div className={styles.logo}>
            <span>USSD admin</span>
          </div>
          <form>
            <FormItem hasFeedback>
              {getFieldDecorator('login', {
                rules: [
                  {
                    required: true,
                  },
                ],
              })(
                <Input
                  onPressEnter={this.handleOk}
                  placeholder={`Username`}
                />
              )}
            </FormItem>
            <FormItem hasFeedback>
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                  },
                ],
              })(
                <Input
                  type="password"
                  onPressEnter={this.handleOk}
                  placeholder={`Password`}
                />
              )}
            </FormItem>
            <Row>
              <Button
                type="primary"
                onClick={this.handleOk}
                loading={loading}>
                Sign in
              </Button>

            </Row>
          </form>
        </div>
        <div className={styles.footer}>
        </div>
      </Fragment>
    )
  }
}

Login.propTypes = {
  form: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default Login
