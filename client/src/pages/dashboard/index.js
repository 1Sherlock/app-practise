import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'dva'

class Dashboard extends PureComponent {
  render() {
    return (
      <div>

      </div>
    )
  }
}

Dashboard.propTypes = {
  form: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default Dashboard
