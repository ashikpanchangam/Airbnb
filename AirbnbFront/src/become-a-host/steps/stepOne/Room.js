import React from 'react';
import {Link} from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

import Lightbulb from 'material-ui/svg-icons/action/lightbulb-outline';
import Home from 'material-ui/svg-icons/action/home';
import Seat from 'material-ui/svg-icons/action/event-seat';
import Hotel from 'material-ui/svg-icons/maps/hotel';
import axios from 'axios';
import {setHostCategory, getHostCategory} from '../../HostData'

require ("../steps.scss")



const styles = {
  block: {
    maxWidth: 250,
  },
  checkbox: {
    marginBottom: 16,
  },
  customWidth: {
    width: 320,
    marginTop: '3px',
    border: "none",
  },
  dropDown: {
    backgroundColor: "#484848",
    fontFamily: "Roboto",
    width: "100%",
    border: "none",
    marginBottom: "1vh",
    borderRadius: "3px",
  },
  radio: {
    display: "flex",
    justifyContent: "space-between",
    width: "270px",
    borderBottom: "1px solid #E6E6E6",
    height: "65px",
    padding: "20px 5px",
    paddingRight: "15px",
  },
  placetypeIcon: {
    color: "#E6E6E6",
    borderBottom: "1px solid #E6E6E6",
    height: "65px",
    padding: "10px ",
    width: '48px'
  }
};

export default class Room extends React.Component {
constructor() {
    super();
    axios.get('/getSession').then(response => {
        if(response.data.userId == undefined)
            window.location = '/login';
    });
    this.state = {
      CategoryValue: getHostCategory()
    };
    this.handleRadioClick = this.handleRadioClick.bind(this);
}
handleRadioClick(event, value){
    this.setState({CategoryValue: value},function () {
        setHostCategory(value);
    });
}
render(){
  return(
      <div className="room-parent-container">
            <div className="progress-bar-container">
              <div className="progress-items hidden-xs">
              <div>
                <Link to='/host/room' >
                <div className= "active-tab">Place type</div>
                </Link>
              </div>
              <div>
                <Link to='/host/bedrooms'>
                <div className= "inactive-tab">Bedrooms</div>
                </Link>
              </div>
              <div>
                <Link to='/host/bathrooms'>
                <div className= "inactive-tab">Baths</div>
                </Link>
              </div>
              <div>
                <Link to='/host/location'>
                <div className= "inactive-tab">Location</div>
                </Link>
              </div>
              <div>
                <Link to='/host/amenities'>
                <div className= "inactive-tab">Amenities</div>
                </Link>
              </div>
              </div>
              <div className="progress-bar">
              </div>
            </div>
            <div className="content row">
              <div className="form-side col-sm-7 col-xs-12">
                <div className="form-container">
                  <div>
                    <div className="form-title-large">What kind of place are you listing?</div>
                    <div className="button-container">
                      <MuiThemeProvider>
                        <div className="placetype-icon">
                          <Home style={styles.placetypeIcon}/>
                          <Hotel style={styles.placetypeIcon}/>
                          <Seat style={styles.placetypeIcon}/>
                        </div>
                        </MuiThemeProvider>
                        <div style={{width: '100%'}}>
                        <MuiThemeProvider>
                        <RadioButtonGroup labelPosition="left" name="shipSpeed" valueSelected={this.state.CategoryValue} onChange={this.handleRadioClick}>
                           <RadioButton
                             value="Entire place"
                             label="Entire place"
                             style={styles.radio}
                            />
                           <RadioButton
                             value="Private room"
                             label="Private room"
                             style={styles.radio}
                           />
                           <RadioButton
                             value="Shared room"
                             label="Shared room"
                             style={styles.radio}
                           />
                         </RadioButtonGroup>
                         </MuiThemeProvider>
                      </div>
                    </div>
                    <div className="step-nav">
                      <MuiThemeProvider>
                        <div className="back-next">
                          <div className="col-xs-5 back-btn">
                          <Link to='/host'>
                            <FlatButton
                            label="← Back"
                            labelStyle={{textTransform: "none", color: "#E6E6E6"}}
                            />
                          </Link>
                          </div>
                          <div className="col-xs-7 next-btn">
                          <Link to='/host/bedrooms'>
                            <RaisedButton
                            label="Next"
                            labelStyle={{textTransform: "none", color: "white", position: "absolute", bottom: 12, right: 61}}
                            backgroundColor="#EF5350"
                            disabledBackgroundColor="#FFCDD2"
                            style={{width: "180px", height: '45px', positive: "relative"}}
                            />
                          </Link>
                          </div>
                        </div>
                      </MuiThemeProvider>
                    </div>
                  </div>
                </div>
              </div>

              <div className="instruction-side col-sm-5 hidden-xs">
                <div className="note-container">
                    <MuiThemeProvider>
                      <Lightbulb style={{ color: "#40BDB6", height: "30px", width: "30px", marginBottom: "18px" }}/>
                    </MuiThemeProvider>
                  <div className="note">
                      <div >
                        <div className="note-title"> Entire Place </div>
                        <div className="note-content"> Guests will rent the entire place. Includes in-law units. </div>
                      </div>
                      <div >
                        <div className="note-title"> Private Room </div>
                        <div className="note-content"> Guests share some spaces but they’ll have their own private room for sleeping. </div>
                      </div>
                      <div >
                        <div className="note-title"> Shared Room </div>
                        <div className="note-content"> Guests don’t have a room to themselves. </div>
                      </div>
                    </div>

                </div>
              </div>
            </div>
      </div>
  )
}
}
