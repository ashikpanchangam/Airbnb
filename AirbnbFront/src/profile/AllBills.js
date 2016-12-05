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

export default class AllBills extends Component {
  constructor(props){
    super(props);
    this.state = {
        messages: [{
            thread: {
                    other_user: {
                        user: {
                            first_name: "Invoice #125-33-2345"
                        }
                    },
                    preview: "User Id: 232-11-4556      Host Id: 929-75-1837     Total: $290",
                    imageUrl: ""
                }
            },
            {thread: {
                other_user: {
                    user: {
                        first_name: "Invoice #985-16-8946"
                    }
                },
                preview: "User Id: 271-17-1578      Host Id: 124-74-1133     Total: $160",
                imageUrl:""
            }
            },
            {thread: {
                other_user: {
                    user: {
                        first_name: "Invoice #857-26-1946"
                    }
                },
                preview: "User Id: 662-39-1957      Host Id: 102-99-9674     Total: $416",
                imageUrl:""
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
