import React from 'react';
import axios from 'axios';

const myStyle = {
  height:'4em'
};

export default class DialogExampleSimple extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      email: null,
      password: null,
      validEmail: true,
      validPassword: true,
      generalError: ''
    };
}

  onEmail = (e) => {
    console.log(e.keyCode);
    var re = /\S+@\S+\.\S+/;
    if(re.test(e.target.value))
        this.setState({email: e.target.value, validEmail: true, generalError: ''});
    else
        this.setState({email: e.target.value, validEmail: false, generalError: ''});
  };

  onPassword = (e) => {
    console.log(e.keyCode);
    if(e.target.value.length > 0)
      this.setState({password: e.target.value, validPassword: true, generalError: ''});
    else
      this.setState({password: e.target.value, validPassword: false, generalError: ''});
  };

  submitLogin = () => {
    if(!(this.state.validEmail) || !(this.state.validPassword) || (this.state.email == null) || (this.state.password == null))
      return;

      var that = this;
      axios.post('/login', {
        email: this.state.email,
        password: this.state.password
      })
      .then(function (response, err) {
        if(err) {
          console.log(err)
        }
        console.log('response: ', response);
        if(response.data.statusCode == 200)
          window.location = '/profile';
        else {
          that.setState({generalError: "Invalid credentials"}, function () {
              console.log(that.state.generalError);
          });
        }
      })
};
    render() {
    let emailError = '';
    let passwordError = '';
    let gError = this.state.generalError;

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

    return (
      <div className="row">
        <div className="col-md-4 col-md-offset-4">
          <div className="panel panel-default" style={{marginTop:'6em'}}>
            <div className="panel-heading">
              <h2 className="panel-title">Login</h2>
            </div>
            <div className="panel-body">
              <div className="form-horizontal" style={{padding:'2em'}}>
                <div id="generalError" style={{color:'#ff0000', textAlign:'center'}}> {gError} </div>
                <div className="form-group">
                  <div className="input-group">
                    <input type="email" className="form-control" id="inputEmail" placeholder="Email" required style={myStyle} value={this.state.email} onChange={this.onEmail}/>
                    <div className="input-group-addon"><span className ="glyphicon glyphicon-envelope" aria-hidden="true"/></div>
                  </div>
                  <div id="emailError" style={{color:'#ff0000'}}> {emailError} </div>
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <input type="password" className="form-control" id="inputPassword" placeholder="Password" required style={myStyle} value={this.state.password} onChange={this.onPassword}/>
                    <div className="input-group-addon"><span className ="glyphicon glyphicon-lock" aria-hidden="true"/></div>
                  </div>
                  <div id="passwordError" style={{color:'#ff0000'}}> {passwordError} </div>
                </div>
                <div className="form-group">
                    <button className="btn btn-block" style={{height:'4em', backgroundColor:'#ff5a5f', color:'#fff'}} onClick={this.submitLogin} >Log in</button>
                </div>
                <div className="form-group">
                  <div className="col-sm-10 col-sm-offset-1">
                    <span>Don't have an account?</span>
                    <a href="/signup">
                      <button className="btn btn-default" style={{float:'right', height:'3em', color:'#ff5a5f', borderColor:'#ff5a5f'}}>Sign up</button>
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
