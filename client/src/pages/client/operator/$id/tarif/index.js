import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import ColoredOperator from 'components/ColoredOperator'
import Tarif from 'components/client/Tarif'
import {LANG} from 'constant';
import Transltaions from 'components/Translations';

@connect(({tarif, operator}) => ({tarif, operator}))
class Index extends Component {
  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'tarif/getTarif',
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
    const {dispatch, operator, tarif} = this.props;
    const {operatorItem, operators} = operator;
    const {list} = tarif;
    return (
      <div>
        <ColoredOperator
          text={Transltaions.tarifText}
          operatorItem={operatorItem}
          operators={operators}/>
        <section className="beltarif">
          <div className="container">
            <Tarif list={list}/>
          </div>
        </section>
      </div>
    );
  }
}

Index.propTypes = {};

export default Index;
