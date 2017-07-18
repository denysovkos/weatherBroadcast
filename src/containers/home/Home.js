import React, { Component } from "react";
import { connect } from "react-redux";

import DayCards from '../../components/dayCards/dayCards'


class Home extends Component {
  render() {
    let {loading} = this.props.weather;

    return (
      <DayCards {...this.props} loading={loading}/>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(Home);
