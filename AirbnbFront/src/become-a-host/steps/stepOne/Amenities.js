import React from 'react';
import {Link} from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Checkbox from 'material-ui/Checkbox';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

// import ChequeBox from '../../ChequeBox.svg';
// import ChequedBox from '../../ChequedBox.svg';
import Lightbulb from 'material-ui/svg-icons/action/lightbulb-outline';
import {setHostAmenities, getHostAmenities} from '../../HostData'
import {Finish} from '../../FinishHost'

require ("../steps.scss")

const styles = {
  box: {
    width: 320,
    height: 70,
    fontSize: 18,
  }
};

export default React.createClass({
    getInitialState: function() {
        return {
            HostAmenities: getHostAmenities()
        }
    },
    handleCheck(ev, isChecked){
        if(isChecked) {
            let tempArr = this.state.HostAmenities;
            tempArr.push(ev.target.value);
            this.setState({HostAmenities: tempArr});
            setHostAmenities(tempArr);
        }
        else {
            let index = this.state.HostAmenities.indexOf(ev.target.value);
            let tempArr = this.state.HostAmenities;
            tempArr.splice(index,1);
            this.setState({HostAmenities: tempArr});
            setHostAmenities(tempArr);
        }
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
                    <div className= "active-tab">Amenities</div>
                    </Link>
                  </div>
              </div>
              <div className="progress-bar">

              </div>
            </div>
            <div className="content row">
              <div className="form-side col-sm-7 col-xs-12">
                <div className="form-container">
                  <div >
                    <div className="form-title-large">What amenitites do you offer?</div>
                      <MuiThemeProvider>
                      <div style={{height: 400, overflow: "scroll"}}>
                      <Checkbox
                         label="Essentials"
                         value="Essentials"
                         defaultChecked={this.state.HostAmenities.indexOf("Essentials") > -1}
                         labelStyle={{color: '#4B4B4B'}}
                         style={styles.box}
                         onCheck={this.handleCheck}
                      />
                      <Checkbox
                         label="Wifi"
                         value="Wifi"
                         defaultChecked={this.state.HostAmenities.indexOf("Wifi") > -1}
                         labelStyle={{color: '#4B4B4B'}}
                         style={styles.box}
                         onCheck={this.handleCheck}
                      />
                      <Checkbox
                         label="Shampoo"
                         value="Shampoo"
                         defaultChecked={this.state.HostAmenities.indexOf("Shampoo") > -1}
                         labelStyle={{color: '#4B4B4B'}}
                         style={styles.box}
                         onCheck={this.handleCheck}
                      />
                      <Checkbox
                         label="Closet/drawers"
                         value="Closet/drawers"
                         defaultChecked={this.state.HostAmenities.indexOf("Closet/drawers") > -1}
                         labelStyle={{color: '#4B4B4B'}}
                         style={styles.box}
                         onCheck={this.handleCheck}
                      />
                      <Checkbox
                         label="TV"
                         value="TV"
                         defaultChecked={this.state.HostAmenities.indexOf("TV") > -1}
                         labelStyle={{color: '#4B4B4B'}}
                         style={styles.box}
                         onCheck={this.handleCheck}
                      />
                      <Checkbox
                         label="Heat"
                         value="Heat"
                         defaultChecked={this.state.HostAmenities.indexOf("Heat") > -1}
                         labelStyle={{color: '#4B4B4B'}}
                         style={styles.box}
                         onCheck={this.handleCheck}
                      />
                      <Checkbox
                         label="Air Condition"
                         value="Air Condition"
                         defaultChecked={this.state.HostAmenities.indexOf("Air Condition") > -1}
                         labelStyle={{color: '#4B4B4B'}}
                         style={styles.box}
                         onCheck={this.handleCheck}
                      />
                      <Checkbox
                         label="Breakfast, coffee, tea"
                         value="Breakfast, coffee, tea"
                         defaultChecked={this.state.HostAmenities.indexOf("Breakfast, coffee, tea") > -1}
                         labelStyle={{color: '#4B4B4B'}}
                         style={styles.box}
                         onCheck={this.handleCheck}
                      />
                      <Checkbox
                         label="Desk/workspace"
                         value="Desk/workspace"
                         defaultChecked={this.state.HostAmenities.indexOf("Desk/workspace") > -1}
                         labelStyle={{color: '#4B4B4B'}}
                         style={styles.box}
                         onCheck={this.handleCheck}
                      />
                      <Checkbox
                         label="Fireplace"
                         value="Fireplace"
                         defaultChecked={this.state.HostAmenities.indexOf("Fireplace") > -1}
                         labelStyle={{color: '#4B4B4B'}}
                         style={styles.box}
                         onCheck={this.handleCheck}
                      />
                      <Checkbox
                         label="Iron"
                         value="Iron"
                         defaultChecked={this.state.HostAmenities.indexOf("Iron") > -1}
                         labelStyle={{color: '#4B4B4B'}}
                         style={styles.box}
                         onCheck={this.handleCheck}
                      />
                      <Checkbox
                         label="Hair dryer"
                         value="Hair dryer"
                         defaultChecked={this.state.HostAmenities.indexOf("Hair dryer") > -1}
                         labelStyle={{color: '#4B4B4B'}}
                         style={styles.box}
                         onCheck={this.handleCheck}
                      />
                      <Checkbox
                         label="Pets in the house"
                         value="Pets in the house"
                         defaultChecked={this.state.HostAmenities.indexOf("Pets in the house") > -1}
                         labelStyle={{color: '#4B4B4B'}}
                         style={styles.box}
                         onCheck={this.handleCheck}
                      />
                      <div style={{}}>Safety Amenities</div>
                      <Checkbox
                         label="Smoke detector"
                         value="Smoke detector"
                         defaultChecked={this.state.HostAmenities.indexOf("Smoke detector") > -1}
                         labelStyle={{color: '#4B4B4B'}}
                         style={styles.box}
                         onCheck={this.handleCheck}
                      />
                      <Checkbox
                         label="Carbon monoxide detector"
                         value="Carbon monoxide detector"
                         defaultChecked={this.state.HostAmenities.indexOf("Carbon monoxide detector") > -1}
                         labelStyle={{color: '#4B4B4B'}}
                         style={styles.box}
                         onCheck={this.handleCheck}
                      />
                      <Checkbox
                         label="First aid kit"
                         value="First aid kit"
                         defaultChecked={this.state.HostAmenities.indexOf("First aid kit") > -1}
                         labelStyle={{color: '#4B4B4B'}}
                         style={styles.box}
                         onCheck={this.handleCheck}
                      />
                      <Checkbox
                         label="Safety card"
                         value="Safety card"
                         defaultChecked={this.state.HostAmenities.indexOf("Safety card") > -1}
                         labelStyle={{color: '#4B4B4B'}}
                         style={styles.box}
                         onCheck={this.handleCheck}
                      />
                      <Checkbox
                         label="Fire extinguisher"
                         value="Fire extinguisher"
                         defaultChecked={this.state.HostAmenities.indexOf("Fire extinguisher") > -1}
                         labelStyle={{color: '#4B4B4B'}}
                         style={styles.box}
                         onCheck={this.handleCheck}
                      />
                      <Checkbox
                         label="Lock on bedroom door"
                         value="Lock on bedroom door"
                         defaultChecked={this.state.HostAmenities.indexOf("Lock on bedroom door") > -1}
                         labelStyle={{color: '#4B4B4B'}}
                         style={styles.box}
                         onCheck={this.handleCheck}
                      />
                      </div>
                      </MuiThemeProvider>
                    <div>

                    </div>
                    <div className="step-nav">
                      <MuiThemeProvider>
                        <div className="back-next">
                          <div className="col-xs-5 back-btn">
                          <Link to='/host/location'>
                            <FlatButton
                            label="← Back"
                            labelStyle={{textTransform: "none", color: "#E6E6E6"}}
                            />
                          </Link>
                          </div>
                          <div className="col-xs-7 next-btn">
                          <Link to='/host/images'>
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
                        <div className="note-content">
                        <div>Providing the essentials helps guests feel at home in your place.</div>
                        <div style={{marginTop:'13px'}}>Some hosts provide breakfast, or just coffee and tea.
                        None of these things are required, but sometimes they add a
                        nice touch to help guests feel welcome.
                        </div>
                        </div>
                      </div>
                    </div>
                </div>
              </div>
            </div>
      </div>
  )
}


})
