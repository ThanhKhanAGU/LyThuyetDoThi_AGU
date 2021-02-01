        /*LƯU THÔNG TIN CỦA CANVAS VÀ CÁC HÀM SETING*/
var sldr = true
var sldij = true
var runauto = false;
var Thuattoan ="Dij"
var bc = 0
var c = document.getElementById("drawCanvas")
    // c là thuộc tính để cài đặt canvas
var ctx = c.getContext("2d")
var bgdj = document.getElementById("backgroud");
var tb = document.getElementById("dijstraTableOutput")
var dr = bgdj.getContext("2d")
    // ctx là thuộc tính để cài đặt hình dạng bảng vẻ
var table = document.getElementById("MatrixCanvas").getContext("2d")
    // hien thi ban
var textTool = document.getElementById("textmenu")
    // hiển thiện chức năng hiện tại
var textInput = document.getElementById("number")
    //lấy thông số vào
var numberInput =document.getElementById("text")
    /*quản lý vị trí chuột chính xác*/
var textMatrix = document.getElementById("Matrixline")
var isInput = true;
var from = document.getElementById("tu")
var to = document.getElementById("den")
to.addEventListener("change",()=>{
    if(to.children[to.selectedIndex].innerText!="All")
    { bc = 0
        outDijstra.innerText = "Đang tìm đường đi"
    }
    if(sound ) keyp.play();
})
var xko
var DisplayCanvas = ""
var outDijstra = document.getElementById("Dijstracmd")

var DataMatrix = [[]]
var DatamatrixPosition = 0

var mouse = new Object()// tạo con trỏ chuột với toa (x,y) tinh trạng click 
{
    mouse.x = c.width/2 //tọa đọ x của chuột
    mouse.y = c.height/2 //tọa độ y của chuột
    mouse.click=false // kiểm tra độ nhấn của chuột
    mouse.tyle = undefined //loại phím nhấn
    mouse.tool = ""// loại chức năng
}
   
class matrix//Phần tử của Matrix
{
   constructor()
   {
    this.dir = 0 // biến quản lý hướng
    /*
    * 1 đúng hướng
    * 0 không có đường
    * -1 ngược hướng
    */
   this.Number = 1 // trọng số trên đường thẳng
   }
}
var direct = true
/**
 * false: vô hướng
 * true  : có hướng
 */
var isNumber = true
    //quảng lý xem duong thang co trong so không
var fly = false
    //hiệu ứng điểm 
var downloadMatrixpp = false

    
function add() 
{  
    textTool.value = "Thêm Điểm/ Cung"
    if(DisplayCanvas=="Draw")mouse.tool = "ADD" 
    else mouse.tool=undefined

}
function movepoint()
{  
    textTool.value = "Di chuyển Điểm"
    if(DisplayCanvas=="Draw")mouse.tool = "MOVE_POINT"
    else mouse.tool=undefined
}
function del()
{  
    textTool.value = "Xóa Điểm/ Cung"
    if(DisplayCanvas=="Draw")mouse.tool = "DEL"
    else mouse.tool=undefined
}
function setNumber() 
{  
    textTool.value = "Thay đổi Điểm/ Cung"
    if(DisplayCanvas=="Draw")mouse.tool = "SET"
    else mouse.tool=undefined
}

function play()       
{ 
    fly=!fly;  if(sound) keyp.play(); 
}
function dirline()       
{
    direct=!direct;  if(sound) keyp.play();
}
function num()    
{
    isNumber=!isNumber; if(sound)  keyp.play();
}
var sound=true
function music() 
{
   sound=!sound
   if(sound)  keyp.play()
   
}

/*biến tạm để tạo line*/
var k = undefined
var h = undefined
var select_set=undefined
var select_setl=undefined
var slx = undefined
var sly = undefined
var checkp = true
var checkl = false
/*------------*/
var select = new Object()
{ 
select.point = undefined 
select.line = undefined
select.tool = 0
}

var addp= new Audio("./sound/addp.mp3")
var delp = new Audio("./sound/delp.ogg")
var selpl = new Audio("./sound/selpl.ogg")
var selpl2 = new Audio("./sound/selpl2.ogg")
var keyp = new Audio("./sound/key.ogg")
var move =new Audio("./sound/move.ogg")
var dell = new Audio("./sound/del.ogg")
var No = new Audio("./sound/No.ogg")
    //Đây là biến xác định vùng chọn của điểm
var key      = undefined   
    //phím vừa được nhấn
var pointID  = 0 // khong sửa
    //quản lý id point
var lineID   = 0 // khong sửa
    //Quản lý id line
var index    = 1
    //biến quản lý ký tự tự phát sinh
//------------------------------------------------------------------------    
        /* Đây là các thuộc tính cài đặt cho Point*/
var sizePoint = 20 
    //kích thước bán kích của Point
var colorBoderPoint = "black" 
    //màu viền của Point
var lineWidth = 3 
    //độ dầy của viền
var colorBackgroundPoint = "white" 
    //màu nền của Point
