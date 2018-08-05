
 'use strict'                            //严格模式

function getByClass(sClass,oParent)            //兼容ie6 的getElementsByTagName ..多class 
{  
     var oParent= oParent || document; 
     var name=oParent.getElementsByTagName('*');
     var aEle = name;
     var aResult=[];
     var re=new RegExp('\\b'+sClass+'\\b', 'i');
     var i=0;

     for(i=0;i<aEle.length;i++)
     {
      //if(aEle[i].className==sClass)
      //if(aEle[i].className.search(sClass)!=-1)
      if(re.test(aEle[i].className))
      {
       aResult.push(aEle[i]);
      }
     }
     name = null;
     return aResult;
}
//禁止
function event_rf(ev){
    var e = ev || window.event;
    var keyCode = e.keyCode || e.which || e.charCode;
    var ctrlKey = e.ctrlKey || e.metaKey;

    //var body = document.getElementsByTagName('body')[0];
    // if(ctrlKey && keyCode == 38) {
    //     body.className = ''
    //     return false;
    // } 
    // if(ctrlKey && keyCode == 40) {
    //     body.className = 'body_black'
    //     return false;
    // } 
    if(ctrlKey && keyCode == 83) {
        // body.className = 'body_black'
        return false;
    } 
    if(keyCode == 123) {
        // body.className = 'body_black'
        return false;
    } 
}
document.onkeydown = event_rf
getByClass('xy')[0].oncontextmenu = function(tf){
    document.onkeydown = document.oncontextmenu = null
    console.log("%c"+"宾果！控制解禁~",'background-image:-webkit-gradient( linear, left top, right top, color-stop(0, #0ff), color-stop(0.15, #f2f), color-stop(0.3, #22f), color-stop(0.45, #2ff), color-stop(0.6, #2f2),color-stop(0.75, #2f2), color-stop(0.9, #f21) );color:transparent;-webkit-background-clip: text;font-size:1em;')
    stopEvent(tf);
}
document.oncontextmenu = function(){
        return false;
}
for (var i = 2333; i >= 0; i--) {
    debugger;
}

//禁止
//
//
//
//getByClass(oBut,'mark_right')[0];
var bann = getByClass('banner')[0],
    txt = getByClass('Tsou',bann)[0],       
    oUl = getByClass('textnone',bann)[0],
    // var oUl = document.getElementById('textnone');
    log = getByClass('logo',bann)[0],
    ti = getByClass('T',bann)[0],           //相机
    // Div1 =getByClass(bann,'div1')[0],       //搜索大框
    Bxy = document.getElementById('bxy'),   //二维码
    oWeather = document.getElementById('weather'),//预警
    // now = -1,
    google = false,
    // timer = null,//延迟器的stop时间
    //以上 是百度api     以下是天气预报api
    //
    oDiv = getByClass('topL')[0],      //四月草
    oSpan = oDiv.getElementsByTagName('span'),  

    day = 0;                             //今天
//end~~

var zhh ={};

zhh.ipone = (navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))

