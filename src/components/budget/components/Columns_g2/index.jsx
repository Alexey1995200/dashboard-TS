// import {Column} from '@antv/g2plot';
// import React, {useState, useEffect} from 'react';
//
//
// const BudgetColumns_g2 = ({columnsData}) => {
//     const data = columnsData;
//     const color1 = '#2e3432';
//     const color2 = '#45af6a';
//     const color3 = '#b2b2b2';
//
//     const config = {
//         data,
//         xField: 'city',
//         yField: 'value',
//         seriesField: 'type',
//         isGroup: 'true',
//         legend: {
//             position: 'right-top',
//             offsetX: 8,
//             title: {
//                 text: '产品类别 (平均销售量）',
//                 spacing: 8,
//             },
//             itemValue: {
//                 formatter: (text, item) => {
//                     const items = data.filter((d) => d.type === item.value);
//                     return items.length ? items.reduce((a, b) => a + b.value, 0) / items.length : '-';
//                 },
//                 style: {
//                     opacity: 0.65,
//                 },
//             },
//         },
//     };
//     return <Column {...config} />;
// };
//
//
// export default BudgetColumns_g2