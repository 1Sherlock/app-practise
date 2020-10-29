import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Link from 'umi/Link';
import Translations from '../Translations';
import {LANG} from 'constant';

class HeaderClient extends PureComponent {
  render() {
    const {operators, search, updateState, searchOperator} = this.props;

    const updateText = (e) => {
      e.preventDefault();
      updateState({searchText: e.target.value});
    };
    const changeLang = (e, lang) => {
      e.preventDefault();
      localStorage.setItem('lang', lang);
      window.location.reload()
    };
    const updateOperator = (operator) => {
      updateState({searchOperator: operator});
    };

    return (
      <header className="header">
        <div className="container">
          <div className="row">
            <div className="col-md-2 ">
              <Link to="/"><img src="/assets/images/logo.png" className="img-fluid logo"/></Link></div>
            <div className="col-md-9 d-flex justify-content-between offset-xl-1 col-md-10 col-xl-9 pl-lg-5">
              <div className="yarm d-flex">
                <div className="dropdown">
                  <a className="btn btn-muted dropdown-toggle header-all-operator" data-toggle="dropdown">
                    {!searchOperator ? Translations.allOperators : operators.length > 0 ? operators.filter(i => i.id === searchOperator)[0].name : Translations.allOperators}
                  </a>
                  <div className="dropdown-menu">
                    <ul style={{listStyleType: 'none'}}>
                      <li><a onClick={() => updateOperator('')}>{Translations.allOperators}</a></li>
                      {operators.map(o => <li><a onClick={() => updateOperator(o.id)}>{o.name}</a></li>)}
                    </ul>
                  </div>
                </div>
                <form action="#" onSubmit={e => {
                  e.preventDefault();
                  search()
                }}>
                  <div className="input-group align-items-center h-100">
                    <input onChange={(e) => updateText(e)} type="text" className="form-control border-0"
                           placeholder={Translations.inputSearch}/>
                    <div className="input-group-prepend">
                      <b onClick={search} className="icon icon-search ml-4 ml-sm-0"/>
                    </div>

                  </div>
                </form>
              </div>
              {/*<div className="d-flex d-md-none d-block">*/}
              {/*  <form action="#" className="mt-2 w-100" onSubmit={e => {*/}
              {/*    e.preventDefault()*/}
              {/*    search()*/}
              {/*  }}>*/}
              {/*    <div className="input-group align-items-center bg-white w-100">*/}
              {/*      <input onChange={(e) => updateText(e)} type="text" className="form-control border-0 h-100"*/}
              {/*             placeholder={Translations.inputSearch}/>*/}
              {/*      <div className="input-group-append">*/}
              {/*        <span className="input-group-text bg-white border-0"><b onClick={search} className="icon icon-search ml-4"*/}
              {/*                                              style={{marginTop: 8, marginLeft: '-25px!important'}}/></span>*/}
              {/*      </div>*/}

              {/*    </div>*/}
              {/*  </form>*/}
              {/*</div>*/}
              <div className="dropmenu d-flex ml-sm-2">
                <div className="dropdown">
                  <a className="btn btn-muted dropdown-toggle call " data-toggle="dropdown">
                    <img src="/assets/images/phone-call.png" className="img-fluid"/> {Translations.operators}
                  </a>
                  <div className="dropdown-menu">
                    <ul style={{listStyleType: 'none', fontSize: 12}} className="call-center">
                      {operators.map(o => <li><a href={`tel:${o.operatorNumber}`} className="p-0">{o.name}-{o.operatorNumber}</a>
                      </li>)}
                    </ul>
                  </div>
                </div>
                <div className="dropdown">
                  <a className="btn btn-muted dropdown-toggle" data-toggle="dropdown">
                    <img src="/assets/images/user.png" className="img-fluid"/> {Translations.personalCabinet}
                  </a>
                  <div className="dropdown-menu">
                    <ul style={{listStyleType: 'none'}}>
                      {operators.map(o => <li><a target="_blank" href={o.cabinet}>{o.name}</a></li>)}
                    </ul>
                  </div>
                </div>
                <div className="dropdown">
                  <a className="btn btn-muted dropdown-toggle call" data-toggle="dropdown">
                    {LANG === 'uz' ? 'O\'zbek' : LANG === 'ru' ? 'Русский' : 'Кирил'}
                  </a>
                  <div className="dropdown-menu dropmenyu">
                    <ul style={{listStyleType: 'none', paddingLeft: 0, marginBottom: 0}}>
                      <li><a onClick={(e) => changeLang(e, 'uz')}>O'zbek</a></li>
                      <li><a onClick={(e) => changeLang(e, 'kr')}>Кирил</a></li>
                      <li><a onClick={(e) => changeLang(e, 'ru')}>Русский</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>


          </div>
          <form action="#" className="mt-3" onSubmit={e => {
            e.preventDefault();
            search()
          }}>
            <div className="input-group align-items-center bg-white h-100">
              <input onChange={(e) => updateText(e)} type="text" className="form-control border-0"
                     placeholder={Translations.inputSearch}/>
              <div className="input-group-prepend pr-3">
                <b onClick={search} className="icon icon-search ml-4 ml-sm-0"/>
              </div>

            </div>
          </form>
        </div>

      </header>
    );
  }
}

HeaderClient.propTypes = {
  search: PropTypes.func,
  updateState: PropTypes.func
};

export default HeaderClient;
