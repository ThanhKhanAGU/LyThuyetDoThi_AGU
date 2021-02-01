/*Xử lý sự kiện khi có tác động của người dùng */
c.addEventListener("mousemove",(e)=>{
    mouse.x = e.offsetX*c.width/c.clientWidth
    mouse.y = e.offsetY*c.height/c.clientHeight
  
    if(mouse.click && mouse.tool=="MOVE_POINT" && select.point!=undefined)//có thể kéo thả khi giữ chuột 
    {
        point[select.point].x = mouse.x
        point[select.point].y = mouse.y    
    }
    if(mouse.tool=="DEL"&&select.point!=undefined&&mouse.click) //xóa 1 click 1 điểm
    // xóa 1 Point
    {
      //cặp nhật lại Matrix
        Matrix.splice(select.point,1)
        for(let i=0;i<Matrix.length;i++)
            Matrix[i].splice(select.point,1)
        //cập nhật lại point
        point.splice(select.point,1)
        for(let i = select.point;i<point.length;i++)
        {
            point[i].id--;
        }
        select.point=undefined
        pointID--
       
    }
})//Sự kiện này để cập nhật tọa đọ x


c.addEventListener("mousedown",(e)=>{

    mouse.type = e.which
    mouse.click = true
    if(mouse.tool=="ADD"&& k==undefined)
    {
        k = select.point
    }
    if(mouse.tool=="ADD" && mouse.type==1 && point.length<20)
    //thực hiện chức năng thêm thông tin
    {
        if(select.point==undefined)
        {
            point.push(new Point(index))
            setMatrix() 
            if(sound) addp.play()
        }                 
    }   
})//xác định khi nhấn phím xuống
c.addEventListener("mouseup",(e)=>{
    mouse.click = false
    if(mouse.tool=="ADD"&& k!=undefined && select.point!=undefined)
    {
        h = select.point
        
    }else {
        k=undefined
        if(mouse.tool=="ADD"&&select.point==undefined) if(sound) No.play()
    }
    if(h==undefined) SaveData()
   
})//xác định khi nhất phím lên
document.addEventListener("keypress",(e)=>{
    key = e.key
    
   
})//cập nhật phím kiểu chuổi
c.onclick = (e)=>
{
    if(mouse.tool=="DEL"&&select.point!=undefined) //xóa 1 click 1 điểm
    // xóa 1 Point
    {
      //cặp nhật lại Matrix
        Matrix.splice(select.point,1)
        for(let i=0;i<Matrix.length;i++)
            Matrix[i].splice(select.point,1)
        //cập nhật lại point
        point.splice(select.point,1)
        for(let i = select.point;i<point.length;i++)
        {
            point[i].id--;
        }
        select.point=undefined
        pointID-- 
        delp.play()
        
    }
    if(mouse.tool=="SET"&&select.point!=undefined)
    {
        pName = prompt('Bạn muốn thay đổi Point có tên "'+point[select.point].char+'" thành ', point[select.point].char)
        let a = true
        for(let i=0;i<point.length;i++)
        {
            if(pName==point[i].char)
            a=false
        }
        if(a&&pName!=null)
        {
            if(isNaN(parseInt(pName)))
            {
                point[select.point].char = pName;
            }
            else 
            {
                point[select.point].char = parseInt(pName);
            }
            
        }
        else
        {
            if(point[select.point].char!=pName)
            alert("Bạn vừa nhập tên trùng với 1 Point trong đồ thị!")
        }
    }
   
    
      
}
textMatrix.onmouseenter = (e)=>
{
    isInput= false
}
textMatrix.onmouseleave=(e)=>
{
    isInput= true
}
textMatrix.onkeyup= (e)=>
{
    if(e.key=="Enter")
    {
        TextToMatrix()
        SaveData()
        textMatrix.value.length = textMatrix.value.length-1

    }
}

document.addEventListener("keydown",(e)=>
{
    if((e.key=="p"||e.key=="P")&&e.altKey&&e.ctrlKey)
    { 
        play()
    }
    if((e.key=="n"||e.key=="N")&&e.altKey&&e.ctrlKey)
    { 
        num()
    }
    if((e.key=="d"||e.key=="D")&&e.altKey&&e.ctrlKey)
    { 
        dirline()
    }
    if((e.key=="S"||e.key=="s")&&e.altKey&&e.ctrlKey)
    { 
        saveTextAsFile();
        download();
    }
    if((e.key=="M"||e.key=="m")&&e.altKey&&e.ctrlKey)
    { 
        music()
    }
    if((e.key=='z'||e.key=='Z')&&e.ctrlKey)
    {
        Back()
    }
    if((e.key=='y'||e.key=='Y')&&e.ctrlKey)
    {
        after()
    }
    if((e.key=='F'||e.key=='f')&&e.altKey)
    {
        ButtonFord()
    }
    if((e.key=='D'||e.key=='d')&&e.altKey)
    {
        ButtonDijstra()
    }
    if((e.key=='s'||e.key=='S')&&e.altKey)
    {
        setting_show()
    }
    if((e.key=='P'||e.key=='P')&&e.altKey)
    {
        ButtonDraw()
    }
    if((e.key=='A'||e.key=='a'))
    {
        add() 
    }
    if((e.key=='d'||e.key=='D'))
    {
        del() 
    }
    if((e.key=='m'||e.key=='M'))
    {
        movepoint()
    }
    if((e.key=='s'||e.key=='S'))
    {
        setNumber()
    }
    

})
document.getElementById("fileToLoad").addEventListener("change",()=>
{
    
    let fileToLoad = document.getElementById("fileToLoad").files[0];
    
        let fileReader = new FileReader();
        fileReader.onload = function(fileLoadedEvent) 
        {
            textMatrix.value = fileLoadedEvent.target.result;
            TextToMatrix();
        };
        fileReader.readAsText(fileToLoad, "UTF-8");
    bc=0;
    runauto = false
    
})
function saveTextAsFile()
{
    let k = downloadMatrixpp;
    downloadMatrixpp = true;
    MatrixToText();
    var textToSave = textMatrix.value;
    var textToSaveAsBlob = new Blob([textToSave], {type:"text/plain"});
    var textToSaveAsURL = window.URL.createObjectURL(textToSaveAsBlob);
    var fileNameToSaveAs = "LyThuyetDoThi.tw12";
 
    var downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "Download File";
    downloadLink.href = textToSaveAsURL;
    downloadLink.onclick = destroyClickedElement;
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
 
    downloadLink.click();
    downloadMatrixpp = k;
    MatrixToText();
}
function destroyClickedElement(event)
{
    document.body.removeChild(event.target);
}