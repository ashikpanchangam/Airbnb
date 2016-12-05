import React from 'react';
import {Link} from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Lightbulb from 'material-ui/svg-icons/action/lightbulb-outline';
import {getHostAddress, getHostCity, getHostCountry, getHostState, getHostZipCode, getHostLat, getHostLng
    , setHostAddress, setHostCity, setHostCountry, setHostState, setHostZipCode, setHostLat, setHostLng} from '../../HostData'

require ("../steps.scss")

const styles = {
    inputButton: {
      height:'3em',
      width:'100%',
      padding:'0.3em'
    },
    divStyle : {
      marginTop:'1em'
    }
};

export default React.createClass({
    getInitialState() {
        return {
            enabler: true,
            hostAddress: getHostAddress(),
            hostCity: getHostCity(),
            hostState: getHostState(),
            hostCountry: getHostCountry(),
            hostZipCode: getHostZipCode(),
            hostLat: getHostLat(),
            hostLng: getHostLng()
        };
    },
    HandleChange() {
        setHostAddress(this.inputAddress.value);
        setHostCity(this.inputCity.value);
        setHostState(this.inputState.value);
        setHostCountry(this.inputCountry.value);
        setHostZipCode(this.inputZipCode.value);
        setHostLat(this.inputLat.value);
        setHostLng(this.inputLng.value);
        this.setState({
            enabler: false,
            hostAddress: this.inputAddress.value,
            hostCity: this.inputCity.value,
            hostState: this.inputState.value,
            hostCountry: this.inputCountry.value,
            hostZipCode: this.inputZipCode.value,
            hostLat: this.inputLat.value,
            hostLng: this.inputLng.value
        });
    },
    componentDidMount() {
        const jsCode = `
          var autocomplete;
          var componentForm = {
            route: 'long_name',
            locality: 'long_name',
            administrative_area_level_1: 'long_name',
            country: 'long_name',
            postal_code: 'short_name'
          };

          autocomplete = new google.maps.places.Autocomplete((document.getElementById('userAddress')));
          autocomplete.addListener('place_changed', fillInAddress);

          function fillInAddress() {
            var place = autocomplete.getPlace();
            // console.log(place.geometry.location.lat());
            // console.log(place.geometry.location.lng());
            for (var component in componentForm) {
                document.getElementById(component).value = '';
                document.getElementById(component).disabled = false;
            }
    
            for (var i = 0; i < place.address_components.length; i++) {
                var addressType = place.address_components[i].types[0];
                if (componentForm[addressType]) {
                    if(addressType=='route') {
                        var val = place.address_components[0]["long_name"] + " " + place.address_components[1]["long_name"];
                    }
                    else {
                        var val = place.address_components[i][componentForm[addressType]];
                    }
                    document.getElementById(addressType).value = val;
                }
            }
            
            document.getElementById('lat').value = place.geometry.location.lat();
            document.getElementById('lng').value = place.geometry.location.lng();
    
            var event = new Event('input', { bubbles: true });
            document.getElementById("locality").dispatchEvent(event);
          }
        `;
        new Function(jsCode)();
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
                      <div className= "active-tab">Location</div>
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
                <div className="form-side col-sm-7 col-xs-12" style={{position:'initial', top:'initial', left:'initial', bottom:'initial',marginTop:'1em'}}>
                  <div className="form-container">
                    <div>
                      <div className="form-title-large">Where's your place located?</div>
                      <div>
                        <div className="form-title-medium" style={styles.divStyle}>Search Your Address</div>
                        <input type="text" id="userAddress" style={styles.inputButton} />
                        <div className="form-title-medium" style={styles.divStyle}>Street</div>
                        <input type="text" ref={(input) => { this.inputAddress = input; }} id="route" value={this.state.hostAddress} style={styles.inputButton} onChange={this.HandleChange}/>
                        <div className="form-title-medium" style={styles.divStyle}>City</div>
                        <input type="text" ref={(input) => { this.inputCity = input; }} id="locality" value={this.state.hostCity} style={styles.inputButton} onChange={this.HandleChange}/>
                        <div className="form-title-medium" style={styles.divStyle}>State</div>
                        <input type="text" ref={(input) => { this.inputState = input; }} id="administrative_area_level_1" value={this.state.hostState} style={styles.inputButton} onChange={this.HandleChange}/>
                        <div className="form-title-medium" style={styles.divStyle}>Country</div>
                        <input type="text" ref={(input) => { this.inputCountry = input; }} id="country" value={this.state.hostCountry} style={styles.inputButton} onChange={this.HandleChange}/>
                        <div className="form-title-medium" style={styles.divStyle}>Zip Code</div>
                        <input type="text" ref={(input) => { this.inputZipCode = input; }} id="postal_code" value={this.state.hostZipCode} style={styles.inputButton} onChange={this.HandleChange}/>
                        <input type="hidden" ref={(input) => { this.inputLat = input; }} id="lat" value={this.state.hostLat} onChange={this.HandleChange}/>
                        <input type="hidden" ref={(input) => { this.inputLng = input; }} id="lng" value={this.state.hostLng} onChange={this.HandleChange}/>
                      </div>
                      <div className="step-nav" style={{position:'initial',bottom:'initial',marginBottom:'-20px'}}>
                        <MuiThemeProvider>
                          <div className="back-next">
                            <div className="col-xs-5 back-btn">
                              <Link to='/host/bathrooms'>
                                <FlatButton
                                    label="← Back"
                                    labelStyle={{textTransform: "none", color: "#E6E6E6"}}
                                />
                              </Link>
                            </div>
                            <div className="col-xs-7 next-btn">
                              <Link to='/host/amenities'>
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
                        <div className="note-content"> Your exact address will only be shared with confirmed guests. </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
        )
    }
})
