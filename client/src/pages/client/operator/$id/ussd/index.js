import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ColoredOperator from 'components/ColoredOperator'
import {connect} from "react-redux";
import {LANG} from 'constant';
import Ussd from 'components/client/Ussd'
import Translations from 'components/Translations'

@connect(({ussds, operator}) => ({ussds, operator}))
class Index extends Component {
  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'ussds/getUssd',
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
    const {dispatch, operator, ussds} = this.props;
    const {operatorItem, operators} = operator;
    const {list} = ussds;
    return (
      <div>
        <ColoredOperator
          text={Translations.ussdText}
          operatorItem={operatorItem}
          operators={operators}/>
        <section className="beltarif">
          <div className="container">
            <Ussd list={list}/>
          </div>
        </section>
      </div>
    );
  }
}

Index.propTypes = {};

export default Index;
