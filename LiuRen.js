var chalk = require('chalk');
var LunarCalendar = require("lunar-calendar");

const sixDivision = [['大安', 1], ['留连', 2], ['速喜', 3], ['赤口', 4], ['小吉', 5], ['空亡', 6]];

function transSpecifiedDateToLunar(year, month, day, hour) {
  const lunarHour = transLunarHour(hour);
  if (lunarHour === null) {
     console.log('输入的时间有误');
    return {
      lunarYear: 0,
      lunarMonth: 0,
      lunarDay: 0,
      lunarHour: 0
    };
  }
  const {lunarMonth, lunarDay} = LunarCalendar.solarToLunar(year, month, hour);

  return {
    lunarYear: year,
    lunarMonth,
    lunarDay,
    lunarHour
  }
}

//获取当下农历时间 月、日、时辰
function getNowDateLuarNums() {
  const now = new Date();
  const yearNum = now.getFullYear();
  const monthNum = now.getMonth() + 1;
  const dateNum = now.getDate();
  const hourNum = now.getHours();

  return transSpecifiedDateToLunar(yearNum, monthNum, dateNum, hourNum);
}

function isRealNum(val){
  // isNaN()函数 把空串 空格 以及NUll 按照0来处理 所以先去除
  if(val === "" || val ==null){
      return false;
  }
  if(!isNaN(val)){
      return true;
  }else{
      return false;
  }
} 

//根据所给三个数字卜一挂小六壬
function fortuneTell(firstNum, secondNum, thirdNum) {
  const {
    lunarMonth,
    lunarDay,
    lunarHour
  } = getNowDateLuarNums();

  if (firstNum <= 0) {
    firstNum = lunarMonth
  }

  if (secondNum <= 0) {
    secondNum = lunarDay
  }

  if (thirdNum <= 0) {
    thirdNum = lunarHour
  }

  const firstIndex = (firstNum - 1) % 6;
  const firstResult = sixDivision[firstIndex];

  const secondIndex = (secondNum + firstIndex - 1) % 6;
  const secondResult = sixDivision[secondIndex];

  const thirdIndex = (thirdNum + secondIndex - 1) % 6;
  const thirdResult = sixDivision[thirdIndex];

  return {
    firstResult,
    secondResult,
    thirdResult
  }
}

//24小时制时辰转换
function transLunarHour(hourNum) {
  if ((hourNum >= 23 && hourNum < 24) || (hourNum >= 0 && hourNum < 1)) {
    return 1;//表示子时
  } else if(hourNum >= 1 && hourNum < 3) {
    return 2;//表示丑时
  } else if(hourNum >= 3 && hourNum < 5) {
    return 3;//表示寅时
  } else if(hourNum >= 5 && hourNum < 7) {
    return 4;//表示卯时
  } else if(hourNum >= 7 && hourNum < 9) {
    return 5;//表示辰时
  } else if(hourNum >= 9 && hourNum < 11) {
    return 6;//表示巳时
  } else if(hourNum >= 11 && hourNum < 13) {
    return 7;//表示午时
  } else if(hourNum >= 13 && hourNum < 15) {
    return 8;//表示未时
  } else if(hourNum >= 15 && hourNum < 17) {
    return 9;//表示申时
  } else if(hourNum >= 17 && hourNum < 19) {
    return 10;//表示酉时
  } else if(hourNum >= 19 && hourNum < 21) {
    return 11;//表示戌时
  } else if(hourNum >= 21 && hourNum < 23) {
    return 12;//表示亥时
  }

  return nul;
}

//根据当前时间卜一挂小六壬
function nowDateTell() {
  const {
    firstResult,
    secondResult,
    thirdResult
  } = fortuneTell(0, 0, 0);

  console.log(`${explicate(thirdResult)}`);  
}

function randomThreesTell(firstNum, secondNum, thirdNum) {
  if (!isRealNum(firstNum) || !isRealNum(secondNum) || !isRealNum(thirdNum)) {
    console.log('请输入数字！');
    return;
  }

  const {
    firstResult,
    secondResult,
    thirdResult
  } = fortuneTell(firstNum, secondNum, thirdNum);

  console.log(`[${firstResult[0]} -> ${secondResult[0]} -> ${thirdResult[0]}]`)

  console.log(`
  ${explicate(firstResult)}
  ${explicate(secondResult)}
  ${explicate(thirdResult)}
  `);
}

function futureDateTell(year, month, day, hour) {
  if (!isRealNum(year) && !isRealNum(month) && !isRealNum(day) && !isRealNum(hour)) {
    console.log('请输入数字！');
    return;
  }

  const nowDate = new Date();
  const futureDate = new Date(year, month, day);
  
  if (futureDate.getTime() < nowDate.getTime()) {
    console.log('时间输入不对，请输入将来的时间');
    return;
  }

  const {
    lunarMonth,
    lunarDay,
    lunarHour
  } = transSpecifiedDateToLunar(year, month, day, hour);

  const {
    firstResult,
    secondResult,
    thirdResult
  } = fortuneTell(lunarMonth, lunarDay, lunarHour);

  console.log(`${explicate(thirdResult)}`);  
}

function explicate(result) {
  if (result[1] === null || result[1] === undefined) {
    console.log('蛋疼，出错了');
    return;
  }
  switch (result[1]) {
    case 1:
      return `${chalk.bgMagenta('大安')}  大安事事昌，求财在坤方，失物去不远，宅舍保安康
      行人身未动，病者主无妨，将军回田野，仔细更推详`;
    case 2:
      return `${chalk.bgMagenta('留连')}  留连事难成，求谋日未明，官事凡宜缓，去者未回程
      失物南方见，急讨方心称，更须防口舌，人口且平平`;
    case 3:
      return `${chalk.bgMagenta('速喜')}  速喜喜来临，求财向南行，失物申未午，逢人路上寻
      官事有福德，病者无祸侵，田宅六畜吉，行人有信音`;
    case 4:
      return `${chalk.bgMagenta('赤口')}  赤口主口舌，官非切宜防，失物速速讨，行人有惊慌
      六畜多作怪，病者出西方，更须防咀咒，诚恐染瘟皇`;
    case 5:
      return `${chalk.bgMagenta('小吉')}  小吉最吉昌，路上好商量，阴人来报喜，失物在坤方
      行人即便至，交关甚是强，凡事皆和合，病者叩穷苍`;
    case 6:
      return `${chalk.bgMagenta('空亡')}  空亡事不祥，阴人多乖张，求财无利益，行人有灾殃
      失物寻一见，官事有刑伤，病人逢暗鬼，解禳保安康`;
    default: 
      return null;
  }
}

var LiuRen = {
  randomThreesTell: randomThreesTell,
  futureDateTell: futureDateTell,  
  nowDateTell: nowDateTell
}

module.exports = LiuRen;
