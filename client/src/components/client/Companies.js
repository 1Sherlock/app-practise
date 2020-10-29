import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Link from 'umi/Link';

class Companies extends Component {
  render() {
    const {operators} = this.props;
    return (
      <section className="company">
        <div className="container">
          <div className="row operator my-3">
            <div className="col-md  col-sm-4 mr-sm-0 mt-sm-2 bg-light mr-lg-4 col-4 ">
              <Link to={`/client/operator/${!!operators[0] ? operators[0].id : ''}`}><img
                src="/assets/images/uzmobile.png" className="img-fluid"/></Link>
            </div>
            <div className="col-md  col-sm-4 mr-sm-0 mt-sm-2 bg-light mr-lg-4 col-4 ">
              <Link to={`/client/operator/${!!operators[1] ? operators[1].id : ''}`}><img src="/assets/images/ums.png"
                                                                                          className="img-fluid"/></Link>
            </div>
            <div className="col-md  col-sm-4 mr-sm-0 mt-sm-2 bg-light mr-lg-4 col-4">
              <Link to={`/client/operator/${!!operators[2] ? operators[2].id : ''}`}><img src="/assets/images/ucell.png"
                                                                                          className="img-fluid"/></Link>
            </div>
            <div className="col-md  col-sm-4 mr-sm-0 mt-sm-2 bg-light mr-lg-4 col-4 ">
              <Link to={`/client/operator/${!!operators[3] ? operators[3].id : ''}`}><img
                src="/assets/images/beeline.png" className="img-fluid"/></Link>
            </div>
            {/*<div className="col-md  col-sm-4 mr-sm-0 mt-sm-2 bg-light mr-lg-4 col-4 ">*/}
            {/*  <Link to={`/client/operator/${!!operators[4] ? operators[4].id : ''}`}><img*/}
            {/*    src="/assets/images/perfectum.png" className="img-fluid"/></Link>*/}
            {/*</div>*/}
            <div className="col-md col-sm-4 mr-sm-0 mt-sm-2 bg-light col-4">
              <Link to={`/client/paynet`}><img src="/assets/images/paynet.png" className="img-fluid"/></Link>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

Companies.propTypes = {};

export default Companies;
