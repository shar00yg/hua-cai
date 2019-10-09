// .slideshow
var temp = 1; //用来保存哪个图片显示
function showImg(changNum) { //让背景图片显示
    if (Number(changNum)) {//判断点击了要显示图片的按钮
        clearTimeout(t);
        if(changNum==1){
            temp+=1;
        }
        else if(changNum==-1){
            temp-=1;
        }
        
    }
    document.getElementById("slideShow").style.backgroundImage = "url(./Images/slideShow-0" + temp + ".png)";
    temp++;
    if(temp == 5) {
        temp = 1;
    }
    t = setTimeout("showImg()", 3000);//刷新时间
}


