//config
var CONFIG = {
  label: [
    0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0,
    0, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 0, 1,
    0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0,
    0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
    0, 0, 1, 1, 0, 1, 0, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0,
    1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0,
    0, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1,
    0, 0, 1, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0,
    0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1,
    0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1,
    0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0,
    1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0,
    1, 0, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1,
    0, 0, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1,
    1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1,
  ],
  URL: "./",
  time: 30, //30对应指针运动3s
  middleText: "",
  leftText: "左手",
  rightText: "右手",
  leftLabel: 0,
  rightLabel: 1,
  restLabel: 2,
};
let conutTime = +new Date();
trail = a = b = c = d = s = tf = j = jx = 0;
var qd = 240;
var i = 1;
var t = 0;
global = {
  a: 240,
  b: 240,
  c: 240,
  f1: 0,
  f2: 0,
  f3: 0,
  flag1: 0,
  flag2: 0,
  flag3: 0,
};
p = 0.001;
trialtime = 5.5;
var globalo = {
  s1: 0,
  s2: 0,
  s3: 0,
  s4: 0,
};
number = 1;
ScaleMinValue = 120;
ScaleMaxValue = 360;
//必须两行
refresh(0, 0, 0, 0, "", "", "", "", 240);
refresh(0, 0, 0, 0, "", "", "", "", 240);
//测试函数
async function test() {
  start();
  for (let i = 0; i < 99; i++) {
    setTimeout(() => {
      change(randomArr(6, -1, 1));
      let now = +new Date();
      console.log(now - conutTime);
      conutTime = now;
    }, i * 5500);
  }
}
//websocket
function webSocket() {
  var ws = io("/res");
  //#region 创建WebSocket连接
  // ws.onopen = function () {
  //   //当WebSocket创建成功时，触发onopen事件
  //   console.log("open");
  //   ws.send("hello"); //将消息发送到服务端
  // };
  //#endregion
  ws.on("my_response", function (msg, cb) {
    //当客户端收到服务端发来的消息时，触发onmessage事件，参数e.data包含server传递过来的数据
    var data = msg.data.predict;
    data.push(Config.label[trail]);
    console.log(data);
    if (Array.isArray(data)) {
      change(data);
    }
  });
  ws.emit("startexperiment");
  start();
  //#region error close回调
  // ws.onclose = function (e) {
  //   //当客户端收到服务端发送的关闭连接请求时，触发onclose事件
  //   console.log("close");
  //   end();
  // };
  // ws.onerror = function (e) {
  //   //如果出现连接、处理、接收、发送数据失败的时候触发onerror事件
  //   console.log(error);
  //   end();
  // };
  //#endregion
}
//持续读取xls的定时器
function change(arr) {
  trail++;
  jx = 0;
  fd = 0;
  global = {
    a: 240,
    b: 240,
    c: 240,
    f1: 0,
    f2: 0,
    f3: 0,
    flag1: 0,
    flag2: 0,
    flag3: 0,
  };
  cal2(arr);
}
function start() {
  if (document.getElementById("button1").innerText == "暂停") {
    // window.clearInterval(b);
    // window.clearInterval(c);
    document.getElementById("button1").innerText = "等待停止";
    document.getElementById("button1").disabled = "disabled";
    jx = 1;
    return 0;
  }
  if (
    document.getElementById("button1").innerText == "开始!" ||
    document.getElementById("button1").innerText == "继续"
  ) {
    document.getElementById("button2").style.display = "none";
    document.getElementById("button1").innerText = "暂停";
    fd = 0;
  }
}

/* function refreshall() {
  document.getElementById("resText").style.paddingLeft = "2%";
  document.getElementById("resText").innerHTML = "多人混合脑机接口";
  document.getElementById("button2").style.display = "none";
  qd = 240;
  i = 1;
  p = 0.001;
  trialtime = 5.5;
  j = 0;
  globalo = {
    s1: 0,
    s2: 0,
    s3: 0,
    s4: 0,
  };
  number = 1;
  ScaleMinValue = 120;
  ScaleMaxValue = 360;
  //必须两行
  refresh(0, 0, 0, 0, "", "", "", "", 240);
} */

