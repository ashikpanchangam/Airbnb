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

        this.state =  {
            propertyData: [
                {name: 'Property 1', revenue: 4000},
                {name: 'Property 2', revenue: 3000},
                {name: 'Property 3', revenue: 5000},
                {name: 'Property 4', revenue: 6000},
                {name: 'Property 5', revenue: 7000},
                {name: 'Property 6', revenue: 10000},
                {name: 'Property 7', revenue: 400},
                {name: 'Property 8', revenue: 1000},
                {name: 'Property 9', revenue: 2000},
                {name: 'Property 10', revenue: 29000}
            ],
            cityData: [
                {name: 'City 1', revenue: 41300},
                {name: 'City 2', revenue: 30000},
                {name: 'City 3', revenue: 5030},
                {name: 'City 4', revenue: 60010},
                {name: 'City 5', revenue: 1000},
                {name: 'City 6', revenue: 20000},
                {name: 'City 7', revenue: 34200},
                {name: 'City 8', revenue: 10120},
                {name: 'City 9', revenue: 2111},
                {name: 'City 10', revenue: 12312}
            ],
            userData: [
                {name: 'User 1', revenue: 12113},
                {name: 'User 2', revenue: 11021},
                {name: 'User 3', revenue: 12310},
                {name: 'User 4', revenue: 6123},
                {name: 'User 5', revenue: 7123},
                {name: 'User 6', revenue: 11110},
                {name: 'User 7', revenue: 12313},
                {name: 'User 8', revenue: 10011},
                {name: 'User 9', revenue: 20001},
                {name: 'User 10', revenue: 22200}
            ]
        };
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