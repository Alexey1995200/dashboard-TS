import { Column } from '@ant-design/plots';
import React, { useState, useEffect } from 'react';


const BudgetColumns_v2 = ({columnsData}) => {
    const data = columnsData;
    const color1 = '#2e3432';
    const color2 = '#45af6a';
    const color3 = '#b2b2b2';
    const config = {
        data,
        xField: 'type',
        yField: 'value',
        height: 100,
        width: 124,
        fontSize: 0,
        autoFit: true,
        style: {
            fill: ({ type }) => {
                if (type === 'Total Budget') {
                    return color1;
                } else if (type === 'Budget AmountUsed') {
                    return color2;
                } else if (type === 'Current Target Amount') {
                    return color3;
                } return 'gray';
            },
        },
        label: {
            text: (originData) => {
                const val = parseFloat(originData.value);
                if (val < 0.05) {
                    return (val * 100).toFixed(1) + '%';
                }
                return '';
            },
            offset: 10,
        },
        legend: false,
        title:false,

    };
    return <Column {...config} />;
};

export default BudgetColumns_v2