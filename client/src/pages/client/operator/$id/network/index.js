import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import ColoredOperator from 'components/ColoredOperator'
import Network from 'components/client/Network'
import {LANG} from 'constant';
import Translations from 'components/Translations';

@connect(({network, operator}) => ({network, operator}))
class Index extends Component {
  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'network/getNetworkCategory',
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
    const {dispatch, operator, network} = this.props;
    const {operatorItem, operators} = operator;
    const {networks, categories, activeCategory} = network;
    const getNetworksByCategory = (id) => {
      dispatch({
        type: 'network/getNetwork',
        payload: {path: id}
      })
    };
    return (
      <div>
        <ColoredOperator
          text={Translations.networkText}
          operatorItem={operatorItem}
          operators={operators}/>
        <section className="beltarif">
          <div className="container">
            <div className="row py-4">
              {categories.map(i => (
                <button onClick={() => getNetworksByCategory(i.id)} key={i.id}
                        className={`btn btn-outline-primary mr-2 ${i.id === activeCategory ? 'active' : ''}`}>{LANG === 'uz' ? i.name : LANG === 'ru' ? i.nameRu : i.nameKr}</button>
              ))}
            </div>
            <Network networks={networks}/>
          </div>
        </section>
      </div>
    );
  }
}

Index.propTypes = {};

export default Index;
