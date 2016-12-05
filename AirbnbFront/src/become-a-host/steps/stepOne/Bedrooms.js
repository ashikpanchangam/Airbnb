import React from 'react';
import {Link} from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Checkbox from 'material-ui/Checkbox';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import BedIncrementer from '../BedIncrementer'
import GuestIncrementer from '../GuestIncrementer'

import Lightbulb from 'material-ui/svg-icons/action/lightbulb-outline';
import Home from 'material-ui/svg-icons/action/home';
import Seat from 'material-ui/svg-icons/action/event-seat';
import Hotel from 'material-ui/svg-icons/maps/hotel';
import OpenCircle from 'material-ui/svg-icons/image/panorama-fish-eye';
import SelectedCircle from 'material-ui/svg-icons/image/adjust';

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
    fontSize: 18,
    color: '#A2A2A2',
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

export default React.createClass({
getInitialState() {
  return {
          value: 1,
          enabler: true,
          bed: 1
  }
},
handleChange(event, index, value){
  this.setState({value})
},
handleChangeTwo(event, index, bed){
  this.setState({bed})
},
handleClick(){
  this.setState({enabler: false})
},
render(){
  return(
      <div className="room-parent-container">
            <div className="progress-bar-container">
              <div className="progress-items hidden-xs">
              <div>
                <Link to='/host/room'>
                <div className= "inactive-tab">Place type</div>
                </Link>
              </div>
              <div>
                <Link to='/host/bedrooms'>
                <div className= "active-tab">Bedrooms</div>
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
                    <div className="form-title-large">How many guests can your place accommodate?</div>
                    <div className="incrementer">
                      <BedIncrementer />
                    </div>
                    <div>
                      <div className="form-title-medium" style={{marginTop: "40px"}}>How many guests can stay?</div>
                        <div className="incrementer">
                          <GuestIncrementer />
                        </div>
                    </div>
                    <div className="step-nav">
                      <MuiThemeProvider>
                        <div className="back-next">
                          <div className="col-xs-5 back-btn">
                          <Link to='/host/room'>
                            <FlatButton
                            label="← Back"
                            labelStyle={{textTransform: "none", color: "#E6E6E6"}}
                            />
                          </Link>
                          </div>
                          <div className="col-xs-7 next-btn">
                          <Link to='/host/bathrooms'>
                            <RaisedButton
                            label="Next"
                            labelStyle={{textTransform: "none", color: "white", position: "absolute", bottom: 12, right: 61}}
                            backgroundColor="#EF5350"
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
                        <div className="note-content"> The number and type of beds you have determines how many guests can stay comfortably </div>
                      </div>
                    </div>

                </div>
              </div>
            </div>
      </div>
  )
}
})
