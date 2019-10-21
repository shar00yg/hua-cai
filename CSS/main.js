var contain = document.querySelector('.contain');//获取需要改变left的元素
var slide = document.querySelector('.slide');//获取需要改变left的元素
var leftBtn = document.querySelector('.left');//获取左边按钮
var rightBtn = document.querySelector('.right');//获取右边按钮
var slideLength = slide.children.length;//轮播图个数
var timer = null;//定时器初始为null
var index = 0;//计数
window.onload = function () {
    var everyTime = 4000;//轮播的间隔时间
    autoPlay(everyTime);//页面打开后自动开启播放
    //当有鼠标划过时停止定时器
    contain.onmouseenter = function () {
        clearInterval(timer);
    };
    //鼠标摞开时启动定时器
    contain.onmouseleave = function () {
        clearInterval(timer);
        autoPlay(everyTime);
    };
    //点击左边按钮
    leftBtn.onclick = function () {
        if (index == 0) {
            play(-(1299 * (slideLength - 1)),slideLength - 1,0);
            index = slideLength - 1;
        } else {
            index--;
            play(-(1299 * index),index,index +1);
        }
    };
    //点击右边按钮
    rightBtn.onclick = function () {
        index++;
        if (index == slideLength - 1) {
            criticality();
        } else {
            if(index > slideLength-1){
                return;
            }
            play(-(1299 * index),index,index -1);
        }
    };

};
//自动播放
function autoPlay(period) {
    timer = setInterval(function () {
        // console.log(new Date() )
        index++;
        if (index == slideLength - 1) {
            clearInterval(timer);
            criticality();
            return autoPlay(period);
        } else {
            if(index > slideLength-1){
                return;
            }
            play(-(1299 * index),index,index -1);
        }
    }, period)
}
//轮播公共方法
function play(left,activeIndex,emptyIndex) {
    //1、图片移动left px；
    slide.style.left = left + 'px';
    slide.style.transition = 'left 1.5s';
}
function criticality() {
    play(-(1299 * index),0,slideLength - 2);
    var now=(new Date()).getTime()+1500;
    if((new Date()).getTime()<=now){
        rightBtn.disabled=true;
        setTimeout(function () {
            rightBtn.disabled=false;
        },now-(new Date()).getTime())
    }
    setTimeout(function () {
        slide.style.left = 0 + 'px';
        slide.style.transition = 'left 0s';
        index = 0;
    }, 1500);
}

// 学院新闻
(function () {
    var link0 = '.middle .leftBoard .coggle_news .coggle_news_content >li>table > tbody >tr>td>table>tbody>tr>td';
    var trsTag = document.querySelectorAll(link0); //table list
    var tablesLength = trsTag.length;
    var halfLength = (tablesLength)/2;
    var timesList = [];  //时间
    for (var i= 0; i < halfLength; i++) {
        var item = trsTag[i].children[0].innerText;
        timesList.push(item);
    }
    var aHrefList =[];  //连接
    var titleList =[];  //文章标题
    var articleList = [];//文章简介
    for(var j = halfLength ;j< tablesLength;j++ ){
        var item1 = trsTag[j].children[0].href;
        var item2 = trsTag[j].children[0].title;
        var item3 = trsTag[j].children[0].innerText;
        aHrefList.push(item1);
        titleList.push(item2);
        articleList.push(item3);
    }
    var html = '';
    var news = document.querySelector('.coggle_news .coggle_news_content');
    for(l=0;l<halfLength;l++){
        // var divHtml = divTag[j].innerHTML;
        var year = timesList[l].substring(0,4);
        var monthDay = timesList[l].substring(5,10);

    html +=
    '<li>' +
      '<a href="'+ aHrefList[l]+'">' +
        '<div class="left-time">' +
          '<span class="time-m-d">'+ monthDay +'</span>' +
          '<span class="time-year">'+ year +'</span>' +
        '</div>' +
        '<div class="right-news">' +
          '<h6>'+ titleList[l] +'</h6>' +
          '<p>'+ articleList[l] +'</p>' +
        '</div>' +
      '</a>' +
    '</li>';
    }
    if(trsTag.length != 0 ){
        news.innerHTML = html;
    }
})();

// // 通知公告
// (function () {
//     var link1 = '.middle .leftBoard .proclamation .proclamation_content >li>table > tbody >tr>td>table>tbody>tr>td';
//     var trsTag1 = document.querySelectorAll(link1); //table list
//     var tablesLength = trsTag1.length;
//     var halfLength = (tablesLength)/2;
//     var timesList = [];  //时间
//     for (var i= halfLength; i < tablesLength; i++) {
//         var item = trsTag1[i].children[0].innerText;
//         timesList.push(item);
//     }
//     var aHrefList =[];  //连接
//     var titleList =[];  //文章标题
//     // var articleList = [];//文章简介
//     for(var j = 0 ;j< halfLength;j++ ){
//         var item1 = trsTag1[j].children[0].href;
//         var item2 = trsTag1[j].children[0].title;
//         // var item3 = trsTag1[j].children[0].innerText;
//         aHrefList.push(item1);
//         titleList.push(item2);
//         // articleList.push(item3);
//     }
//     var html1 = '';
//     var news1 = document.querySelector('.proclamation .proclamation_content');
//     for(l=0;l<halfLength;l++){
//         var year = timesList[l].substring(0,4);
//         var monthDay = timesList[l].substring(5,10);

//     html1 +=
//     '<li>' +
//       '::before'+
//       '<a href="'+ aHrefList[l]+'">' +
//       '<div class="left-news1">' +
//       //   '<h6>'+ titleList[l] +'</h6>' +
//         '<p>'+ titleList[l] +'</p>' +
//       '</div>' +
//         '<div class="right-time1">' +
//           '<span class="time">'+ timesList[l] +'</span>' +
//         '</div>' +
//       '</a>' +
//     '</li>';
//     }
//     if(trsTag1.length != 0 ){
//         news1.innerHTML = html1;
//     }
// })();

//隐藏more 提取link (通知通告，亮点论文)
(function(){
    var noticeList = document.querySelector('.middle .leftBoard .proclamation .proclamation_content >li');
    var highlights_contentList = document.querySelector('.middle .showBoard .rightBoard .highlights .highlights_content > li');
    if(noticeList.children[1] != undefined){
        noticeList.children[1].style='display:none';   
        highlights_contentList.children[2].style='display:none';
        var moreLsit2 = noticeList.children[1].children[0].href;
        var imgLsit2 = document.querySelector("proclamation > a");
        imgLsit2.href = moreLsit2;
        var highlightsLsit2 = highlights_contentList.children[2].children[0].href;
        var imgLsit3 = document.querySelector("highlights > a");
        imgLsit3.href = highlightsLsit2;
    }
})()

