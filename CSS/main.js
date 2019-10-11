var contain = document.querySelector('.contain');//获取需要改变left的元素
var slide = document.querySelector('.slide');//获取需要改变left的元素
var leftBtn = document.querySelector('.left');//获取左边按钮
var rightBtn = document.querySelector('.right');//获取右边按钮
// var indicator = document.querySelector('.indicator');//指示灯父元素
// var indicatorChild = indicator.children;//指示灯的个数
var slideLength = slide.children.length;//轮播图个数
var timer = null;//定时器初始为null
var index = 0;//计数
window.onload = function () {
    var everyTime = 3000;//轮播的间隔时间
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
    //指示灯点击时
    // for (let i = 0; i < indicatorChild.length; i++) {
    //     indicatorChild[i].onmouseenter = function () {
    //         //先将同级class移除；
    //         for (var j = 0; j < indicatorChild.length; j++) {
    //             if (indicatorChild[j].className == 'li-active') {
    //                 indicatorChild[j].className = '';
    //             }
    //         }
    //         //设置所点击的元素class,并移动到指示灯所在图片
    //         play(-(1299 * i),i,undefined);
    //         index = i;
    //     }
    // }

};
//自动播放
function autoPlay(period) {
    timer = setInterval(function () {
        console.log(new Date() )
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
    //2、改变指示灯颜色
    // indicatorChild[activeIndex].className = 'li-active';
    // if(emptyIndex!=undefined){
    //     indicatorChild[emptyIndex].className = '';
    // }
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