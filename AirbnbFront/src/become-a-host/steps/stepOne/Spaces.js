import React from 'react';
import {Link} from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Lightbulb from 'material-ui/svg-icons/action/lightbulb-outline';
import {setHostPrice, getHostPrice, setHostBiddingType, getHostBiddingType} from '../../HostData';
import {Finish} from '../../FinishHost';

require ("../steps.scss")


const styles = {
    box: {
        width: 320,
        height: 70,
        fontSize: 18,
        marginTop: '1em'
    },
    inputButton: {
        height:'3em',
        width:'100%',
        padding:'0.3em'
    },
    divStyle : {
        marginTop:'1em'
    },
    radio: {
        display: "flex",
        justifyContent: "space-between",
        width: "270px",
        borderBottom: "1px solid #E6E6E6",
        height: "65px",
        padding: "20px 5px",
        paddingRight: "15px",
    }
};

export default React.createClass({
getInitialState: function(){
    return {
        biddingType: getHostBiddingType(),
        price: getHostPrice()
    }
},
handleClick(){
    Finish();
},
handleRadioClick(ev, value){
    setHostBiddingType(value);
    this.setState({biddingType: value});
},
handleChange(ev) {
    setHostPrice(ev.target.value);
    this.setState({price: ev.target.value});
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
                    <div className= "inactive-tab">Amenities</div>
                    </Link>
                  </div>
                  <div>
                    <Link to='/host/spaces'>
                    <div className= "active-tab">Pricing</div>
                    </Link>
                  </div>
              </div>
            </div>
          <div className="content row">
              <div className="form-side col-sm-7 col-xs-12">
                  <div className="form-container">
                      <div >
                          <div className="form-title-large">Pricing Details</div>
                              <div className="form-title-medium" style={styles.divStyle}>Type: Bidding/OneTime</div>
                              <MuiThemeProvider>
                                  <RadioButtonGroup labelPosition="left" name="biddingType" valueSelected={this.state.biddingType} onChange={this.handleRadioClick}>
                                      <RadioButton
                                          value="One Time"
                                          label="One Time"
                                          style={styles.radio}
                                      />
                                      <RadioButton
                                          value="Bidding"
                                          label="Bidding"
                                          style={styles.radio}
                                      />
                                  </RadioButtonGroup>
                              </MuiThemeProvider>
                              <div className="form-title-medium" style={styles.divStyle}>Price</div>
                              <input type="text" id="userAddress" style={styles.inputButton} value={this.state.price} onChange={this.handleChange}/>

                          <div className="step-nav">
                              <MuiThemeProvider>
                                  <div className="back-next">
                                      <div className="col-xs-5 back-btn">
                                          <Link to='/host/amenities'>
                                              <FlatButton
                                                  label="← Back"
                                                  labelStyle={{textTransform: "none", color: "#E6E6E6"}}
                                              />
                                          </Link>
                                      </div>
                                      <div className="col-xs-7 next-btn">
                                          <Link to='/host'>
                                              <RaisedButton
                                                  label="Next"
                                                  labelStyle={{textTransform: "none", color: "white", position: "absolute", bottom: 12, right: 61}}
                                                  backgroundColor="#EF5350"
                                                  style={{width: "180px", height: '45px', positive: "relative"}}
                                                  onClick={this.handleClick}
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
                                  Spaces should be on the property. Don’t include laundromats or nearby places that aren’t
                                  part of your property. If it’s OK with your neighbors, you can include a pool, hot tub,
                                  or other shared space.
                              </div>
                          </div>
                      </div>

                  </div>
              </div>
          </div>
      </div>
  );}
})