async function cal2(arr) {
  console.log(arr);
  //判断三个框是否执行完毕
  if (
    global["flag1"] + global["flag2"] + global["flag3"] + global["flag4"] ==
    4
  ) {
    return 0;
  }
  [label1, label2, label3, label4, label] = arr;
  //显示当前任务
  document.getElementById("resText").style.paddingLeft = "5%";
  if (label == CONFIG.rightLabel) {
    document.getElementById("resText").innerHTML =
      "  Trial  " + i + "   想像:向右";
  } else if (label == CONFIG.restLabel) {
    document.getElementById("resText").innerHTML =
      "  Trial  " + i + "   想像:空闲";
  } else {
    document.getElementById("resText").innerHTML =
      "  Trial  " + i + "   想像:向左";
  }
  //设定速度
  function speed(label) {
    if (label == CONFIG.restLabel) {
      num = randomArr(trialtime / p, -5500 * p, 4500 * p);
    } else if (label == CONFIG.rightLabel) {
      num = randomArr(trialtime / p, 6000 * p, 8000 * p);
    } else {
      num = randomArr(trialtime / p, -9000 * p, -6000 * p);
    }
    return num;
  }
  function speed2(label) {
    if (label == CONFIG.restLabel) {
      num = randomArr(CONFIG.time + 1, -5000 * p, 4000 * p);
    } else if (label == CONFIG.rightLabel) {
      num = randomArr(CONFIG.time + 1, 5000 * p, 10000 * p);
    } else {
      num = randomArr(CONFIG.time + 1, -11000 * p, -5000 * p);
    }
    return num;
  }
  num1 = speed(label1);
  num2 = speed(label2);
  num3 = speed(label3);
  num4 = speed2(label4);
  // 运动中
  function animal(a, num, canvas, s1, ngn) {
    global[a] = global[a] + num[s];
    canvasScore(
      canvas,
      globalo[s1],
      (globalo[s1] / j).toFixed(2),
      global[a],
      ngn + "：判断中"
    );
  }
  async function pdzy(a, flag, f1, canvas, s1, ngn) {
    if (global[a] >= ScaleMaxValue) {
      global[a] = global[a] + 500;
      global[flag] = 1;
      //终止定时器
      canvasScore(canvas, globalo[s1], "t", ScaleMaxValue, ngn + "：判断中");
      if (parseInt(label) == CONFIG.rightLabel) {
        global[f1] = 1;
        canvasScore(canvas, globalo[s1], "t", ScaleMaxValue, ngn + "：正确");
      } else {
        canvasScore(canvas, globalo[s1], "t", ScaleMaxValue, ngn + "：错误");
      }
    }
    if (global[a] <= ScaleMinValue) {
      global[a] = global[a] - 500;
      global[flag] = 1;
      //终止定时器
      canvasScore(canvas, globalo[s1], "t", ScaleMinValue, ngn + "：判断中");
      if (parseInt(label) == CONFIG.leftLabel) {
        global[f1] = 1;
        canvasScore(canvas, globalo[s1], "t", ScaleMinValue, ngn + "：正确");
      } else {
        canvasScore(canvas, globalo[s1], "t", ScaleMinValue, ngn + "：错误");
      }
    }
  }
  var s = 0;
  function changePoint() {
    animal("a", speed(label1), "Canvas01", "s1", "单脑A");
    animal("b", num2, "Canvas02", "s2", "单脑B");
    animal("c", num3, "Canvas03", "s3", "单脑C");
    animal("c", num4, "Canvas04", "s4", "多脑");
    pdzy("a", "flag1", "f1", "Canvas01", "s1", "单脑A");
    pdzy("b", "flag2", "f2", "Canvas02", "s2", "单脑B");
    pdzy("c", "flag3", "f3", "Canvas03", "s3", "单脑C");
    pdzy("c", "flag4", "f4", "Canvas04", "s4", "多脑");
    // console.log(time)
    if (s >= CONFIG.time) {
      clearInterval(pointInterval);
      cal3();
      // console.timeEnd("time");
    } else {
      s++;
    }
  }
  // console.time("time");
  var pointInterval = setInterval(changePoint, 100);
}

