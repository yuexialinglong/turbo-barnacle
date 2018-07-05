/*
 * 鼠标点击拖动
 */
window.mouseRotate = function(ev,id) {  //ev:e .id:元素id
    let Div = document.querySelector("#" + id);
    let y = 0;
    let x = 0;
    let e = ev || window.event;
    let disX = e.clientX - y;
    let disY = e.clientY - x;
    document.onmousemove = function(inner_ev){
        let inner_e = inner_ev || window.event;
        y = inner_e.clientY - disY;
        x = inner_e.clientX - disX;
        Div.style.cursor = 'pointer';
        Div.style.transform = 'rotateX('+x+'deg) rotateY('+y+'deg)';
    }
    document.onmouseup = function(){
        document.onmouseup = null;
        document.onmousemove = null;
        Div.releaseCapture && Div.releaseCapture();
    }
    Div.setCapture && Div.setCapture();
    //return false;
}

/*
 *复位
 */

window.rotateReset = function(id) {
    document.querySelector("#" + id).style.transform = 'rotate(0)';
}

