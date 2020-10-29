import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {LANG} from 'constant';
import Translations from 'components/Translations';

class Tarif extends Component {
  render() {
    return (
      <div className="row py-4">
        {this.props.list.map((i, index) => (<div key={i.id} className="col-md-4 col-sm-12 mb-4">
          <div className="card mb-3">
            {this.props.operator ?
              <p className="text-right m-2 font-weight-bold">{this.props.operators.find(o => o.id === i.operator).name}</p> : ''}
            <img src={`\\${i.image}`} className="card-img" style={{height: 200, objectFit: 'contain'}}/>
            <p className="name text-center" style={{fontSize:25}}>
              {LANG === 'uz' ? i.name : LANG === 'ru' ? i.nameRu : i.nameKr}
            </p>
            <p className="name text-center">
              <a href={`tel:${i.ussdCode}`}>{i.ussdCode}</a>
            </p>
            {/*<div className="d-flex pl-4 mb-4">*/}
            {/*  <h6 style={{*/}
            {/*    whiteSpace: 'nowrap',*/}
            {/*    overflow: 'hidden',*/}
            {/*    marginRight: 10*/}
            {/*  }}>{LANG === 'uz' ? i.description : LANG === 'ru' ? i.descriptionRu : i.descriptionKr}</h6>*/}
            {/*</div>*/}
            {/*<div className="d-flex pl-4 mb-4">*/}
            {/*  <h6 style={{*/}
            {/*    whiteSpace: 'nowrap',*/}
            {/*    overflow: 'hidden',*/}
            {/*    marginRight: 10*/}
            {/*  }}>{LANG === 'uz' ? i.batafsil : LANG === 'ru' ? i.batafsilRu : i.batafsilKr}</h6>*/}
            {/*</div>*/}
            <button type="button" className="btn btn-primary m-4" data-toggle="modal" data-target={`#exampleModal${index}tarif`}>
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
                  <pre
                    className='pre-wrap'>{LANG === 'uz' ? i.batafsil : LANG === 'ru' ? i.batafsilRu : i.batafsilKr}</pre>
                </div>
              </div>
            </div>
          </div>
        </div>))}
      </div>
    );
  }
}

Tarif.propTypes = {};

export default Tarif;
