import {Column} from '@ant-design/plots';
import React, {useState, useEffect} from 'react';


const BudgetColumns_v1 = ({columnsData}) => {
    const data = columnsData;
    const color1 = '#2e3432';
    const color2 = '#45af6a';
    const color3 = '#b2b2b2';
    const config = {
        data,
        categorySize: 0,
        height: 100,
        width: 124,
        xField: 'type',
        yField: 'value',
        seriesField: '',
        color: ({type}) => {
            if (type === 'Total Budget') {
                return color1;
            } else if (type === 'Budget AmountUsed') {
                return color2;
            } else if (type === 'Current Target Amount') {
                return color3;
            }
            return 'gray';
        },

        autoFit: true,
        xAxis: {
            formatter: (v) => Math.round(v / 1000) + 'k',
        },

    };
    return <Column
        data={data}
        height={100}
        width={124}
        xField={'type'}
        yField={'value'}
        color={({type}) => {
            if (type === 'Total Budget') {
                return color1;
            } else if (type === 'Budget AmountUsed') {
                return color2;
            } else if (type === 'Current Target Amount') {
                return color3;
            }
            return 'gray';
        }}
        autoFit={true}
        transform={true}
        // xAxis = {formatter: (v) => Math.round(v / 1000) + 'k',}

    />;
};

export default BudgetColumns_v1