import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import Network from 'components/client/Network';
import Ussd from 'components/client/Ussd';
import Tarif from 'components/client/Tarif';
import Service from 'components/client/Service';

@connect(({app}) => ({app}))
class Index extends Component {
  componentDidMount() {
    const {dispatch, app} = this.props;
    const {searchText} = app;
    const query = this.props.location.query;
    dispatch({
      type: 'app/getOperators'
    })
    if (!searchText && query.search) {
      dispatch({
        type: 'app/search',
        payload: query
      })
    }
  }

  render() {
    const {dispatch, app} = this.props;
    const {searchList, operators} = app;
    return (
      <section className="beltarif">
        <div className="container">
          <Network networks={!!searchList.networks ? searchList.networks : []} operator={true} operators={operators}/>
          <Ussd list={!!searchList.ussds ? searchList.ussds : []} operator={true} operators={operators}/>
          <Tarif list={!!searchList.tarifs ? searchList.tarifs : []} operator={true} operators={operators}/>
          <Service name={"service"} list={!!searchList.services ? searchList.services : []} operator={true} operators={operators}/>
          <Service name={"daqiqa"} list={!!searchList.daqiqa ? searchList.daqiqa : []} operator={true} operators={operators}/>
          <Service name={"sms"} list={!!searchList.sms ? searchList.sms : []} operator={true} operators={operators}/>
        </div>
      </section>
    );
  }
}

Index.propTypes = {};

export default Index;
