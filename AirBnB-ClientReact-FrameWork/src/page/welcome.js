import React from 'react';
import { Page, Panel } from 'react-blur-admin';
import { Row, Col } from 'react-flex-proto';
import {SearchBar} from 'src/layout/components/search-bar';
import Card from 'src/layout/components/card';
require('../layout/css/welcome.css');
import { PageTop } from 'src/layout/components';
import $ from 'jquery';
import {GMap} from 'src/layout/components/gmap'
var pubsub = require('pubsub-js');


export class Welcome extends React.Component {

  constructor(){
    super();
    this.state = {
      list:[]
    };
  }

  componentDidMount(){
    pubsub.subscribe('searchChange', (message, data) => {
      console.log(data);
      this.setState({list : data});

    });

  }

  renderMap() {
    return (
<div>
        <GMap />
  </div>
          );
  }


  renderCard() {

    return (
      this.state.list.map((item) => {
        return (
          <Col padding={5}>
            <Panel className="panel1">
          <Card data={item}/>
          </Panel>
          </Col>
        );

      })
    );

  }

  render() {
    return (
      <Page >

  <Row>
        <Col padding = {5}>
          {this.renderCard()}
        </Col>
          <Col padding={5}>
              {this.renderMap()}
           </Col>
     </Row>
      </Page>
    );
  }
}

