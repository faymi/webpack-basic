

import _ from 'lodash';

export default function printMe() {
    // console.log('I get called from print.js!');

    if (process.env.NODE_ENV !== 'production') {
        console.log('Looks like we are in development mode!');
    }
    // 错误信息可以通过设置 devtool 配置项而跟踪到
    cosnole.error('I get called from print.js!');
}

function ready() {
    console.log(
        _.join(['Another', 'module', 'loaded!'], ' ')
    );
}

ready();