if(navigator.userAgent.match(/(phone|pod|iPhone|ios|Android|BlackBerry|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)){
    log.src = 'https://m.baidu.com/static/index/plus/plus_logo.png'
}else{
    log.src = 'https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/bd_logo1_31bdc765.png';
}
//命名空间
//ie 文本框内容 缓存清除
 zhh.two = function(data){     //搜索切换
    var bf =(zhh.ipone)?"_self":"_bank";
    if (!google) {
        window.open("https://www.baidu.com/s?wd=" + data,bf)
    } else {
        window.open("https://www.google.com.hk/search?q=" + data,bf)
    }
}
// function on(e,fn){
//     if (window.attachEvent) { 
//       return  window.attachEvent('on'+e, fn); 
//     } else if (window.addEventListener) { 
//       return  window.addEventListener(e, fn, false);   
//     }     
// }
zhh.getLi = function(da){     //li 鼠标效果  键盘效果   
//     if(da.length > 0){
        var Li = bann.getElementsByTagName('li');
        var oLi = Li; 
        var now = -1;
        for(var j=0;j<oLi.length;j++)
        {
            oLi[j].index = j; 
            oLi[j].onclick = function ()
            {   
                zhh.two(da[this.index])  
                txt.value=da[this.index];
                oUl.style.display="none";
            };
            oLi[j].onmouseover = function ()
            {
                for (var t = 0;t<oLi.length;t++)
                {
                    oLi[t].className='';
                }
                oLi[this.index].className='active';
                now = this.index;
            };
        }  
        // addEvent(document,'keydown',li_down)
        document.onkeydown = function (ev)
        {   

            var event = ev || window.event;
            var keyCode = event.keyCode || event.which || event.charCode;
            var ctrlKey = event.ctrlKey || event.metaKey;

            if(ctrlKey && keyCode == 83) {
                // body.className = 'body_black'
                return false;
            } 
            if(keyCode == 123) {
                // body.className = 'body_black'
                return false;
            } 
            for (var t = 0;t<da.length;t++)
            {
                oLi[t].className='';
            } 
            if(event.keyCode==38)
            {
                now--;
                if(now==-1 || now==-2) now = da.length-1;
                oLi[now].className='active';
                txt.value = da[now];
                return false;
            }
            if(event.keyCode==40)
            {
                now++;
                if(now>da.length-1) now=0;
                oLi[now].className='active';
                txt.value = da[now];
                return false;
            }
            if(event.keyCode==13)
            {
                if(txt.value==''){
                    window.open(document.URL);
                }
                else
                {
                    zhh.two(txt.value)
                    oUl.style.display='';
                }
            }
            // if(event.keyCode==38 || event.keyCode==40){return false};  
        };
        Li = null;
//     }
}

//阻止冒泡事件
function stopEvent(event){ 
  if(event && event.stopPropagation)
    {
     event.stopPropagation();
    }
    else if(window.event)
    {
    window.event.cancelBubble = true;
    }
}

//事件监听的兼容性写法
function addEvent(element, eType, handle, bol) {
    if(element.addEventListener){           //如果支持addEventListener
        bol = bol || 'false';
        element.addEventListener(eType, handle, bol);
    }else {          //如果支持attachEvent
        element.attachEvent("on"+eType, handle);
    }
}
// 事件解绑
function removeEvent(element, eType, handle, bol) {
    if(element.addEventListener){
        bol = bol || 'false';
        element.removeEventListener(eType, handle, bol);
    }else{
        element.detachEvent("on"+eType, handle);
    }
}
//搜索辅助
zhh.prompt = function (ev)     
{   
    var event = ev||window.event ;
    if(event.keyCode==38 || event.keyCode==40){return false};
    var oScript = document.createElement("script");//动态创建script标签  
    oScript.src="https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd="+txt.value+"&cb=callback";  
    //添加链接及回调函数  
    document.body.appendChild(oScript);//添加script标签  
    document.body.removeChild(oScript);//删除script标签  
}  
//回调函数  
function callback(data){
    var str='' , html_i='';
    var Data = data.s;
    if(zhh.ipone || Bxy.offsetWidth < 768) {
        Data.length = Math.min(6,Data.length)
        html_i = "<i></i>"
    }else{
        Data.length = Math.min(9,Data.length)
    }
    oUl.style.display=(Data.length==0)?'none':'block';
    if(Data.length > 0){
        str="<li><strong>翻译  </strong><a class='none_txt'></a>"+html_i+"</li>";
        for(var i=0;i<Data.length;i++)
        {  
            str += "<li><a class='none_txt'></a>"+html_i+"</li>"
        }  
        oUl.innerHTML=str;
        for(var j=0;j<Data.length + 1;j++)
        {  
            if(j === 0){
                getByClass('none_txt')[j].innerText = txt.value;
            }else{
                getByClass('none_txt')[j].innerText = Data[j - 1];
            }
        }  
        Data.unshift('翻译  ' + txt.value)
        zhh.getLi(Data);
    }else{
    	oUl.innerHTML=null;
    }
}
txt.onkeyup = zhh.prompt;

//空值搜索页面  原地蹦达
var oBtn = getByClass("Bsou")[0];
    oBtn.onclick = function ()
    {    
        if(txt.value=='')
        { 
            var bf =(zhh.ipone)?"_self":"_bank";
                window.open(document.URL,bf);
            }else
            {   
                zhh.two(txt.value) 
            }
    };

zhh.New = function (){//最新新闻
  var nScr  = document.createElement('script');
  //https://s.weibo.com/ajax/jsonp/gettopsug?uid=&ref=PC_topsug&url=https%3A%2F%2Fs.weibo.com%2Ftop%2Fsummary%3Fcate%3Drealtimehot&Mozilla=Mozilla%2F5.0%20(Windows%20NT%206.1%3B%20WOW64)%20AppleWebKit%2F537.36%20(KHTML%2C%20like%20Gecko)%20Chrome%2F63.0.3239.132%20Safari%2F537.36&_cb=STK_15327407065793

  // nScr.src = "https://s.weibo.com/ajax/jsonp/suggestion?Refer=sina_sug&&_t1502449406497_79521732&_cb=ncb"; //新闻
  nScr.src = "https://s.weibo.com/ajax/jsonp/gettopsug?uid=&ref=PC_topsug&url=https%3A%2F%2Fs.weibo.com%2Ftop%2Fsummary%3Fcate%3Drealtimehot&Mozilla=Mozilla%2F5.0%20(Windows%20NT%206.1%3B%20WOW64)%20AppleWebKit%2F537.36%20(KHTML%2C%20like%20Gecko)%20Chrome%2F63.0.3239.132%20Safari%2F537.36&_cb=ncb"; //新闻
  document.body.appendChild(nScr);
  if(!!-[1,]){      //不是ie678 时
    document.body.removeChild(nScr);
  }
}
function ncb(data){ 
    var str ='',
        arr =[],
        ina ='',
        nData = data.data.list;
//         console.log(data.data)
    oUl.style.display=(nData.length==0)?'none':'block';
    if(nData.length>0){
        for(var i=0,len = nData.length; i<len ;i++){   
            if(i===1){
                ina="none";
            }else if(i===2){
                ina="ntwo";
            }else if(i===3){
                ina="nthree";
            }                         
            str += "<li><a class='none_new'></a><i "+ina+"></i></li>"    
        }
        oUl.innerHTML=str;
        //top
        str = data.data.top.word;
        str = str.replace(/#+/g,'');
        getByClass('none_new')[0].innerText = str; 
        arr.push(str)

        for(var j=0;j<nData.length-1;j++)
        {  
            getByClass('none_new')[j+1].innerText = nData[j].note;
            arr.push(nData[j].note)
        }  
        zhh.getLi(arr);
    }
}

//操作
txt.onmousedown = function(tf){//ul
    var uf = oUl.children[0];                  //ul下的li 是否生成 
        if(!-[1,] && this.value=='' || !uf){    //ie7 以下兼容
            oUl.style.display='none';          //ie6的ul空白长度
        }else{
            oUl.style.display='block';
        }
        if(this.value==''){
            if(!zhh.ipone)
            zhh.New();
        };
    stopEvent(tf);                              //阻止 冒泡   
}
document.onmousedown = ul_none;
function ul_none(){//隐藏ul
    oUl.style.display='none';
  // removeEvent(document,'keydown')
}


//天气预报
zhh.city =function (){
  var go  = document.createElement('script');
  go.src = "https://api.asilu.com/geo/?callback=ip_go"; 
  document.body.appendChild(go);
  //document.body.removeChild(go);
}
function ip_go(data){
  var ct = data.address;
  var reg = /(.*?省)(.*?市)(.*?区)|(.*?县)/;  
  ct = ct.match(reg)
  if(ct.length < 1){
     var ct = '郑州';
     console.log("%c"+"你的API又双叒叕塴了~~  IP定位失败: 默认郑州",'background-image:-webkit-gradient( linear, left top, right top, color-stop(0, #0ff), color-stop(0.15, #f2f), color-stop(0.3, #22f), color-stop(0.45, #2ff), color-stop(0.6, #2f2),color-stop(0.75, #2f2), color-stop(0.9, #f21) );color:transparent;-webkit-background-clip: text;font-size:1em;');
  }else if(typeof ct == 'object'){
      for (var i = ct.length - 1; i >= 0; i--) {
          if(ct[i] != undefined && ct[i] != ''){
            ct = ct[i];
            break;
          }
      }
      console.log("%c"+"IP定位:   "+ct,'background-image:-webkit-gradient( linear, left top, right top, color-stop(0, #0ff), color-stop(0.15, #f2f), color-stop(0.3, #22f), color-stop(0.45, #2ff), color-stop(0.6, #2f2),color-stop(0.75, #2f2), color-stop(0.9, #f21) );color:transparent;-webkit-background-clip: text;font-size:1em;');
  }
  var dScr  = document.createElement('script');
  dScr.src = "http://wthrcdn.etouch.cn/weather_mini?city="+ct+"&callback=dcb"; 
  document.body.appendChild(dScr);
  // document.body.removeChild(dScr);
}

function dcb(data){
    var City = data.data.city,          //地区
        WenD = data.data.wendu,         //现在的温度
        GanM = data.data.ganmao,        //感冒发生率  
        Str = data.data.forecast[day],
        re = /(\d)?[-<>]+(\d+)\级/g ,             
        ydata = [City, Str.type, Str.low, Str.high, Str.fengxiang ,Str.fengli]; //6个属性


        var date = new Date();
        var month = date.getMonth()+1+'月';
        console.log("%c"+month+Str.date+"     现在的温度:"+WenD+"℃"+"     温馨提示:"+GanM,'background-image:-webkit-gradient( linear, left top, right top, color-stop(0, #0ff), color-stop(0.15, #f2f), color-stop(0.3, #22f), color-stop(0.45, #2ff), color-stop(0.6, #2f2),color-stop(0.75, #2f2), color-stop(0.9, #f21) );color:transparent;-webkit-background-clip: text;font-size:1em;');//控制台提示
        
        var ty = '';
        if(ydata[1].indexOf("雨") > -1){
            ty += 'rain '
        }else if(ydata[1].indexOf("雪") > -1){
            ty += 'snow '
        }
        if(ydata[1].indexOf("小") > -1){
            ty += 'degree_a'
        }else if(ydata[1].indexOf("中") > -1){
            ty += 'degree_b'
        }else if(ydata[1].indexOf("大") > -1){
            ty += 'degree_c'
        }
        oWeather.className = ty
    //日期      date
    //最高温度  high
    //风级      fengli  
    //风向      fengxiang
    //最低温度  low
    //天气情况  type
    for(var i=0; i<ydata.length; i++){                         //将6个属性们打印到html中
      oSpan[i].innerHTML=ydata[i];
      if(ydata[i]==Str.low){
        oSpan[i].innerText=ydata[i].replace(/低温/, "");
      }
      if(ydata[i]==Str.high){
        oSpan[i].innerText=ydata[i].replace(/高温/, "~");
      }  
      if(ydata[i]==Str.fengli){
        oSpan[i].innerText=ydata[i].match(re);
      }                                    
    }
}

function getPos(){
    var offw = document.documentElement.offsetWidth || document.body.offsetWidth;//被卷去的高度
    // var clientHeight = document.documentElement.clientHeight ||document.body.clientHeight ;//可视区的高度
    return offw;
}
function bimg(){
    if(getPos() < 768){
        log.src = 'https://m.baidu.com/static/index/plus/plus_logo.png';
    }else{
        log.src = 'https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/bd_logo1_31bdc765.png';
    }
}
// bimg();
//二维码 四叶草 ~判断
function Bot(){
    var BxyChild = Bxy.children,
        Boff = document.documentElement.clientHeight ||document.body.clientHeight,
        Woff = Bxy.offsetWidth;
    // var real = (Boff>401 && Woff>1121)?'block':'none';
    var real = (Boff>555 && Woff>1111)?'block':'none';
    var arr = [BxyChild[0] , BxyChild[1] ,oDiv, oWeather]
    for(var i= 0;i<arr.length;i++){
          arr[i].style.display=real;
    }
}   
// Bot();

//窗口变化时
addEvent(window,'resize',function(){
    clearTimeout(window.timer);
    window.timer = setTimeout(function(){
        Bot();
        bimg();
    },100);
})

ti.onclick = function(tf){//相机
    google =! google;
    this.children[0]['className']=google?'ti':'';             //相机  点中  问题
    stopEvent(tf);
}

oUl.onmousedown=function(tf){stopEvent(tf);return false}    //防止选中li中文字


window.onload = function(){                     //ie 判断
    // zhh.New();                               //新闻 预加载
    zhh.city(); 
    if(!!window.ActiveXObject || "ActiveXObject" in window || navigator.userAgent.indexOf("Edge") > -1)
    {     
        txt.value=''; 
        txt.onfocus = function(){
            this.style.borderColor= '#4791ff';  
        }
        txt.onblur = function(){
            this.style.borderColor = '';    
        }
        
        zhh.prompt();                     //ie 预加载
        //New();                          //新闻 预加载
        console.log('拒绝ie从我做起');
       // if(!-[1,])
        //{
            //var body = getByClass('body')[0];
            //body.setAttribute('scroll','no');
       // }
    }
    else
    {   
        // zhh.city();                     //编码失败  取消天气预报
        if(window.POWERMODE){
            POWERMODE.colorful = true;
            POWERMODE.shake = true;
            document.body.addEventListener('input', POWERMODE);
        }
        document.addEventListener('visibilitychange',function(){ //title提示
            document.title = document.hidden ? '众里寻她千百度,蓦然回首' : '那人却在灯火阑珊处';
            if(!document.hidden){
                clearTimeout(this.timer);
                this.timer = setTimeout(function (){
                    if(!document.hidden)document.title = '百度一下,你就知道';
                },2000)
            }
        })                                      

    }
    if(zhh.ipone)
        {   
            Bxy.style.display='none';
            oDiv.style.display='none';
        }
        else
        {
            Bot();
        }
};


// var body = document.getElementsByTagName('body')[0];
// document.onkeydown = function(ev){
//     var e = ev || window.event;
//     var keyCode = e.keyCode || e.which || e.charCode;
//     var ctrlKey = e.ctrlKey || e.metaKey;
//     if(ctrlKey && keyCode == 38) {
//         body.className = ''
//         return false;
//     } 
//     if(ctrlKey && keyCode == 40) {
//         body.className = 'body_black'
//         return false;
//     } 
// }

// document.oncontextmenu= function(){
//         return false;
// }
// for (var i = 2333; i >= 0; i--) {
//     debugger;
// }
