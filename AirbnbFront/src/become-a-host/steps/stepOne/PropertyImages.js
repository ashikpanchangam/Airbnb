import React from 'react';
import {Link} from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import Lightbulb from 'material-ui/svg-icons/action/lightbulb-outline';

import {setHostImages, getHostImages} from '../../HostData'

require ("../steps.scss")

export default class PropertyImages extends React.Component {
constructor() {
    super();
    this.handleFileChange = this.handleFileChange.bind(this);
    this.state = {
        image1: {
            datauri: '',
            filename: '',
            filetype: ''
        },
        image2: {
            datauri: '',
            filename: '',
            filetype: ''
        },
        image3: {
            datauri: '',
            filename: '',
            filetype: ''
        },
        image4: {
            datauri: '',
            filename: '',
            filetype: ''
        },
        image5: {
            datauri: '',
            filename: '',
            filetype: ''
        }
    };
}
handleFileChange(event){
    event.preventDefault();

    var file1 = this.imageInput1.files[0];
    var file2 = this.imageInput2.files[0];
    var file3 = this.imageInput3.files[0];
    var file4 = this.imageInput4.files[0];
    var file5 = this.imageInput5.files[0];

    var current; var currentid = event.target.id;
    if(currentid == "image1")
        current = file1;
    else if(currentid == "image2")
        current = file2;
    else if(currentid == "image3")
        current = file3;
    else if(currentid == "image4")
        current = file4;
    else if(currentid == "image5")
        current = file5;

    const reader = new FileReader();

    reader.onload = (upload) => {
        var obj = {};
        var key = currentid;
        var value = {
          datauri: upload.target.result,
          filename: current.name,
          filetype: current.type
        };
        obj[key] = value;
        this.setState(obj, function () {
            console.dir(this.state);
            setHostImages(this.state);
        });
    };

    reader.readAsDataURL(current);
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
                    <div className="form-title-large">Upload 5 Property Images</div>
                    <div >
                      <input type="file" ref={(input) => { this.imageInput1 = input; }} id="image1" onChange={this.handleFileChange}/>
                      <br/><br/>
                      <input type="file" ref={(input) => { this.imageInput2 = input; }} id="image2" onChange={this.handleFileChange}/>
                      <br/><br/>
                      <input type="file" ref={(input) => { this.imageInput3 = input; }} id="image3" onChange={this.handleFileChange}/>
                      <br/><br/>
                      <input type="file" ref={(input) => { this.imageInput4 = input; }} id="image4" onChange={this.handleFileChange}/>
                      <br/><br/>
                      <input type="file" ref={(input) => { this.imageInput5 = input; }} id="image5" onChange={this.handleFileChange}/>
                    </div>
                    <div className="step-nav">
                      <MuiThemeProvider>
                        <div className="back-next">
                          <div className="col-xs-5 back-btn">
                          <Link to='/amenities'>
                            <FlatButton
                            label="← Back"
                            labelStyle={{textTransform: "none", color: "#E6E6E6"}}
                            />
                          </Link>
                          </div>
                          <div className="col-xs-7 next-btn">
                          <Link to='/host/spaces'>
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
                        <div className="note-title"> Images </div>
                        <div className="note-content"> Upload actual Property Images. </div>
                      </div>
                    </div>

                </div>
              </div>
            </div>
      </div>
  )
}
}
