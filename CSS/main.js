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
    var link0 = '.middle .leftBoard .coggle_news .coggle_news_content >li';
    var trsTag = document.querySelectorAll(link0+'>table > tbody >tr'); //table list
    var tablesLength = trsTag.length;
    var halfLength = (tablesLength + 1)/2;
    var timesList = [];  //时间
    for (var i= 0; i < halfLength; i++) {
        var item = trsTag[i].innerText;
        timesList.push(item);
    }
    var aHrefList =[];  //连接
    var titleList =[];  //文章标题
    //文章简介
    for(var j = halfLength-1 ;j< tablesLength;j++ ){
        var item1 = trsTag[j].baseURI;
        var item2 = trsTag[j].textContent;
        aHrefList.push(item1);
        titleList.push(item2);
    }
    var html = '';
    var news = document.querySelector('.coggle_news .coggle_news_content');
    for(l=0;l<tablesLength){
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
          '<p>'+ titleList[l] +'</p>' +
        '</div>' +
      '</a>' +
    '</li>';
    }
    news.innerHTML = html;

})();

//     var divTag = document.querySelectorAll('.middle .leftBoard .coggle_news .coggle_news_content >li');
//     var tdTag = document.querySelectorAll('.middle .getPro .table-showBoard .leftBoard .coggle_news .coggle_news_content td[align="right"]');
//     var news = document.querySelector('.first_content .car-new-lists');
//     var len = divTag.length;
//     var pHtml = [];
//     for (var i= 0; i < len; i++) {
//       var item = lisTag[i].children[0].innerHTML;
//       pHtml.push(item);
//     }
//     for (var j = 0; j < len; j++) {
//       var divHtml = divTag[j].innerHTML;
//       var year = divHtml.substring(0,4);
//       var monthDay = divHtml.substring(5,10);
//       var tdHtml = tdTag[j].children[0].innerHTML;
//       var aHref = tdTag[j].children[0].getAttribute('href');
//       html +=
//         '<li>' +
//           '<a href="'+ aHref+'">' +
//             '<div class="left-time">' +
//               '<span class="time-m-d">'+ monthDay +'</span>' +
//               '<span class="time-year">'+ year +'</span>' +
//             '</div>' +
//             '<div class="right-news">' +
//               '<h6>'+ tdHtml +'</h6>' +
//               '<p>'+ pHtml[j] +'</p>' +
//             '</div>' +
//           '</a>' +
//         '</li>';
//     }
//     news.innerHTML = html;
//   })();