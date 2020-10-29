import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import ColoredOperator from 'components/ColoredOperator'
import Service from 'components/Service'
import Translations from 'components/Translations';

@connect(({daqiqa, operator}) => ({daqiqa, operator}))
class Index extends Component {
  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'daqiqa/getServiceCategory',
      payload: {path: this.props.match.params.id}
    })
  }

  componentWillUnmount() {
    const e = document.getElementsByClassName('modal-backdrop');
    const body = document.getElementsByClassName('modal-open');
    console.log(body);
    if (e.length > 0) {
      e[0].parentNode.removeChild(e[0]);
      body[0].classList.remove("modal-open");
    }
  }

  render() {
    const {dispatch, operator, daqiqa} = this.props;
    const {operatorItem, operators} = operator;
    const {list, categories, activeCategory} = daqiqa;
    const getServiceByCategory = (id) => {
      dispatch({
        type: 'daqiqa/getService',
        payload: {path: id}
      })
    };
    return (
      <div>
        <ColoredOperator
          text={Translations.serviceText}
          operatorItem={operatorItem}
          operators={operators}/>
        <Service
          categories={categories}
          list={list}
          activeCategory={activeCategory}
          getServiceByCategory={getServiceByCategory}
        />
      </div>
    );
  }
}

Index.propTypes = {};

export default Index;
