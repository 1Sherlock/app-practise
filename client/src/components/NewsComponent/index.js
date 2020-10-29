import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {LANG} from 'constant';
import Translations from 'components/Translations';

class Index extends Component {
  render() {
    const {news} = this.props;
    const openModal = (id) => {
      this.props.updateNewsViewCount(id);
    };
    return (
      <div className="row pb-2">
        {news.map((i, index) => (
          <div className="col-md-4" key={i.id}>
            <div className="card h-100" onClick={() => openModal(i.id)} data-toggle="modal"
                 data-target={`#exampleModal${index}`}>
              <img src={`\\${i.image}`} className="card-img" style={{height: 200, objectFit: 'contain'}}/>
              <p className="card__text">{LANG === 'uz' ? i.name : LANG === 'ru' ? i.nameRu : i.nameKr}</p>
              <div className="card-footer bg-white">
                <div className="d-flex justify-content-between">
                  <p className="data mt-3">{i.date}</p>
                  <p className="data mt-3" style={{display: 'flex', alignItems: 'center'}}><i className="icon eye mr-3"/>
                    <span>{i.viewsCount}</span></p>
                </div>
              </div>
            </div>
            <div className="modal fade" id={`exampleModal${index}`} tabIndex="-1" role="dialog"
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
          </div>
        ))}
      </div>
    );
  }
}

Index.propTypes = {
  updateNewsViewCount: PropTypes.func
};

export default Index;
