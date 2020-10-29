import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import Link from 'umi/Link';
import ColoredOperator from 'components/ColoredOperator'
import NewsComponent from 'components/NewsComponent'
import Translations from 'components/Translations'

@connect(({operator}) => ({operator}))
class Index extends Component {
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
    const {dispatch, operator} = this.props;
    const {operatorItem, operators, news} = operator;
    const updateNewsViewCount = (id) => {
      dispatch({
        type: 'app/updateNewsViewCount',
        payload: {
          path: id
        }
      })
    }
    return (
      <div>
        <ColoredOperator
          operatorItem={operatorItem}
          operators={operators}/>
        <section className="uslugi">
          <div className="container">
            <h4 className="aloqa">{Translations.operatorText}</h4>
            <div className="row mt-4">
              <div className="col-md-2 col-sm-4 col-4 ">
                <Link to={`/client/operator/${operatorItem.id}/network`} className="text-decoration-none">
                  <div className="card border-0">
                    <img src="/assets/images/beeline/u1.png" className="img-fluid"/>
                    <h6>{Translations.network}</h6>
                  </div>
                </Link>
              </div>
              <div className="col-md-2 col-sm-4 col-4 ">
                <Link to={`/client/operator/${operatorItem.id}/ussd`} className="text-decoration-none">
                  <div className="card border-0">
                    <img src="/assets/images/beeline/u2.png" className="img-fluid"/>
                    <h6>{Translations.ussd}</h6>
                  </div>
                </Link>
              </div>
              <div className="col-md-2 col-sm-4 col-4 ">
                <Link to={`/client/operator/${operatorItem.id}/tarif`} className="text-decoration-none">
                  <div className="card border-0">
                    <img src="/assets/images/beeline/u3.png" className="img-fluid"/>
                    <h6>{Translations.tarif}</h6>
                  </div>
                </Link>
              </div>
              <div className="col-md-2 col-sm-4 col-4 mt-lg-0 mt-md-0 mt-sm-2 mt-2  ">
                <Link to={`/client/operator/${operatorItem.id}/service`} className="text-decoration-none">
                  <div className="card border-0">
                    <img src="/assets/images/beeline/u4.png" className="img-fluid"/>
                    <h6>{Translations.service}</h6>
                  </div>
                </Link>
              </div>
              <div className="col-md-2 col-sm-4 col-4 mt-lg-0 mt-md-0 mt-sm-2 mt-2  ">
                <Link to={`/client/operator/${operatorItem.id}/daqiqa`} className="text-decoration-none">
                  <div className="card border-0">
                    <img src="/assets/images/beeline/u5.png" className="img-fluid"/>
                    <h6>{Translations.daqiqa}</h6>
                  </div>
                </Link>
              </div>
              <div className="col-md-2 col-sm-4 col-4 mt-lg-0 mt-md-0 mt-sm-2 mt-2  ">
                <Link to={`/client/operator/${operatorItem.id}/sms`} className="text-decoration-none">
                  <div className="card border-0">
                    <img src="/assets/images/beeline/u6.png" className="img-fluid"/>
                    <h6>{Translations.sms}</h6>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="news pb-5">
          <div className="container">
            <h4 className="yangiliklar mb-4">{operatorItem.name} {Translations.news.toLowerCase()}</h4>
            <NewsComponent news={news} updateNewsViewCount={updateNewsViewCount}/>
          </div>
        </section>
      </div>
    );
  }
}

Index.propTypes = {};

export default Index;