var colorText = "#ff0000" 
    //màu của chữ hiển thị
var textWidth = 1
    //độ đậm của chữ
var colorBoderText = undefined
    //màu của viền chữ
var font = "Comic Sans MS"
    //định dạng front chữ 

        /* Đây là các thuộc tính cài đặt cho Line*/

var lineSize = 1;
    //kích thước của line
var lineColor = "black"
    //màu của line
var lineArrow =  "black"
    //màu mũi tên 
var lineTextColor ="black"
    //màu chữ của trọng số
var SizeNumber = 20
    //kích thước trọng số
var colortabletext ="red"

var tablesize = 400

function movein()
{
   if(sound) selpl.play()
}
function tenmatrix()
{
    table.clearRect(0,0,400,400);//XÓA MÀNG HÌNH
    if(DisplayCanvas=="Dijstra")
    if(Thuattoan=="Dij"){
    table.beginPath()
    table.clearRect(0,0,tablesize,tablesize);
    table.fillStyle  = "#0c06ff"
    table.lineWidth  = textWidth
    table.textAlign  = "left"
    table.font       = 22+"px " + font
    table.fillText("Dijkstra",298, 70)

    table.fillStyle  = "black"
    table.lineWidth  = 1
    table.textAlign  = "left"
    table.font       = 14+"px " + font
    table.fillText("Giải thuật",320, 100)
    table.fillText("tìm đường đi",310, 116)
    table.fillText("ngắn nhất",320, 132)
    table.closePath()
    }
    else
    {
        table.beginPath()
        table.clearRect(0,0,tablesize,tablesize);
        table.fillStyle  = "#bc65eb"
        table.lineWidth  = textWidth
        table.textAlign  = "left"
        table.font       = 22+"px " + font
        table.fillText("Ford-",298, 70)
        table.fillText("Bellman",310, 90)
    
        table.fillStyle  = "black"
        table.lineWidth  = 1
        table.textAlign  = "left"
        table.font       = 14+"px " + font
        table.fillText("Giải thuật",320, 120)
        table.fillText("tìm đường đi",310, 136)
        table.fillText("ngắn nhất",320, 152)
        table.closePath() 
    }
}
function matrixall(){
    //tao ma tran point point
   if(!direct)
   {
       document.getElementById("btnHuong").style.background = "black"
       document.getElementById("btnHuong").style.color = "gray"
   }
   else
   {
    document.getElementById("btnHuong").style.background = "white"
    document.getElementById("btnHuong").style.color = "black"
   }
   if(!isNumber)
   {
       document.getElementById("btnTrongso").style.background = "black"
       document.getElementById("btnTrongso").style.color = "gray"
   }
   else
   {
    document.getElementById("btnTrongso").style.background = "white"
    document.getElementById("btnTrongso").style.color = "black"
   }
   if(sound)
   {
       document.getElementById("btnAm").innerText="🔊";
   }
   else
        document.getElementById("btnAm").innerText="🔈 ";
    if(fly)
    document.getElementById("btnFly").innerText ="🥏"
    else
    document.getElementById("btnFly").innerText ="⛔"
pointtmp=[]
pointtmp2=[]
for(let i =0;i<point.length;i++)
{
    if(typeof(point[i].char)=="number")
        pointtmp.push(point[i])
    else pointtmp2.push(point[i])
}
for(let i=0;i<pointtmp.length;i++)
    for(let j=0;j<pointtmp.length;j++)
{
   if(parseInt(pointtmp[i].char) <parseInt(pointtmp[j].char))
   {
       let x = pointtmp[i]
       pointtmp[i]=pointtmp[j]
       pointtmp[j]=x
   }
}
for(let i=0;i<pointtmp2.length;i++)
    for(let j=0;j<pointtmp2.length;j++)
{
   if(pointtmp2[i].char.charCodeAt(0)<pointtmp2[j].char.charCodeAt(0))
   {
       let x = pointtmp2[i]
       pointtmp2[i]=pointtmp2[j]
       pointtmp2[j]=x
   }
}
for(let i=0;i<pointtmp2.length;i++)
{
  pointtmp.push(pointtmp2[i])
}
try {
    
    if(typeof(pointtmp[pointtmp.length-1].char)=="string")
        index = String.fromCharCode(pointtmp[pointtmp.length-1].char.charCodeAt(0)+1)
    else
        index = pointtmp[point.length-1].char + 1;
} catch (error) {
    
}
/////------------giải thuat dijstra matrix  /////










   //---------------ve Matrix----------------------

tenmatrix();
table.beginPath()
table.moveTo((tablesize/4*3)/10,(tablesize/4*3)/10)
table.lineTo(tablesize,(tablesize/4*3)/10)
table.moveTo((tablesize)/10,(tablesize)/20)
table.lineTo((tablesize)/10,tablesize)
table.stroke()
if(point.length!=0)
for(let i=0;i<point.length;i++)
{
    table.beginPath()
    table.moveTo((tablesize/4*3)/10,(tablesize/4*3)/10)
    table.lineTo(tablesize,(tablesize/4*3)/10)
    table.moveTo((tablesize)/10,20)
    table.lineTo((tablesize)/10,tablesize)
    table.stroke()
    table.fillStyle  = colortabletext
    table.lineWidth  = textWidth
    table.textAlign  = "center"
    table.fillText(pointtmp[i].char,((tablesize-tablesize/8)/(point.length))*i+(tablesize*3/2)/10, (tablesize/20))
    table.fillText(pointtmp[i].char,(tablesize/20), ((tablesize-tablesize/8)/(point.length))*i+(tablesize*3/2)/10)
    table.fill()
    for(let j=0;j<point.length;j++)
    {
        table.font       = (((tablesize/4*3)/10-pointID)<7)? 7:((tablesize/4*3)/10-pointID) +"px " + font
        if(Matrix[pointtmp[j].id][pointtmp[i].id].dir==0)  table.fillStyle  = "#b5b5b5"
        else  table.fillStyle  = "black"
        table.lineWidth  = textWidth
        table.textAlign  = "center"
       if(direct){
            if(Matrix[pointtmp[j].id][pointtmp[i].id].dir==-1) 
            { 
                table.fillStyle  = "#b5b5b5"
                table.fillText(0,((tablesize-tablesize/8)/(point.length))*i+(tablesize*3/2)/10, ((tablesize-tablesize/8)/(point.length))*j+(tablesize*3/2)/10)
                table.fillStyle  = "black"
            }
            else
            {
                if(isNumber&&Matrix[pointtmp[j].id][pointtmp[i].id].dir!=0)
                {
                    table.fillText(Matrix[pointtmp[j].id][pointtmp[i].id].Number,((tablesize-tablesize/8)/(point.length))*i+(tablesize*3/2)/10, ((tablesize-tablesize/8)/(point.length))*j+(tablesize*3/2)/10)
                }else
                    table.fillText(Matrix[pointtmp[j].id][pointtmp[i].id].dir,((tablesize-tablesize/8)/(point.length))*i+(tablesize*3/2)/10, ((tablesize-tablesize/8)/(point.length))*j+(tablesize*3/2)/10)
            }
        }
       else{
            if(isNumber&&Matrix[pointtmp[j].id][pointtmp[i].id].dir!=0)
            {
                table.fillText((Matrix[pointtmp[j].id][pointtmp[i].id].Number>Matrix[pointtmp[i].id][pointtmp[j].id].Number)?Matrix[pointtmp[j].id][pointtmp[i].id].Number:Matrix[pointtmp[i].id][pointtmp[j].id].Number,((tablesize-tablesize/8)/(point.length))*i+(tablesize*3/2)/10, ((tablesize-tablesize/8)/(point.length))*j+(tablesize*3/2)/10)
            }else
                table.fillText(Math.abs(Matrix[pointtmp[j].id][pointtmp[i].id].dir),((tablesize-tablesize/8)/(point.length))*i+(tablesize*3/2)/10, ((tablesize-tablesize/8)/(point.length))*j+(tablesize*3/2)/10)
        } 

        table.fill()

    }
} 
table.closePath()


if(isInput) MatrixToText()
}

