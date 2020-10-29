import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import NewsComponent from 'components/NewsComponent'
import Translations from 'components/Translations'
import ColoredOperator from 'components/ColoredOperator'

@connect(({paynet}) => ({paynet}))
class Index extends Component {
  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'paynet/getNews',
      payload: {}
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
    const {dispatch, paynet} = this.props;
    const updateViewCountPaynet = (id) => {
      dispatch({
        type: 'paynet/updateViewCountPaynet',
        payload: {path: id}
      })
    }
    return (<div><ColoredOperator
      text={`Paynet ${Translations.news.toLowerCase()}`}/>
      <section className="news pb-5">
        <div className="container">
          <NewsComponent news={paynet.news} updateNewsViewCount={updateViewCountPaynet}/>
        </div>
      </section>
    </div>);
  }
}

Index.propTypes = {};

export default Index;