async function cal3() {
  async function pdkx(flag, f, canvas, s, ngn) {
    if (global[flag] == 0) {
      if (parseInt(label) == CONFIG.restLabel) {
        global[f] = 1;
        canvasScore(canvas, globalo[s], "t", 240, ngn + "：正确");
      } else {
        canvasScore(canvas, globalo[s], "t", 240, ngn + "：错误");
      }
    }
  }
  pdkx("flag1", "f1", "Canvas01", "s1", "单脑A");
  pdkx("flag2", "f2", "Canvas02", "s2", "单脑B");
  pdkx("flag3", "f3", "Canvas03", "s3", "单脑C");
  pdkx("flag4", "f4", "Canvas04", "s4", "多脑");

  if (global["f1"] == 1) {
    globalo["s1"] = globalo["s1"] + 1;
  }
  if (global["f2"] == 1) {
    globalo["s2"] = globalo["s2"] + 1;
  }
  if (global["f3"] == 1) {
    globalo["s3"] = globalo["s3"] + 1;
  }
  if (global["f4"] == 1) {
    globalo["s4"] = globalo["s4"] + 1;
  }
  global["f1"] = 0;
  global["f2"] = 0;
  global["f3"] = 0;
  global["f4"] = 0;
  j = j + number;
  await sleep(400);
  refresh(
    globalo["s1"],
    globalo["s2"],
    globalo["s3"],
    globalo["s4"],
    (globalo["s1"] / j).toFixed(2),
    (globalo["s2"] / j).toFixed(2),
    (globalo["s3"] / j).toFixed(2),
    (globalo["s4"] / j).toFixed(2),
    240
  );
  global = {
    a: 240,
    b: 240,
    c: 240,
    f1: 0,
    f2: 0,
    f3: 0,
    flag1: 0,
    flag2: 0,
    flag3: 0,
  };
  await sleep(400);
  if (document.getElementById("button1").innerText == "等待停止") {
    document.getElementById("button1").innerText = "继续";
    document.getElementById("button1").disabled = "";
    document.getElementById("button2").style.display = "block";
  }
  i = i + 1;
  // temp = trail;
}

//取数组内一排
function getarr(data, min, max) {
  var arr = [];
  for (var d = min; d <= max; d++) {
    arr.push(data[d]);
  }
  return arr;
}
//三个数取最大数
function getMaxValue(num1, num2, num3) {
  var maxValue = num1;
  if (num1 < num2) {
    maxValue = num2;
  }
  if (num2 < num3) {
    maxValue = num3;
  }
  return maxValue;
}
//生成从minNum到maxNum的随机数
function randomNum(minNum, maxNum) {
  switch (arguments.length) {
    case 1:
      return parseInt(Math.random() * minNum + 1, 10);
      break;
    case 2:
      return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
      break;
    default:
      return 0;
      break;
  }
}
//生成随机数组
function randomArr(len, min, max) {
  var hash = [];

  while (hash.length < len) {
    var num = randomNum(min, max);
    //这个if是为了不生成重复数字
    // if(hash.indexOf(num)==-1){
    hash.push(num);
    // }
  }
  return hash;
}
//暂停函数
function sleep(millisecond) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, millisecond);
  });
}

