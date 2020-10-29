import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {LANG} from 'constant';
import Translations from '../Translations';

class FooterClient extends PureComponent {
  render() {
    const {menus} = this.props;
    const changeLang = (e, lang) => {
      e.preventDefault();
      localStorage.setItem('lang', lang);
      window.location.reload()
    };
    return (
      <div className="footer">
        <div className="container">
          {/*<div className="row">*/}
          {/*  <div className="col-md-3 col-sm-3 col-6">*/}
          {/*    <ul>*/}
          {/*      <h4 className="foot__text">Mobil aloqa</h4>*/}
          {/*      <a href="#" className="text-decoration-none ">*/}
          {/*        <li className="text-secondary mt-lg-4 ">Tariflar</li>*/}
          {/*      </a>*/}
          {/*      <a href="#" className="text-decoration-none ">*/}
          {/*        <li className="text-secondary mt-2">Xizmatlar</li>*/}
          {/*      </a>*/}
          {/*      <a href="#" className="text-decoration-none ">*/}
          {/*        <li className="text-secondary mt-2">Xizmatlar uchun to'lov</li>*/}
          {/*      </a>*/}
          {/*      <a href="#" className="text-decoration-none ">*/}
          {/*        <li className="text-secondary mt-2">Aksiyalar</li>*/}
          {/*      </a>*/}
          {/*    </ul>*/}
          {/*  </div>*/}
          {/*  <div className="col-md-3 col-sm-3 col-6">*/}
          {/*    <ul>*/}
          {/*      <h4 className="foot__text">Ilovalar va xizmatlar</h4>*/}
          {/*      <a href="#" className="text-decoration-none ">*/}
          {/*        <li className="text-secondary mt-lg-4 ">Mobilset ilovasi</li>*/}
          {/*      </a>*/}
          {/*      <a href="#" className="text-decoration-none ">*/}
          {/*        <li className="text-secondary mt-2">To’lov tizimlari</li>*/}
          {/*      </a>*/}
          {/*      <a href="#" className="text-decoration-none ">*/}
          {/*        <li className="text-secondary mt-2">Aksiyalar</li>*/}
          {/*      </a>*/}
          {/*      <a href="#" className="text-decoration-none ">*/}
          {/*        <li className="text-secondary mt-2">Qanday e’lon berish mumkin</li>*/}
          {/*      </a>*/}
          {/*    </ul>*/}
          {/*  </div>*/}
          {/*  <div className="col-md-3 col-sm-3 col-6">*/}
          {/*    <ul>*/}
          {/*      <h4 className="foot__text">Kompaniya</h4>*/}
          {/*      <a href="#" className="text-decoration-none ">*/}
          {/*        <li className="text-secondary mt-lg-4 ">Kompaniya haqida</li>*/}
          {/*      </a>*/}
          {/*      <a href="#" className="text-decoration-none ">*/}
          {/*        <li className="text-secondary mt-2">Do’konlar</li>*/}
          {/*      </a>*/}
          {/*      <a href="#" className="text-decoration-none ">*/}
          {/*        <li className="text-secondary mt-2">Bo’sh ish o’rinlari</li>*/}
          {/*      </a>*/}
          {/*      <a href="#" className="text-decoration-none ">*/}
          {/*        <li className="text-secondary mt-2">Kontaktlar</li>*/}
          {/*      </a>*/}
          {/*    </ul>*/}
          {/*  </div>*/}
          {/*  <div className="col-md-3 col-sm-3 col-6">*/}
          {/*    <ul className="pl-0">*/}
          {/*      <h4 className="foot__text">Biz bilan aloqa</h4>*/}
          {/*      <li className="text-secondary mt-lg-4  tel">(+998 97) 120-00-02</li>*/}
          {/*      <li className="text-secondary mt-2 adres">100011, Toshkent sh. Shayxontohur tumani,*/}
          {/*        Zarqaynar ko’chasi, 3B-uy*/}
          {/*      </li>*/}
          {/*    </ul>*/}
          {/*  </div>*/}
          {/*</div>*/}
          <div className="row mt-4">
            <div className="col-md-12 d-flex justify-content-between">
              <div className="left">
                <div className="leftt d-flex">
                  <div className="dropdown">
                    <a className="btn btn-muted dropdown-toggle py-2 " data-toggle="dropdown">
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
                  <div className="sotset d-flex">
                    <a target="_blank" href={!!menus[0] ? menus[0].botUrl : ''}><img src="/assets/images/telegramm.png"
                                                                                     className="img-fluid"/></a>
                    <a target="_blank" className="mx-3" href={!!menus[0] ? menus[0].instagram : ''}><img
                      src="/assets/images/instagram.png" className="img-fluid"/></a>
                    <a target="_blank" href={!!menus[0] ? menus[0].facebook : ''}><img
                      src="/assets/images/faceebook.png" className="img-fluid"/></a>
                  </div>
                </div>
                <p className="corp">© {new Date().getFullYear()} mobilset.uz </p>
              </div>
              <div className="right">
                <h4 className="upload">{Translations.downloadApp}</h4>
                <div className="d-flex">
                  {/*<a href="#"><img src="/assets/images/apple.png" className="img-fluid mr-2 mr-sm-4"/></a>*/}
                  <a href="#"><img src="/assets/images/goole.png" className="img-fluid"/></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

FooterClient.propTypes = {};

export default FooterClient;
