import React, {Component} from 'react';
import ProfileDash from "./ProfileDash";
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import axios from 'axios';

require('./inbox.scss');

export default class Bill extends Component {
  constructor(props){
    super(props);
  }
  render() {

    return (
    <div>
        <ProfileDash />
        <div className="container">
            <div className="col-md-10 col-md-offset-1" style={{marginTop: '2em'}}>
            <div className="row">
                <p>Invoice No: 232-87-9193</p>
                <p>Check In: 2016-12-01</p>
                <p>Check Out: 2016-12-04</p>
                <p>Status: Paid</p>
            </div>

            <div className="row">
                <div className="col-md-6">
                <h3>Customer Details:</h3>
                <p>First Name: Jayesh <br/>
                Last Name: Dusseja <br/>
                Address: 190 Ryland Street<br/>
                City: San Jose<br/>
                State: California<br/>
                Zip Code: 95110<br/>
                Phone Number: 9876543210</p>
                </div>

                <div className="col-md-6">
                <h3>Host Details:</h3>
                <p>
                    First Name: Ashik<br/>
                    Last Name: Panchangam Jaikishan<br/>
                    Address: 88 Colin P Kelly Jr St<br/>
                    City: San Francisco<br/>
                    State: California<br/>
                    Zip Code: 93445<br/>
                    Phone Number: 9123456780<br/>
                </p>
                </div>
            </div>
            <div className="row" style={{marginTop: '2em'}}>
            <table className="table table-striped">
                <tr>
                    <th>Property Name</th>
                    <th>No. of Nights</th>
                    <th>Price per Night</th>
                    <th>Total</th>
                </tr>
                <tr>
                    <td>Mannat</td>
                    <td>3</td>
                    <td>$50</td>
                    <td>$150</td>
                </tr>
            </table>
            </div>
            </div>
        </div>
    </div>
    )
  }
}
