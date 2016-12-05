import React, { PropTypes } from 'react';
import {Component} from 'react';
import axios from 'axios';

require('./becomeahost.component.scss');


class BecomeAHost extends React.Component {
  render() {
    return(
      <div>
          {this.props.children}
      </div>
    )
    }
}

export default BecomeAHost;
