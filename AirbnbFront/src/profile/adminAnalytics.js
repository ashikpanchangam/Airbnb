/**
 * Created by Nrsimha on 12/1/16.
 */


import React from 'react'
import axios from 'axios'
import ReactDOM from 'react-dom'
import Navbar from '../navbar/Navbar.js'
import moment from 'moment'
import Rheostat from 'rheostat'
import _ from 'lodash'
import { Link } from 'react-router'
import $ from 'jquery'
import {AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Area} from 'recharts'


export default class AdminAnalytics extends React.Component{

    constructor(){
        super();

        this.state = {
            propertyData: [],
            cityData: [],
            userData: []
        }
    }
    
    componentWillMount(){
        axios.post('/adminAna',{
           
        }).then(response => {
            console.log(response);
            
            this.setState({userData: response.data.userData, propertyData: response.data.propertyData, cityData: response.data.cityData});
            
            })
        
        
    }

    render(){
      
        return (
            <div style={{backgroundColor:'white'}}>
                
                <div class="row">
                <div className="col-md-6 col-md-offset-3">

                <h3 style={{color: '#5e675f'}}> Top Properties </h3>
                <AreaChart width={$(window).width()/1.5} height={$(window).height()/1.5} data={this.state.propertyData}
                           margin={{top: 10, right: 20, left: 20, bottom: 0}}>
                    <XAxis dataKey="name"/>
                    <YAxis/>
                    <CartesianGrid strokeDasharray="5 5"/>
                    <Tooltip/>
                    <Area type='monotone' dataKey='revenue' stroke='#8884d8' fill='#8884d8' />
                </AreaChart>
                    </div>
                    </div>
                    <div class="row">
                        <div className="col-md-6 col-md-offset-3">
                <h3 style={{color: '#5e675f'}}> City Report </h3>
                <AreaChart width={$(window).width()/1.5} height={$(window).height()/1.5} data={this.state.cityData}
                           margin={{top: 10, right: 20, left: 20, bottom: 0}}>
                    <XAxis dataKey="name"/>
                    <YAxis/>
                    <CartesianGrid strokeDasharray="5 5"/>
                    <Tooltip/>
                    <Area type='monotone' dataKey='revenue' stroke='#8884d8' fill='#66e0ea' />
                </AreaChart>
                            </div>
                        </div>
                <div class="row">
                    <div className="col-md-6 col-md-offset-3">
                <h3 style={{color: '#5e675f'}}>  Top Hosts </h3>
                <AreaChart width={$(window).width()/1.5} height={$(window).height()/1.5} data={this.state.userData}
                           margin={{top: 10, right: 20, left: 20, bottom: 0}}>
                    <XAxis dataKey="name"/>
                    <YAxis/>
                    <CartesianGrid strokeDasharray="5 5"/>
                    <Tooltip/>
                    <Area type='monotone' dataKey='revenue' stroke='#8884d8' fill='#5cff6f' />
                </AreaChart>
                </div>
                </div>
                </div>
        );
    }




}