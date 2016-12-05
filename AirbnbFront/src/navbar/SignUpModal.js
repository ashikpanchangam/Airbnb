import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import { browserHistory } from 'react-router';

const style = {
    marginLeft: 20,
    width: '330px'
};

const myStyle = {
    height:'4em'
};

const customContentStyle = {
    width: '400px',
    maxWidth: 'none',
};

const pink = {
    color: '#FF5E63',
    borderColor: '#FF5E63'
}

const grey = {
    color: '#EDEFED',
}

export default class SignUpModal extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            email: null,
            password: null,
            firstName: null,
            lastName: null,
            dob: null,
            validEmail: true,
            validPassword: true,
            validFirstName: true,
            validLastName: true,
            validDob: true
        };
    }

    onEmail = (e) => {
        console.log(e.keyCode);
        var re = /\S+@\S+\.\S+/;
        if(re.test(e.target.value))
            this.setState({email: e.target.value, validEmail: true});
        else
            this.setState({email: e.target.value, validEmail: false});
    }

    onFirstName = (e) => {
        console.log(e.keyCode);
        if(e.target.value.length > 0)
            this.setState({firstName: e.target.value, validFirstName: true});
        else
            this.setState({firstName: e.target.value, validFirstName: false});
    }

    onLastName = (e) => {
        console.log(e.keyCode);
        if(e.target.value.length > 0)
            this.setState({lastName: e.target.value, validLastName: true});
        else
            this.setState({lastName: e.target.value, validLastName: false});
    }

    onPassword = (e) => {
        console.log(e.keyCode);
        if(e.target.value.length > 0)
            this.setState({password: e.target.value, validPassword: true});
        else
            this.setState({password: e.target.value, validPassword: false});
    }

    onDob = (e) => {
        console.log(e.keyCode);
        if(e.target.value.length > 0)
            this.setState({dob: e.target.value, validDob: true});
        else
            this.setState({dob: e.target.value, validDob: false});
    }

    submitLogin = () => {
        var that = this;
        if(!(this.state.validEmail) || !(this.state.validFirstName) || !(this.state.validLastName) || !(this.state.validPassword)
            || !(this.state.validDob) || (this.state.email == null) || (this.state.password == null) || (this.state.firstName == null)
            || (this.state.lastName == null) || (this.state.dob == null))
            return;

        axios.post('/signup', {
            email: this.state.email,
            password: this.state.password,
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            dob: this.state.dob
        }).then(function (response, err) {
            if(err) {
                console.log(err)
            }
            console.log('response: ', response);
            if(response.data.statusCode == 200)
                browserHistory.push('/login/');
        })
    }

    render() {

        let emailError = '';
        let passwordError = '';
        let firstNameError = '';
        let lastNameError = '';
        let dobError = '';

        if(!this.state.validEmail) {
            if(this.state.email.length == 0)
                emailError = "Please enter email address";
            else
                emailError = "Invalid email address";
        }
        if(!this.state.validPassword) {
            if(this.state.password.length == 0)
                passwordError = "Please enter password";
        }
        if(!this.state.validFirstName) {
            if(this.state.firstName.length == 0)
                firstNameError = "Please enter first name";
        }
        if(!this.state.validLastName) {
            if(this.state.lastName.length == 0)
                lastNameError = "Please enter last name";
        }
        if(!this.state.validDob) {
            if(this.state.dob.length == 0)
                dobError = "Please enter date of birth";
        }

        return (
            <div className="row">
                <div className="col-md-4 col-md-offset-4">
                    <div className="panel panel-default" style={{marginTop:'1em'}}>
                        <div className="panel-heading">
                            <h2 className="panel-title">Sign up</h2>
                        </div>
                        <div className="panel-body">
                            <div className="form-horizontal" style={{padding:'2em'}}>
                                <div className="form-group">
                                    <div className="input-group">
                                        <input type="email" className="form-control" id="inputEmail" placeholder="Email" required style={myStyle} value={this.state.email} onChange={this.onEmail}/>
                                        <div className="input-group-addon"><span className ="glyphicon glyphicon-envelope" aria-hidden="true"/></div>
                                    </div>
                                    <div id="emailError" style={{color:'#ff0000'}}> {emailError} </div>
                                </div>
                                <div className="form-group">
                                    <div className="input-group">
                                        <input type="text" className="form-control" id="inputFirstName" placeholder="First Name" required style={myStyle} value={this.state.firstName} onChange={this.onFirstName}/>
                                        <div className="input-group-addon"><span className ="glyphicon glyphicon-user" aria-hidden="true"/></div>
                                    </div>
                                    <div id="firstNameError" style={{color:'#ff0000'}}> {firstNameError} </div>
                                </div>
                                <div className="form-group">
                                    <div className="input-group">
                                        <input type="text" className="form-control" id="inputLastName" placeholder="Last Name" required style={myStyle} value={this.state.lastName} onChange={this.onLastName}/>
                                        <div className="input-group-addon"><span className ="glyphicon glyphicon-user" aria-hidden="true"/></div>
                                    </div>
                                    <div id="lastNameError" style={{color:'#ff0000'}}> {lastNameError} </div>
                                </div>
                                <div className="form-group">
                                    <div className="input-group">
                                        <input type="password" className="form-control" id="inputPassword" placeholder="Password" required style={myStyle} value={this.state.password} onChange={this.onPassword}/>
                                        <div className="input-group-addon"><span className ="glyphicon glyphicon-lock" aria-hidden="true"/></div>
                                    </div>
                                    <div id="passwordError" style={{color:'#ff0000'}}> {passwordError} </div>
                                </div>
                                <div className="form-group">
                                    <div className="input-group">
                                        <input type="date" className="form-control" id="inputBirthday" required style={myStyle} value={this.state.dob} onChange={this.onDob}/>
                                        <div className="input-group-addon"><span className ="glyphicon glyphicon-gift" aria-hidden="true"/></div>
                                    </div>
                                    <div id="dobError" style={{color:'#ff0000'}}> {dobError} </div>
                                </div>
                                <div className="form-group">
                                    <button className="btn btn-block" style={{height:'4em', backgroundColor:'#ff5a5f', color:'#fff'}} onClick={this.submitLogin} >Sign up</button>
                                </div>
                                <div className="form-group">
                                    <div className="col-sm-10 col-sm-offset-1">
                                        <span>Already have an account?</span>
                                        <a href="/login">
                                            <button className="btn btn-default" style={{float:'right', height:'3em', color:'#ff5a5f', borderColor:'#ff5a5f'}}>Log in</button>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
