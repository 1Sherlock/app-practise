import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Index extends Component {
  colors = ["#01B4FF", "#E62229", "#652D86", "#FCC400", "#FF5E12", "#279727"];

  render() {
    const {operatorItem, operators, text} = this.props
    return (
      <section className="beeline"
               style={{background: this.colors[!!operators ? operators.map(i => i.id).indexOf(operatorItem.id) : 5]}}>
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <h4>{!!operatorItem ? operatorItem.name : "Paynet"}</h4>
              <p>{!!operatorItem ? operatorItem.description : ""}</p>
            </div>
            <div className="col-md-4" style={{color: 'white', fontSize: 25, fontWeight: 'bold',alignItems:'center',display:'flex'}}>
              {text}
            </div>
          </div>
        </div>
      </section>
    );
  }
}

Index.propTypes = {};

export default Index;