function ButtonDraw()
{
    document.getElementById("Draw_show").style.display="block"
    document.getElementById("Dijstra_show").style.display="none"
    DisplayCanvas="Draw"
    if(sldr)
    {
        Draw()
        sldr=false
    }
    sldij=true
    
    beginDraw()
}

function ButtonDijstra()
{
    document.getElementById("Dijstra_show").style.display="block"
    document.getElementById("Draw_show").style.display="none"
    DisplayCanvas="Dijstra" 
    if(sldij)
    {
        Dijstra()
        sldij==false;
    }
    sldr=true
    bc=0
    Thuattoan="Dij"
    runauto = false;
    document.getElementById("backgroud").style.background="#4c89da"
    document.getElementById("Dijstracmd").style.background="#4c89da"
    beginDijstra()
    textTool.value = "Giải thuật Dijkstra"
}
function ButtonFord()
{
    document.getElementById("Dijstra_show").style.display="block"
    document.getElementById("Draw_show").style.display="none"
    DisplayCanvas="Dijstra" 
    if(sldij)
    {
        Dijstra()
        sldij==false;
    }
    sldr=true
    bc=0;
    runauto = false;
    
    Thuattoan="For"
    document.getElementById("backgroud").style.background="#bc65eb"
    document.getElementById("Dijstracmd").style.background="#bc65eb"
    beginDijstra()
    textTool.value = "Giải thuật Ford-Bellman"
}

var draw = document.getElementById("draw")
var matrixx = document.getElementById("matrixroot")
function resize(){	
    if( draw.clientWidth <=710)
    {
        draw.style.display="block"
        matrixx.style.display ="block"
    }else{
        draw.style.display="inline-block"
        matrixx.style.display ="inline-block"
    }
}
