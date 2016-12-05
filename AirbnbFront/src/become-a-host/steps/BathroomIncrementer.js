import React from 'react';
import {setHostBathrooms, getHostBathrooms} from '../HostData'

export default React.createClass({
    decrement: function() {
  	this.refs.counter.decrement();
  },
  increment: function() {
  	this.refs.counter.increment();
  },
  render: function() {
    return (
    	<div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
      	<div style={{display: "flex", flexDirection: "row"}}>
      	<Counter ref="counter" />
        <div className="increment-label">bathrooms</div>
        </div>
      	<Logic decrement={this.decrement} increment={this.increment} />

      </div>
    );
  }
});

var Logic = React.createClass({
  render: function() {
    return (
        <div>
        <button className="subtract" onClick={this.props.decrement}> - </button>
        <button className="add" onClick={this.props.increment}> + </button>
        </div>
    )
  }
});

var Counter = React.createClass({
	getInitialState: function() {
  	return {
    	counter: getHostBathrooms()
    };
  },
	increment: function() {
  	this.setState({
    	counter: this.state.counter + 0.5
    },function () {
        setHostBathrooms(this.state.counter);
    });
  },
  decrement: function() {
	    if(this.state.counter > 1) {
            this.setState({
                counter: this.state.counter - 0.5
            }, function () {
                setHostBathrooms(this.state.counter);
            });
        }
  },
  render: function() {
    return <div>{this.state.counter}</div>;
  }
});
