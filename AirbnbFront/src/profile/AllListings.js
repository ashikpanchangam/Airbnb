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


export default class AllListings extends Component {
  constructor(props){
    super(props);

    this.state = {listings: []};
    axios.get('/getUserListings').then(response => {
       console.log(response.data);
       if(response.data.length > 0) {
           this.setState({listings:response.data}, function () {
               console.log(this.state);
           });
       }
    });

  }
  render() {
    const iconButtonElement = (
      <IconButton
        touch={true}
        tooltip="more"
        tooltipPosition="bottom-left"
      >
        <MoreVertIcon color={grey400} />
      </IconButton>
    );

    const rightIconMenu = (
      <IconMenu iconButtonElement={iconButtonElement}>
        <MenuItem>Reply</MenuItem>
        <MenuItem>Forward</MenuItem>
        <MenuItem>Delete</MenuItem>
      </IconMenu>
    );

    let threadMessages = [];

    if(this.state.listings.length != 0){
      for(let i = 0; i < this.state.listings.length; i++){
          var linkUrl = "/rooms/" + this.state.listings[0].property_id;
        var listItem = <div><a href={linkUrl}>
            <ListItem
              primaryText={this.state.listings[i].property_name}
              secondaryText={
                <p>
                  {/* <span style={{color: darkBlack}}></span> */}
                  {this.state.listings[i].address}
                </p>
              }
              secondaryTextLines={2}
            /></a>
          <Divider inset={true} />
        </div>
        threadMessages.push(listItem);
      }
    }

    return (
        <div>
        <ProfileDash />
        <MuiThemeProvider>
          <List className="threads">
            {threadMessages.length !== 0 && threadMessages.map((thread, i)=>{
              return(<div key={i}>{thread}</div>)
            })}
          </List>
        </MuiThemeProvider>
        </div>
    )
  }
}
