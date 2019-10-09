// .slideshow
var contain = document.querySelector('.contain');//获取需要改变left的元素
var slide = document.querySelector('.slide');//获取需要改变left的元素
var leftBtn = document.querySelector('.left');//获取左边按钮
var rightBtn = document.querySelector('.right');//获取右边按钮

var slideLength = slide.children.length;//轮播图个数
var timer = null;//定时器初始为null
var index = 0;//计数
window.onload = function () {
    var everyTime = 2000;//轮播的间隔时间
    autoPlay(everyTime);//页面打开后自动开启播放
    //当有鼠标划过时停止定时器
    contain.onmouseenter = function () {
        clearInterval(timer);
    };
    //鼠标摞开时启动定时器
    contain.onmouseleave = function () {
        autoPlay(everyTime);
    };
    //点击左边按钮
    leftBtn.onclick = function () {
        if (index == 0) {
            play(-(1299 * (slideLength - 2)));
            index = slideLength - 2;
        } else {
            index--;
            play(-(1299 * index));
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
            play(-(1299 * index));
        }
    };


};
//自动播放
function autoPlay(period) {
    timer = setInterval(function () {
        index++;
        if (index == slideLength - 1) {
            index = 0;
            clearInterval(timer);
            criticality();
            return autoPlay(period);
        } else {
            if(index > slideLength-1){
                // return;
                index = 0;
            }
            play(-(1299 * index));
        }
    }, period)
}
//轮播公共方法
function play(left) {
    //1、图片移动left px；
    slide.style.left = left + 'px';
    slide.style.transition = 'left 1.5s';
}
function criticality() {
    play(-(1299 * index));
    var now=(new Date()).getTime()+2000;
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
    }, 2000);
}