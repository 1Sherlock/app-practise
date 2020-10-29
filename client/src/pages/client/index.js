import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "dva";
import NewsComponent from 'components/NewsComponent'
import Translations from 'components/Translations';

@connect(({home}) => ({home}))
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
    const {home, dispatch} = this.props;
    const {sliders, news} = home;
    const updateNewsViewCount=(id)=>{
      dispatch({
        type:'app/updateNewsViewCount',
        payload:{
          path:id
        }
      })
    }
    return (
      <div>
        <section className="carousell mt-4 text-center">
          <div id="carousel-example-1z" className="carousel slide carousel-fade mr-0 pr-0" data-ride="carousel">
            <ol className="carousel-indicators">
              {sliders.map((item, index) => (<li key={item.id} data-target="#carousel-example-1z" data-slide-to={index}
                                                 className={index === 0 ? "active" : ""}></li>))}
            </ol>
            <div className="carousel-inner" role="listbox">
              {sliders.map((item, index) => (
                  <div key={item.id} className={index === 0 ? "carousel-item active" : "carousel-item"}>
                    <a href={item.url} target="_blank" className="link-position" />
                    <img src={item.image} className="img-fluid"/>
                  </div>
                ))}
            </div>
          </div>
        </section>
        <section className="news pb-5">
          <div className="container">
            <h4 className="yangiliklar">{Translations.news}</h4>
            <NewsComponent news={news} updateNewsViewCount={updateNewsViewCount}/>
            <div className="row">
              <h4 className="easy">{Translations.home1}</h4>
              <div className="col-md-12">
                <div className="ucell">
                  <img src="/assets/images/ucell2.png" className="img-fluid"/>
                </div>
                <div className="beeline">
                  <img src="/assets/images/beeline2.png" className="img-fluid"/>
                </div>
                <div className="phonee">
                  <div className="phone"></div>
                  <img src="/assets/images/phone.png" className="img-fluid"/>
                </div>
                <div className="perfectum">
                  <img src="/assets/images/perfectum2.png" className="img-fluid"/>
                </div>
                <div className="ums">
                  <img src="/assets/images/ums2.png" className="img-fluid"/>
                </div>
                <div className="uzmobile">
                  <img src="/assets/images/uzmobile2.png" className="img-fluid"/>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

Index.propTypes = {};

export default Index;
