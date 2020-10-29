import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {LANG} from 'constant';
import Translations from 'components/Translations';

class Index extends Component {
  render() {
    const {categories, list, activeCategory, getServiceByCategory} = this.props;
    return (
      <section className="beltarif">
        <div className="container">
          <div className="row py-4">
            {categories.map((i) => (
              <button onClick={() => getServiceByCategory(i.id)} key={i.id}
                      className={`btn btn-outline-primary mr-2 ${i.id === activeCategory ? 'active' : ''}`}>
                {LANG === 'uz' ? i.name : LANG === 'ru' ? i.nameRu : i.nameKr}</button>
            ))}
          </div>
          {/*<h4 className="aloqa">{Translations.serviceText}</h4>*/}
          <div className="row py-4">
            {list.map((i, index) => (<div key={i.id} className="col-md-4 col-sm-12 mb-4">
              <div className="card">
                <p className="name text-center" style={{fontSize: 25}}>
                  {LANG === 'uz' ? i.name : LANG === 'ru' ? i.nameRu : i.nameKr}
                </p>
                <div className="d-flex pl-4 mb-4">
                  <h6 style={{
                    height: 90,
                    overflow: 'hidden',
                    whiteSpace: 'pre-line'
                  }}>{LANG === 'uz' ? i.description : LANG === 'ru' ? i.descriptionRu : i.descriptionKr}</h6>
                </div>
                <p className="price text-center">
                  <a href={`tel:${i.ussdCode}`}>{i.ussdCode}</a>
                </p>
                <button type="button" className="btn btn-primary m-4" data-toggle="modal"
                        data-target={`#exampleModal${index}tarif`}>
                  {Translations.moreText}
                </button>
              </div>
              <div className="modal fade" id={`exampleModal${index}tarif`} tabIndex="-1" role="dialog"
                   aria-labelledby="exampleModalLabel"
                   aria-hidden="true">
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h4>{LANG === 'uz' ? i.name : LANG === 'ru' ? i.nameRu : i.nameKr}</h4>
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <pre
                        className='pre-wrap'>{LANG === 'uz' ? i.description : LANG === 'ru' ? i.descriptionRu : i.descriptionKr}</pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>))}
          </div>
        </div>
      </section>
    );
  }
}

Index.propTypes = {
  getServiceByCategory: PropTypes.func
};

export default Index;
