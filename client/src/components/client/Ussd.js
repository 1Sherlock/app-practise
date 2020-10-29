import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {LANG} from 'constant'

class Ussd extends Component {
  render() {
    return (
      <div className="row py-4">
        {this.props.list.map(i => (<div key={i.id} className="col-md-4 col-sm-12 mb-4">
          <div className="card">
            {this.props.operator ?
              <p className="text-right m-2 font-weight-bold">{this.props.operators.find(o => o.id === i.operator).name}</p> : ''}
            <p className="name text-center">
              {LANG === 'uz' ? i.name : LANG === 'ru' ? i.nameRu : i.nameKr}
            </p>
            <p className="price text-center">
              <a href={`tel:${i.ussdCode}`}>{i.ussdCode}</a>
            </p>
          </div>
        </div>))}
      </div>
    );
  }
}

Ussd.propTypes = {};

export default Ussd;
