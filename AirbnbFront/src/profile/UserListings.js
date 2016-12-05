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

export default class UserListings extends Component {
  constructor(props){
    super(props);
    this.state = {
        messages: [{
            thread: {
                    other_user: {
                        user: {
                            first_name: "San Jose Downtown Property"
                        }
                    },
                    preview: "2Bhk apartment with all the necessary amenities.",
                    imageUrl: "http://www.idesignarch.com/wp-content/uploads/Attractive-Prefab-Home-Toby-Long_3.jpg"
                }
            },
            {thread: {
                other_user: {
                    user: {
                        first_name: "Alameda Property"
                    }
                },
                preview: "3Bhk apartment at alameda, san jose.",
                imageUrl:"http://maricamckeel.com/wp-content/uploads/2014/11/carneyloganburke.jpg"
            }
            }
        ]};
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

    if(this.state.messages !== null){
      for(let i = 0; i < this.state.messages.length; i++){
        var listItem = <div><ListItem
        leftAvatar={<Avatar src={this.state.messages[i].thread.imageUrl} />}
          primaryText={this.state.messages[i].thread.other_user.user.first_name}
          secondaryText={
            <p>
              {/* <span style={{color: darkBlack}}></span> */}
              {this.state.messages[i].thread.preview}
            </p>
          }
          secondaryTextLines={2}
                            />
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
