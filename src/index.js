import _ from 'lodash';
import './index.css';
import icon from './assets/image/16069ea85abd92fe.png';
// import printMe from './print.js';
import { square } from './math';

// async function getComponent() { // 动态导入
// await import(/* webpackChunkName: "lodash" */ 'lodash');
function getComponent() {
    var element = document.createElement('div');

    element.innerHTML = _.join(['Hello', 'Webpack', '!'], ' ');
    element.classList.add('color') // 2. 添加类名

    var img = new Image(200, 200);
    img.src = icon;

    var text = document.createElement('p');
    text.innerHTML = '我的优点是：我很帅;但是我的缺点是：我帅的不明显。嘻嘻😁^_^ ';
    text.classList.add('web-font');

    var btn = document.createElement('button');
    btn.innerHTML = 'Click me and check the console!';
    // btn.onclick = printMe;
    // 懒加载 // 当按钮被点击后才去加载 print.js 文件
    btn.onclick = e => import(/* webpackChunkName: "print" */ './print').then(module => {
        var printMe = module.default;

        printMe();
    });;
    element.appendChild(btn);

    element.appendChild(img);
    element.appendChild(text);

    printA('123121');

    console.log(square(2));

    let a = [1, 2, 3, 4].map((val) => val + 2);
    console.log(a);

    return element;
}

function printA(e) {
    let a = (e) => {
        console.log(e)
    }
    a(e)
}

document.getElementById('app').appendChild(getComponent());

// 动态导入
// getComponent().then(component => {
//     document.body.appendChild(component);
// });