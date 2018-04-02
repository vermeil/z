
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



//getByClass(oBut,'mark_right')[0];
var bann = getByClass('banner')[0],
    txt = getByClass('Tsou',bann)[0],       
    oUl = getByClass('textnone',bann)[0],
    // var oUl = document.getElementById('textnone');
    log = getByClass('logo',bann)[0],
    ti = getByClass('T',bann)[0],           //相机
    // Div1 =getByClass(bann,'div1')[0],       //搜索大框
    Bxy = document.getElementById('bxy'),   //二维码
    now = -1,
    show = false,
    google = false,
    timer = null,//延迟器的stop时间
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
zhh.getLi = function(da){     //li 鼠标效果  键盘效果   
    var Li = bann.getElementsByTagName('li');
    var oLi = Li ; 
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
        };
    }  

    document.onkeydown = function(ev)
    {   
        var event = ev || window.event;
        
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
        }
        if(event.keyCode==40)
        {
            now++;
            if(now>da.length-1) now=0;
            oLi[now].className='active';
            txt.value = da[now];
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
        if(event.keyCode==38 || event.keyCode==40){return false};  
    };
    Li = null ;
}


function stopEvent(event){ //阻止冒泡事件
      if(event && event.stopPropagation)
        {
         event.stopPropagation();
        }
        else if(window.event)
        {
        window.event.cancelBubble = true;
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
    var str="";
    var Data = data.s;
    if(zhh.ipone || Bxy.offsetWidth < 768) {
        Data.length = Math.min(6,Data.length)
    }
    var html_i = '';
    if(zhh.ipone || Bxy.offsetWidth < 768){
        html_i = '<i></i>'
    }
    for(var i=0;i<Data.length;i++)
    {  
        str += "<li><a>"+Data[i]+"</a>"+html_i+"</li>"
    }  
    oUl.innerHTML=str;
    oUl.style.display=(Data.length==0)?'none':'block';
    zhh.getLi(Data);
}
txt.onkeyup = zhh.prompt;

//空值搜索页面  原地蹦达
var oBtn = getByClass("Bsou")[0];
    oBtn.onclick = function ()
    {    
        if(txt.value=='')
        { 
                // var bf = (zhh.ipone)?"_self":"_bank";
                window.open(document.URL,"_self");
            }else
            {   
                zhh.two(txt.value) 
            }
    };

zhh.New = function (){//最新新闻
  var nScr  = document.createElement('script');
  nScr.src = "https://s.weibo.com/ajax/jsonp/suggestion?Refer=sina_sug&&_t1502449406497_79521732&_cb=ncb"; //新闻
  document.body.appendChild(nScr);
  if(!!-[1,]){      //不是ie678 时
    document.body.removeChild(nScr);
  }
}
function ncb(data){ 
  var str ='',
      ina ='',
      nData = data.data;
        for(var i=0,len = nData.length; i<len ;i++){   
            if(i===1){
                ina="none";
            }else if(i===2){
                ina="ntwo";
            }else if(i===3){
                ina="nthree";
            }                         
            str += "<li><a>"+nData[i]+"</a><i "+ina+"></i></li>"    
        }
        oUl.innerHTML=str;
        oUl.style.display=(nData.length==0)?'none':'block';

        zhh.getLi(nData);
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
            if(!zhh.ipone && Bxy.offsetWidth > 768){
                zhh.New();
            }else{
                ul_none();
            }
        };
    stopEvent(tf);                              //阻止 冒泡   
}

document.onmousedown = ul_none;
function ul_none(){//隐藏ul
    oUl.style.display='none';
}

//定位
zhh.position = function(){
  var ct  = document.createElement('script');
  ct.src="https://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js"
  document.body.appendChild(ct);
}
zhh.position();
//天气预报
zhh.city =function (){
  var ct = remote_ip_info["city"]               //先定位一下城市
  var dScr  = document.createElement('script');
  dScr.src = "https://wthrcdn.etouch.cn/weather_mini?city="+ct+"&callback=dcb"; 
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
bimg();
//二维码 四叶草 ~判断
function Bot(){
    var BxyChild = Bxy.children,
        Boff = Bxy.offsetTop,
        Woff = Bxy.offsetWidth;
    // var real = (Boff>401 && Woff>1121)?'block':'none';
    var real = (Boff>369 && Woff>1111)?'block':'none';
    BxyChild[0].style.display=real;
    BxyChild[1].style.display=real;
    oDiv.style.display=real;
}   
Bot();

//窗口变化时
window.onresize = function(){
    clearTimeout(timer);
    timer = setTimeout(function(){
        Bot();
        bimg();
    },100);
};

ti.onclick = function(tf){//相机
    google =! google;
    this.children[0]['className']=google?'ti':'';             //相机  点中  问题
    stopEvent(tf);
}

oUl.onmousedown=function(tf){stopEvent(tf);return false}    //防止选中li中文字


window.onload = function(){                     //ie 判断
    // zhh.New();                               //新闻 预加载
    txt.value=''; 
    zhh.city(); 

    if(!!window.ActiveXObject || "ActiveXObject" in window || navigator.userAgent.indexOf("Edge") > -1)
    {                  
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
       // document.body.addEventListener('input', POWERMODE);
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