// };
function refresh(data1, data2, data3, data4, zql1, zql2, zql3, zql4, mathVal) {
  canvasScore("Canvas01", data1, zql1, mathVal, "单脑A");
  canvasScore("Canvas02", data2, zql2, mathVal, "单脑B");
  canvasScore("Canvas03", data3, zql3, mathVal, "单脑C");
  canvasScore("Canvas04", data4, zql4, mathVal, "三脑");
}
//第一个参数为 ID选择器
//第二个参数为传入的分数值
//第三个参数为获取的时间
function canvasScore(id, getScore, creditTxt, mathVal, getTime) {
  //初始化-预定义
  var ele = document.getElementById(id);
  ctx = ele.getContext("2d");
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, 430, 600);
  colTxt = colLig = colBg = "#fff";
  mathVal = parseInt(mathVal);
  if (mathVal < 120) {
    mathVal = 120;
  }
  if (mathVal > 360) {
    mathVal = 360;
  }
  creditTxt = creditTxt.toString();

  // creditTxt = (mathVal = "");
  //根据分类来确定每一个需要的颜色、文字和位置
  //其实位置阶梯过度值(mathVal)：120--168--216--264--312--360间隔48,将分比例计算出来需要当前分类的位置（各个阶段值总分差不一样需要注意）
  //120为最左,360为最右
  // if(id=='Canvas002'){
  //     colTxt = "#fd3232";
  //     colLig = "#ffa5a5";
  //     colBg = "#ffa5a5";
  //     creditTxt = "较差";
  //     mathVal = 120 + (getScore-350)/200*48;
  // }else
  if (id == "Canvas01") {
    colTxt = "#fd7a32";
    colLig = "#ffc2a0";
    colBg = "#ffc2a0";
    // creditTxt = "中等";
    // mathVal = 168 + ((getScore - 550) / 50) * 48;
  } else if (id == "Canvas02") {
    colTxt = "#00c44e";
    colLig = "#5af698";
    colBg = "#5af698";
    // creditTxt = "良好";
    // mathVal = 216 + ((getScore - 600) / 50) * 48;
  } else if (id == "Canvas03") {
    colTxt = "#00dedb";
    colLig = "#9bf4f3";
    colBg = "#9bf4f3";
    // creditTxt = "优秀";
    // mathVal = 264 + ((getScore - 650) / 50) * 48;
  }
  // else if(id=='Canvas034'){
  //     colTxt = "#3297fd";
  //     colLig = "#81bfff";
  //     colBg = "#a8d3ff";
  //     creditTxt = "极好";
  //     mathVal = 312 + (getScore-700)/250*48;
  // }else{
  //     console.log('分数不在正常范围内');
  // }

  //画外环
  ctx.beginPath();
  ctx.lineCap = "round";
  ctx.lineWidth = 4;
  ctx.arc(200, 400, 150, 0.84 * Math.PI, 0.16 * Math.PI);
  ctx.strokeStyle = colBg;
  ctx.stroke();
  //画内环

  ctx.save();
  ctx.beginPath();
  ctx.globalAlpha = "0.7";
  ctx.lineCap = "round";
  ctx.lineWidth = 14;
  ctx.arc(200, 400, 130, 0.835 * Math.PI, 0.165 * Math.PI, false);
  ctx.stroke();

  ctx.restore();

  //文字-刻度-line
  ctx.strokeStyle = colTxt;
  ctx.globalAlpha = "0.9";
  ctx.lineWidth = 4;
  ctx.beginPath();
  hd = (Math.PI * (240 - mathVal)) / 180;
  ctx.moveTo(200 - 150 * Math.sin(hd), 400 - 150 * Math.cos(hd));
  ctx.lineTo(200, 400);
  //圆心
  // ctx.lineTo(140,35);
  // ctx.moveTo(310,35);
  // ctx.lineTo(200,400);
  // ctx.lineTo(425,160);
  ctx.stroke();
  //文字-信用度
  ctx.globalAlpha = "1";
  ctx.textAlign = "center";
  ctx.font = "500 34px microsoft yahei";
  ctx.fillStyle = colTxt;
  if (creditTxt == "") {
    ctx.fillText("未开始", 200, 314 - 225 + 400);
  } else if (creditTxt == "NaN") {
    ctx.fillText("开始!", 200, 314 - 225 + 400);
  } else if (creditTxt == "t") {
    ctx.fillText("统计中", 200, 314 - 225 + 400);
  } else {
    ctx.fillText("正确率: " + creditTxt, 200, 314 - 225 + 400);
  }

  //文字-正确个数
  ctx.font = "500 80px microsoft yahei";
  ctx.fillText(getScore, 200, -256 + 225 + 400);
  ctx.fillStyle = colTxt;
  //文字-查询时间

  ctx.font = "200 35px microsoft yahei";
  ctx.fillStyle = colLig;
  ctx.fillText(getTime, 200, 370 - 225 + 400);
  //文字-beta
  ctx.font = "500 20px microsoft yahei";
  ctx.fillText("正确 个数", 200, 150 - 225 + 400);

  //文字-刻度
  ctx.font = "400 16px microsoft yahei";
  ctx.translate(200, 400);
  ctx.textBaseline = "top";

  //加入阴影
  ctx.shadowColor = "rgba(0, 0, 0, 0.2)";
  // 将阴影向右移动15px，向上移动10px
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 2;
  // 轻微模糊阴影
  ctx.shadowBlur = 2;

  var gradText = [
    "",
    CONFIG.leftText,
    " ",
    " ",
    " ",
    CONFIG.middleText,
    " ",
    " ",
    " ",
    CONFIG.rightText,
    "",
  ];
  for (var i = 0; i < gradText.length; i++) {
    //第一次旋转值是绝对位置(相较原始顶点位置)，第二次旋转相对位置(相较上一次)
    if (i == 0) {
      ctx.rotate((240 * Math.PI) / 180);
    } else {
      ctx.rotate((24 * Math.PI) / 180);
    }
    //判断奇偶数，颜色有区别
    if (i % 2 == 0) {
      ctx.fillStyle = colTxt;
    } else {
      ctx.fillStyle = colLig;
    }
    //进行填值 半径185
    ctx.fillText(gradText[i], 0, -116);
  }

  //圆点
  ctx.beginPath();
  ctx.fillStyle = colTxt;
  ctx.shadowBlur = 7;
  ctx.shadowColor = colTxt;
  ctx.rotate((mathVal * Math.PI) / 180);
  ctx.arc(0, -150, 4.5, 0, 2 * Math.PI);
  ctx.fill();

  ctx.beginPath();
  ctx.fillStyle = "colLig";
  ctx.shadowBlur = 5;
  ctx.shadowColor = colTxt;
  ctx.shadowColor = "black";
  ctx.arc(0, 0, 4, 0, 2 * Math.PI);
  ctx.fill();
}
