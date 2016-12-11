/**
 * Created by Nrsimha on 12/2/16.
 */

import React from 'react'
import $ from 'jquery'
import {AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Area, Pie, PieChart} from 'recharts'
import ProfileDash from './ProfileDash'


export default class HostAnalytics extends React.Component{

    constructor(){
        super();

        this.state = {
            pageClicks: [
                {name: 'Profile', clicks: 145},
                {name: 'Properties', clicks: 1231},
                {name: 'home', clicks: 124}
            ],
            propertyClicks: [
                {name: 'Property 1', clicks: 45},
                {name: 'Property 2', clicks: 31},
                {name: 'Property 3', clicks: 52},
                {name: 'Property 4', clicks: 64},
                {name: 'Property 5', clicks: 730},
                {name: 'Property 6', clicks: 121},
                {name: 'Property 7', clicks: 402},
                {name: 'Property 8', clicks: 105},
                {name: 'Property 9', clicks: 260},
                {name: 'Property 10', clicks: 202}
            ],
            areas:[],
            reviews:[
                {name: 'Property 1', value: 5},
                {name: 'Property 2', value: 1},
                {name: 'Property 3', value: 2},
                {name: 'Property 4', value: 6},
                {name: 'Property 5', value: 3},
                {name: 'Property 6', value: 2},
                {name: 'Property 7', value: 2},
                {name: 'Property 8', value: 1},
                {name: 'Property 9', value: 8},
                {name: 'Property 10', value: 2}
            ],
            users:[],
            bidding:[
                {name: 'Property 1', value: 2},
                {name: 'Property 2', value: 3},
                {name: 'Property 3', value: 4},
                {name: 'Property 4', value: 4},
                {name: 'Property 5', value: 5},
                {name: 'Property 6', value: 7},
                {name: 'Property 7', value: 1},
                {name: 'Property 8', value: 6},
                {name: 'Property 9', value: 3},
                {name: 'Property 10', value: 1}
            ]

        }
    }

    render(){
       let width = $(window).width();
       let height = $(window).height();
        height = (height - 20 )/2.5
        if(width > 800)
            width = (width-50)/3;
        else
            width = width/1.5
        

        return (
            <div style={{backgroundColor:'white'}}>
                <ProfileDash />

                <div className='row'>
                    <div className='col-md-4'>
                    <h3 align='center'>  Users By Area </h3>
                    <PieChart id="myPie1" width={width} height={200}>
                        <Pie data={this.state.bidding} cx={200} cy={200} innerRadius={70} outerRadius={90} fill="#82ca9d" label/>
                    </PieChart>
                        </div>
                    <div className='col-md-4'>
                        <h3 align='center'> Area wise Clicks </h3>
                    <PieChart width={width} height={200}>
                        <Pie data={this.state.bidding} cx={200} cy={200} innerRadius={70} outerRadius={90} fill="#f03649" label/>
                    </PieChart>
                        </div>
                    <div className='col-md-4'>

                        <h3 align='center'> Bids per Property</h3>
                    <PieChart width={width} height={200}>
                        <Pie data={this.state.bidding} cx={200} cy={200} innerRadius={70} outerRadius={90} fill="#1ee9ee" label/>
                    </PieChart>
                    </div>
                </div>

                <div className='row'>
                <div className='col-md-4'>
                <h3 align='center'> Page Clicks </h3>
                <AreaChart width={width} height={height} data={this.state.pageClicks}
                           margin={{top: 10, right: 50, left: 50, bottom: 0}}>
                    <XAxis dataKey="name"/>
                    <YAxis/>
                    <CartesianGrid strokeDasharray="5 5"/>
                    <Tooltip/>
                    <Area type='monotone' dataKey='clicks' stroke='#8884d8' fill='#8884d8' />
                </AreaChart>
                    </div>
                <div className='col-md-4'>
                <h3 align='center'> Property Clicks </h3>
                <AreaChart width={width} height={height} data={this.state.propertyClicks}
                           margin={{top: 10, right: 30, left: 0, bottom: 0}}>
                    <XAxis dataKey="name"/>
                    <YAxis/>
                    <CartesianGrid strokeDasharray="5 5"/>
                    <Tooltip/>
                    <Area type='monotone' dataKey='clicks' stroke='#8884d8' fill='#66e0ea' />
                </AreaChart>
                    </div>
                <div className='col-md-4'>
                <h3 align='center'> Reviews </h3>
                <AreaChart width={width} height={height} data={this.state.reviews}
                           margin={{top: 10, right: 30, left: 0, bottom: 0}}>
                    <XAxis dataKey="name"/>
                    <YAxis/>
                    <CartesianGrid strokeDasharray="5 5"/>
                    <Tooltip/>
                    <Area type='monotone' dataKey='value' stroke='#8884d8' fill='#66e0ea' />
                </AreaChart>
                    </div>
                
                </div>

            </div>
        );
    }




}

