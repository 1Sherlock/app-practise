import React from 'react';
import Layout from 'antd/es/layout';
import Menu from 'antd/es/menu';
import Icon from 'antd/es/icon';
import Button from 'antd/es/button';
import {openPages} from 'utils/config'
import router from 'umi/router';
import Link from 'umi/Link';
import {connect} from 'dva';
import HeaderClient from 'components/client/Header';
import FooterClient from 'components/client/Footer';
import Companies from 'components/client/Companies';
import 'bootstrap/dist/css/bootstrap.css';

const {Header, Content, Footer, Sider} = Layout;
const {SubMenu} = Menu;

@connect(({app}) => ({app}))
class BasicLayout extends React.PureComponent {
  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'app/getOperators'
    });
    dispatch({
      type: 'app/getMenu'
    })
  }

  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    this.setState({collapsed});
  };

  logout = () => {
    localStorage.removeItem('ussd-token');
    router.push('/login');
  };

  search = () => {
    const {dispatch, app} = this.props;
    const {searchText, searchOperator} = app;
    dispatch({
      type: 'app/search'
    })
    let query = {}
    if (searchText) {
      query.search = searchText;
    }
    if (searchOperator) {
      query.operator = searchOperator;
    }
    router.push({
      pathname: '/search',
      query,
    })
  };

  updateState = (payload = {}) => {
    const {dispatch} = this.props;
    dispatch({
      type: 'app/updateState',
      payload
    })
  }

  render() {
    const {app} = this.props;
    const {operators, operator, menus, searchOperator} = app;
    return (
      (!openPages.includes(this.props.location.pathname) && !this.props.location.pathname.startsWith("/client")) ?
        <Layout style={{minHeight: '100vh'}}>
          <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
            <div className="logo"
                 style={{width: "85%", height: 50, margin: 10, backgroundColor: 'rgba(200, 200, 200, 0.3)'}}/>
            <Menu theme="dark" mode="inline">
              <Menu.Item key="dashboard">
                <Icon type="pie-chart"/>
                <span>Dashboard</span>
                <Link to="/dashboard"/>
              </Menu.Item>
              {operators ?
                operators.map(item => (
                  <SubMenu
                    key={item.name + item.id}
                    title={<span>{item.name}</span>}>
                    <Menu.Item key={item.name + item.id + "ussd"}>
                      Ussd kodlar
                      <Link to={"/ussd/" + item.id}/>
                    </Menu.Item>
                    <Menu.Item key={item.name + item.id + "tarif"}>
                      Tariflar
                      <Link to={"/tarif/" + item.id}/>
                    </Menu.Item>
                    <Menu.Item key={item.name + item.id + "network"}>
                      Internet to'plamlar
                      <Link to={"/network/" + item.id}/>
                    </Menu.Item>
                    <Menu.Item key={item.name + item.id + "service"}>
                      Xizmatlar
                      <Link to={"/service/" + item.id}/>
                    </Menu.Item>
                    <Menu.Item key={item.name + item.id + "contact"}>
                      Contacts
                      <Link to={"/contact/" + item.id}/>
                    </Menu.Item>
                    <Menu.Item key={item.name + item.id + "daqiqa"}>
                      Daqiqa to'plamlar
                      <Link to={"/daqiqa/" + item.id}/>
                    </Menu.Item>
                    <Menu.Item key={item.name + item.id + "sms"}>
                      Sms to'plamlar
                      <Link to={"/sms/" + item.id}/>
                    </Menu.Item>
                  </SubMenu>
                )) : ''}
              <Menu.Item key="operators">
                <Icon type="pie-chart"/>
                <span>Operators</span>
                <Link to="/operators"/>
              </Menu.Item>
              <Menu.Item key="news">
                <Icon type="pie-chart"/>
                <span>News</span>
                <Link to="/news"/>
              </Menu.Item>
              <Menu.Item key="menu">
                <Icon type="pie-chart"/>
                <span>Menu</span>
                <Link to="/menu"/>
              </Menu.Item>
              <Menu.Item key="slider">
                <Icon type="pie-chart"/>
                <span>Slider</span>
                <Link to="/slider"/>
              </Menu.Item>
              <Menu.Item key="paynetNews">
                <Icon type="pie-chart"/>
                <span>Paynet News</span>
                <Link to="/paynetNews"/>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Header style={{background: '#fff', padding: 0}}>
              <Button type="primary" icon="logout" ghost onClick={this.logout}
                      style={{right: 0, top: 0, position: 'absolute'}}>
                Logout
              </Button>
            </Header>
            <Content style={{margin: '0 16px'}}>
              <div style={{padding: 24, background: '#fff', minHeight: 360, marginTop: 30}}>
                <h3>{operators ? (operators.filter(i => i.id == operator).length > 0 ? operators.filter(i => i.id == operator)[0].name : '') : ''}</h3>
                {this.props.children}
              </div>
            </Content>
            <Footer style={{textAlign: 'center'}}>Ant Design ©2018 Created by Ant UED</Footer>
          </Layout>
        </Layout> : (this.props.location.pathname.includes('/client') || this.props.location.pathname.includes('/search')) ?
        <div>
          <HeaderClient searchOperator={searchOperator} updateState={this.updateState} operators={operators}
                        search={this.search}/>
          <Companies operators={operators}/>
          {this.props.children}
          <FooterClient menus={menus}/>
        </div> : this.props.children);
  }
}

export default BasicLayout;
