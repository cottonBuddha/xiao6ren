#! /usr/bin/env node

var LiuRen = require('./LiuRen');
var chalk = require('chalk');

const count = process.argv.length;

if (count < 3) {    
    LiuRen.nowDateTell();
} else if (count >= 3) {
    const argsCount = count - 2;
    const argsArr = [];
    for (var i = 0; i < argsCount; i++) {
        argsArr.push(process.argv[i + 2]);
    }
    if (argsCount === 1 && argsArr[0] === 'now') {        
        LiuRen.nowDateTell();
    } else if (argsCount === 1 && argsArr[0] === '-h') {
        console.log(`
            有个小伙伴，有天神秘兮兮说能帮我预测吉凶，让我随意说三个数字，
            还说很准，她平时遇到事情也常常来一发。于是我便认识了小六壬。haha。

            使用说明：本小六壬提供三种方式占卜。
            1）不接参数按现在的时间起卜。
            2）输入未来的年、月、日、时（公历），如 x6r 2018 4 15 2。
            3）自己随意给出三个数字，如 x6r 10 2 3。
        `);
        
    } else if (argsCount === 3) {
        const result = LiuRen.randomThreesTell(argsArr[0], argsArr[1], argsArr[2]);  
    } else if (argsCount === 4) {
        const result = LiuRen.futureDateTell(argsArr[0], argsArr[1], argsArr[2], argsArr[3]);  
    } else {
        console.log('参数有误，请参考使用说明');
    }
}
