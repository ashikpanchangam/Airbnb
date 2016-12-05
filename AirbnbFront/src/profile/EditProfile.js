import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import ProfileDash from "./ProfileDash";

import axios from 'axios';

const style = {
  padding: '0px 20px',
  marginLeft: 'auto',
  marginRight: 'auto',
  outline: {
    border: '1px solid #dce0e0'
  },
  headerStyle: {
    height: '48px',
    padding: '15px 24px',
    backgroundColor: '#EDEFED',
    fontSize: '16px',
    borderBottom: '1px solid #dce0e0',
  },
  info: {
    fontSize: '14px',
    lineHeight: '1.43',
    color: '#484848',
    padding: '25px',
    backgroundColor: '#fff',
  },
  buttonDiv:{
    fontSize: '14px',
    lineHeight: '1.43',
    color: '#484848',
    padding: '25px',
    backgroundColor: '#fff',
    textAlign:'center'
  },
  pink: {
    color: '#FF5A5F',
    cursor: 'pointer',
    listStyleType: 'none',
  }
}


class EditProfile extends Component {
  constructor(props){
    super(props)

    this.state = {
      user: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);

    axios.get('/getSession').then(response =>{
      this.setState({user: response.data.currentUser}, function (){
        var dt = this.state.user.dob.split("T");
        this.setState({user:{dob:dt[0]}});
      })
    });
  }
  handleChange() {
      this.setState({
        user:{
          first_name: this.inputFirstName.value,
          last_name: this.inputLastName.value,
          email: this.inputEmail.value,
          dob: this.inputDob.value,
          phone: this.inputPhone.value,
          address: this.inputAddress.value
        }},function () {
          console.log(this.state);
      });
  }
  handleClick() {
      axios.post('/editProfile',{
          first_name: this.state.user.first_name,
          last_name: this.state.user.last_name,
          email: this.state.user.email,
          dob: this.state.user.dob,
          phone_number: this.state.user.phone,
          address: this.state.user.address
      }).then(response => {
        if(response.data.statusCode == 200)
          alert("Data successfully saved");
      });
  }
    render() {
        return (
          <div>
            <ProfileDash />
            <div className="profile-container">
              <div style={style} className="row bodyWidth profile-container">
                <div className="col-sm-3 col-xs-12">
                  <img className="profilePic" src={this.state.user !== null && this.state.user.picture_large_url} />
                  <div style={style.info}>
                    <div style={{textAlign: 'center'}}>
                      <div style={{fontSize: '32px', marginBottom:'15px'}}>{this.state.user == null? '' : this.state.user.first_name}</div>
                      <div style={style.pink}>View Profile</div>
                      <div style={style.pink}>Edit Profile</div>
                    </div>
                  </div>
                  <br/>
                  <br/>
                  <div style={style.outline}>
                    <div style={style.headerStyle}> Quick Links</div>
                    <div style={style.info}>
                      <div style={style.pink}>Upcoming Trips</div>
                      <div style={style.pink}>Hosting on Airbnb</div>
                      <div style={style.pink}>Traceling on Airbnb</div>
                      <div style={style.pink}>Help Center</div>
                    </div>
                  </div>
                  <br/>
                </div>
                <div className="col-md-9 col-sm-9 col-xs-12">
                  <div style={style.outline}>
                    <div style={style.headerStyle}> Edit Profile</div>
                    <form className="form-horizontal" style={{padding:'1em'}}>
                      <div className="form-group">
                        <label htmlFor="inputFirstName" className="col-sm-2 control-label">First Name</label>
                        <div className="col-sm-10">
                          <input type="text" className="form-control" ref={(input) => { this.inputFirstName = input; }} value={this.state.user == null? '' : this.state.user.first_name} onChange={this.handleChange} id="inputFirstName" placeholder="First Name"/>
                        </div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="inputLastName" className="col-sm-2 control-label">Last Name</label>
                        <div className="col-sm-10">
                          <input type="text" className="form-control" ref={(input) => { this.inputLastName = input; }} value={this.state.user == null? '' : this.state.user.last_name} onChange={this.handleChange} id="inputLastName" placeholder="Last Name"/>
                        </div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="inputEmail" className="col-sm-2 control-label">Email</label>
                        <div className="col-sm-10">
                          <input type="email" disabled className="form-control" ref={(input) => { this.inputEmail = input; }} value={this.state.user == null? '' : this.state.user.email} onChange={this.handleChange} id="inputEmail" placeholder="Email"/>
                        </div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="inputDob" className="col-sm-2 control-label">Date Of Birth</label>
                        <div className="col-sm-10">
                          <input type="date" className="form-control" ref={(input) => { this.inputDob = input; }} value={this.state.user == null? '' : this.state.user.dob} onChange={this.handleChange} id="inputDob" placeholder="Date Of Birth"/>
                        </div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="inputPhone" className="col-sm-2 control-label">Phone</label>
                        <div className="col-sm-10">
                          <input type="text" className="form-control" ref={(input) => { this.inputPhone = input; }} value={this.state.user == null? '' : this.state.user.phone_number} onChange={this.handleChange} id="inputPhone" placeholder="Phone"/>
                        </div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="inputAddress" className="col-sm-2 control-label">Address</label>
                        <div className="col-sm-10">
                          <input type="text" className="form-control" ref={(input) => { this.inputAddress = input; }} value={this.state.user == null? '' : this.state.user.address} onChange={this.handleChange} id="inputAddress" placeholder="Address"/>
                        </div>
                      </div>
                    </form>
                    <MuiThemeProvider>
                      <div style={{border: '1px solid #dce0e0'}}>
                        <div style={style.buttonDiv}>
                          <FlatButton style={{backgroundColor:'#FF5A5F'}} onClick={this.handleClick} label="Save Profile"  labelStyle={{textTransform: "none", color:'#fff', margin: "0 20px"}}  />
                        </div>
                      </div>
                    </MuiThemeProvider>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
}

export default EditProfile;
