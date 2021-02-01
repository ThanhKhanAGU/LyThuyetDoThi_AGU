
var DijstraTable = []
var yDij = 80;
const vc = 1000000000 //∞

var listp = []
function hov(){
    if(sound ) selpl.play();
}
function Buoct()
{
    if(bc>0)
        bc--
    if(sound ) keyp.play();
}
function Buocf()
{
    let k = to.children[to.selectedIndex].innerText
    if(Thuattoan=="Dij")
    {
        if(k=="All") k=pointtmp.length-1
        else k=idPoint(k,point)+1
    }else
    {
        if(k=="All") k=pointtmp.length-2
        else k=idPoint(k,point)
    }
    
    if(bc<k)
        bc++
    else bc=1;
    if(sound ) keyp.play();
}

function runDij()
{
    if(sound ) keyp.play();
    runauto =! runauto
    if(bc==pointtmp.length||bc>=Maxbc-1)
        bc=0
    if(runauto) 
    {
        document.getElementById("btnrun").innerText = "⏸️"
    }
    else 
    {
         document.getElementById("btnrun").innerText = "▶️"
    }
   
    k_nhonhat()
}
var timers = document.getElementById("time")

var x = setInterval(() => {
    if(runauto&&bc<pointtmp.length) bc++
}, parseInt(timers.value));
var Maxbc
function Dijstra()
{ 
matrixall()
if(Thuattoan=="Dij")
    Maxbc =pointtmp.length
else Maxbc =pointtmp.length-1

for(let j=0;j<20;j++)
{
    if(j<pointtmp.length)
    {
        to.children[j+1].style.display = "block"
        to.children[j+1].innerText = pointtmp[j].char
        from.children[j].style.display= "block"
        from.children[j].innerText = pointtmp[j].char
    } 
    else 
    {
        to.children[j+1].style.display ="none"
        from.children[j].style.display= "none"
    }
}
document.getElementById("showTu").innerText   = "T:" + from.children[from.selectedIndex].innerText
document.getElementById("showDen").innerText  = "Đ:" + to.children[to.selectedIndex].innerText

let t = 0
let s=from.children[from.selectedIndex].innerText
//-----------------------------------------------------------------------
DijstraTable = []
for(i=0;i<point.length;i++)
{ 
    let tam =[]
    for(j = 0;j<point.length;j++)
    {
        tam.push([vc,"-",""])
    }
    DijstraTable.push(tam)
}
try {
//khởi tạo//
ctx.clearRect(0,0,c.width,c.height);//XÓA MÀNG HÌNH
line = []//chưa tối ưu
    lineID = 0;
    try {
        {// do thi co huong
            for(let i=0;i<point.length;i++)//CẬP NHẬT LẠI LINE
            {
                for(let j=0 ;j<point.length;j++)//chưa tối ưu
                {
                    if(Matrix[i][j].dir==1)//chưa tối ưu
                    {
                        
                        line.push(new Line(point[i],point[j],Matrix[i][j].Number))
                    }
                }
            }
        }
    } catch (error) {
      
   }
    for(let i = 0;i < line.length;i++)
    {
        line[i].Check() 
        line[i].Paint()
    }
    for(let i = 0;i < point.length;i++)
    {
        point[i].Check()
        point[i].Paint()     
    }

if(Thuattoan=="Dij")
    DijstraTable[idPoint(s,pointtmp)][0]=[0,s,"*"]
else
    DijstraTable[idPoint(s,pointtmp)][0]=[0,s,""]
listp = []
let listl=[]
var tam = s
listp.push(tam)
if(Thuattoan=="Dij"){
//Thuat toan Dijkstra
//khoi tao
for(let j=0;j<pointtmp.length;j++)
{
    if(isDuong(s,pointtmp[j].char))
    {
        DijstraTable[j][0]=[ktDuong(s,pointtmp[j].char,t),s,""]
        
    }
    else DijstraTable[j][0][1] = s
}
//khởi chạy//
for(let j=1;j<pointtmp.length;j++)
{
    for(let i=0;i<pointtmp.length;i++)
    {
        if(DijstraTable[i][j-1][2]!="*")
        {
            if(ktDuong(s,pointtmp[i].char,t) < DijstraTable[i][j-1][0])
            {
               
                DijstraTable[i][j]=[ktDuong(s,pointtmp[i].char,t),s,""]
            }
            else{
               
                DijstraTable[i][j][0] = DijstraTable[i][j-1][0]
                DijstraTable[i][j][1] = DijstraTable[i][j-1][1]
            }   

        }
        else
        DijstraTable[i][j]=["*","*","*"]
    }
    let id , min = vc
   try{
       for(let i=0;i<pointtmp.length;i++)
    {
        if(DijstraTable[i][j][2]!="*")
        {
           if(DijstraTable[i][j][0]<parseInt(min))
            {
               
               min = DijstraTable[i][j][0]
                id = i
            }
        }
    }
    DijstraTable[id][j][2]="*"
    listl.push([pointtmp[id].char,DijstraTable[id][j][1]])
    s = pointtmp[id].char
    t = DijstraTable[id][j][0]
    if(s==to.children[to.selectedIndex].innerText)
    {
        Maxbc = j+1
    }
    var tam = s+""
    listp.push(tam)
}catch{   
}
}

}else
{
    //thuat toan Ford-Bellman
    //khoi tao
    let mang = new Array
    for(let j=0;j<pointtmp.length;j++)
    {
    if(isDuong(s,pointtmp[j].char))
    {
        DijstraTable[j][0]=[ktDuong(s,pointtmp[j].char,t),s,""]
        
    }
    else DijstraTable[j][0][1] = s
        mang.push(DijstraTable[j][0][0]) //
        listp.push(DijstraTable[j][0][1]) //
    }
    //Khoi chay
    for(let j=1;j<pointtmp.length-1;j++)
    {
        for(let i=0;i<pointtmp.length;i++)
        {
            DijstraTable[i][j][0] = DijstraTable[i][j-1][0]
            DijstraTable[i][j][1] = DijstraTable[i][j-1][1]      
           for(let k =0 ;k <pointtmp.length;k++)
           {
               if(isDuong(pointtmp[k].char,pointtmp[i].char))
               {
                   //có dduong đi tu dinh den diem dang set
                   let kc = mang[k] + ktDuong(pointtmp[k].char,pointtmp[i].char)
                   if(kc>vc) kc=vc;

                   if(kc<mang[i])
                   {
                       DijstraTable[i][j][0] = kc;
                       DijstraTable[i][j][1] = pointtmp[k].char
                       mang[i]=kc;
                       
                   }
               }
           }
        }
    }
   
}



if(to.children[to.selectedIndex].innerText==from.children[from.selectedIndex].innerText)
{
    Maxbc = 1
}
paintpoint(listp[0],0,Maxbc)
for(let i=1;i<=bc;i++)
{
    if(i==Maxbc)
        break  
    
    if(listp[i]!=undefined)
    {
        if(i>0)
        {
            let x2 = point[idPoint(listl[i-1][0],point)].x
            let y2 = point[idPoint(listl[i-1][0],point)].y
            
            let x1 = point[idPoint(listl[i-1][1],point)].x
            let y1 = point[idPoint(listl[i-1][1],point)].y
    
            var dx = x1 - x2;
            var dy = y1 - y2;
            var angle = Math.atan2(dy, dx);
            let xtx =lineSize
            ctx.beginPath()
            ctx.strokeStyle="black"
            ctx.lineWidth = sizePoint*0.6
            ctx.moveTo(x2 + sizePoint*1.5 * Math.cos(angle ), y2 + sizePoint*1.5 * Math.sin(angle ))
            ctx.lineTo(x1 + sizePoint*1.5 * Math.cos(angle + Math.PI), y1 + sizePoint*1.5 * Math.sin(angle + Math.PI))
            ctx.stroke()
            ctx.closePath();
            lineSize = xtx
        }
        paintpoint(listp[i],i,Maxbc)
    }  
    
}
} catch (error) {
   
}

//-----------------------------------------------------------------------------------
    
    //Khung vien dam//  
    

    
    /////hiện matrix
        dr.strokeStyle = "white"
        dr.clearRect(0,0,700,600)
        dr.beginPath()
        dr.moveTo(100 ,45)
        dr.lineTo(700 ,45)
        dr.stroke()
        dr.closePath()
    try {
        let kc = (700-100)/parseInt(pointtmp.length)
        for(let i=0;i<pointtmp.length;i++)
        {
            dr.beginPath()
            dr.moveTo(kc+100 +kc*i,0)
            dr.lineTo(kc+100 + kc*i,600)
            dr.stroke()
            dr.font       = SizeNumber+"px " + font
            dr.fillStyle  = lineTextColor
            dr.textAlign  = "center"
            dr.fillStyle = "white"
            dr.fillText(pointtmp[i].char,100+ kc/2+kc*i,40);
            dr.closePath()
        }   
        var listtam=[]  
        for(let k=0;k<=bc;k++)
        {
            if(k==0) listtam=[]
            else if(k<Maxbc)
            {
                let ta = [listp[k]+"",k]
                    listtam.push(ta)
            }
            
            if(to.children[to.selectedIndex].innerText=="All")
            {
                if(k==0)
                {
                    if(Thuattoan=="Dij")
                    outDijstra.innerText="Khởi tạo thuật toán Dijkstra đi từ "+from.children[from.selectedIndex].innerText+" đến tất cả các đỉnh"
                    else
                    outDijstra.innerText="Khởi tạo thuật toán Ford-Bellman đi từ "+from.children[from.selectedIndex].innerText+" đến tất cả các đỉnh"                    
                } 
                else if(k<Maxbc)
                { 
                    if(Thuattoan=="Dij")
                    outDijstra.innerText+="\n - Bước "+k+": chọn S = "+listp[k]+ " vì khoảng cách hiện tại là ngắn nhất "
                    
                }
                else if(k==Maxbc)
                {
                   try {
                    outDijstra.innerText+="\n Kết quả:"
                    if(Thuattoan=="Dij")for(let i=0;i<listtam.length;i++)
                    {
                        
                        outDijstra.innerText+="\n -Đoạn đường đi từ "+from.children[from.selectedIndex].innerText+" đến "+listp[i+1]+":"
                        outDijstra.innerText+=createduong(i,listtam)+" = "+DijstraTable[idPoint(listtam[i][0],pointtmp)][on0out1(listtam[i][0],listtam)][0]
                    } else
                    {
                        
                        let max = new Array;
                        for(let k=0;k<pointtmp.length;k++)
                        {
                            outDijstra.innerText+="\n -Đoạn đường đi từ "+from.children[from.selectedIndex].innerText+" đến "+pointtmp[k].char+":"
                            var str = new Array
                            str.push(pointtmp[k].char)
                            var bien = DijstraTable[k][pointtmp.length-2][1];
                            str.push(bien)
                            do
                            {
                                let idl = idPoint(bien,pointtmp)
                                bien=DijstraTable[idl][point.length-2][1]
                                if(str[str.length-1]!=bien)
                                str.push(bien)  
                            } while(bien != from.children[from.selectedIndex].innerText)
                           
                            max.push(str)
                            
                            for(let i = str.length-1;i>0;i--)
                            {
                                outDijstra.innerText+=" "+str[i]+" →"
                            } 
                            if( DijstraTable[k][pointtmp.length-2][0]==vc)
                            {
                                outDijstra.innerText+="\n⚠️Đồ thị không liên thông hoặc liên thông yếu! \nKhông tìm thấy đường đi tới tất cả đỉnh"
                                break
                            }
                            outDijstra.innerText+=" " + pointtmp[k].char +" : "+ DijstraTable[k][pointtmp.length-2][0];
                        }
                        for(let j=0;j<max.length;j++)
                        for(let i=0;i<max[j].length;i++)
                        {
                            if(max[j][i]!=from.children[from.selectedIndex].innerText) paintpoint(max[j][i],5,Maxbc);
                            if(i>0&&max[j][i-1]!=max[j][i])
                            {
                                let x2 = point[idPoint(max[j][i-1],point)].x
                                let y2 = point[idPoint(max[j][i-1],point)].y
                                
                                let x1 = point[idPoint(max[j][i],point)].x
                                let y1 = point[idPoint(max[j][i],point)].y

                                var dx = x1 - x2;
                                var dy = y1 - y2;
                                var angle = Math.atan2(dy, dx);
                                let xtx =lineSize
                                ctx.beginPath()
                                ctx.strokeStyle="black"
                                ctx.lineWidth = sizePoint*0.6
                                ctx.moveTo(x2 + sizePoint*1.5 * Math.cos(angle ), y2 + sizePoint*1.5 * Math.sin(angle ))
                                ctx.lineTo(x1 + sizePoint*1.5 * Math.cos(angle + Math.PI), y1 + sizePoint*1.5 * Math.sin(angle + Math.PI))
                                ctx.stroke()
                                ctx.closePath();
                                lineSize = xtx
                            }

                        }

                        
                    } 
                   } catch (error) {
                    outDijstra.innerText+="\n⚠️Đồ thị không liên thông hoặc liên thông yếu! \nKhông tìm thấy đường đi tới tất cả đỉnh"  
                   } 
                   
                    break;
                }
                
            }
            
            if(k==Maxbc&&to.children[to.selectedIndex].innerText!="All")
            {

                let so = to.children[to.selectedIndex].innerText
                outDijstra.innerText="Tìm đường đi ngắn nhất từ "+from.children[from.selectedIndex].innerText+" đến "+to.children[to.selectedIndex].innerText+":"
            if(Thuattoan=="Dij"){    try {
                    
                    let listt =[]
                    listt.push(so)
                    var d,tong=DijstraTable[idPoint(listt[listt.length-1],pointtmp)][on0out1(listt[listt.length-1],listtam)][0]
                    while(d!=from.children[from.selectedIndex].innerText)
                    {
                        d = DijstraTable[idPoint(listt[listt.length-1],pointtmp)][on0out1(listt[listt.length-1],listtam)][1]+""
                        listt.push(d)
                    }
                    
                    let listlist=""
                    for(let z=listt.length-1;z>=0;z--)
                    {
                        listlist+=" "+listt[z]
                        if(z!=0) listlist+=" → "
                    }
                    outDijstra.innerText +="\n- ✔️Đã tìm thấy đường đi: "+ listlist +" = "+tong  
                } catch (error) {
                    outDijstra.innerText +="\n- ❌Không tìm thấy đường đi từ " +from.children[from.selectedIndex].innerText+" đến "+
                    to.children[to.selectedIndex].innerText
                }
            }else
            {
                //thuat toan ford-bellman
                let max = new Array;
                    
                    var str = new Array
                    str.push(to.children[to.selectedIndex].innerText)
                    var bien = DijstraTable[idPoint(to.children[to.selectedIndex].innerText,pointtmp)][pointtmp.length-2][1];
                    str.push(bien)
                    do
                    {
                        let idl = idPoint(bien,pointtmp)
                        bien=DijstraTable[idl][point.length-2][1]
                        if(str[str.length-1]!=bien)
                        str.push(bien)  
                    } while(bien != from.children[from.selectedIndex].innerText)
                   
                    max.push(str)
                    if( DijstraTable[idPoint(to.children[to.selectedIndex].innerText,pointtmp)][pointtmp.length-2][0]==vc)
                    {
                        outDijstra.innerText+="\n❌Không tìm thấy đường đi từ "+from.children[from.selectedIndex].innerText+" đến "+to.children[to.selectedIndex].innerText+":"+"\n⚠️Đồ thị không liên thông hoặc liên thông yếu!"
                    }else
                    {
                        
                        outDijstra.innerText +="\n- ✔️Đã tìm thấy đường đi từ "+from.children[from.selectedIndex].innerText+" đến "+to.children[to.selectedIndex].innerText+":"
                        for(let i = str.length-1;i>0;i--)
                        {
                            outDijstra.innerText+=" "+str[i]+" →"
                        } 
                        outDijstra.innerText+=" " + to.children[to.selectedIndex].innerText +" : "+ DijstraTable[idPoint(to.children[to.selectedIndex].innerText,pointtmp)][pointtmp.length-2][0];
                    for(let j=0;j<max.length;j++)
                    for(let i=0;i<max[j].length;i++)
                    { 
                        paintpoint(max[j][i],i,max[j].length)
                            
                        if(i>0&&max[j][i-1]!=max[j][i])
                        {
                            let x2 = point[idPoint(max[j][i-1],point)].x
                            let y2 = point[idPoint(max[j][i-1],point)].y
                            
                            let x1 = point[idPoint(max[j][i],point)].x
                            let y1 = point[idPoint(max[j][i],point)].y
    
                            var dx = x1 - x2;
                            var dy = y1 - y2;
                            var angle = Math.atan2(dy, dx);
                            let xtx =lineSize
                            ctx.beginPath()
                            ctx.strokeStyle="black"
                            ctx.lineWidth = sizePoint*0.6
                            ctx.moveTo(x2 + sizePoint*1.5 * Math.cos(angle ), y2 + sizePoint*1.5 * Math.sin(angle ))
                            ctx.lineTo(x1 + sizePoint*1.5 * Math.cos(angle + Math.PI), y1 + sizePoint*1.5 * Math.sin(angle + Math.PI))
                            ctx.stroke()
                            ctx.closePath();
                            lineSize = xtx
                        }
    
                    }
                    }


                
            }
                
                break 
            }
            if(k<=bc)
            for(let i=0;i<pointtmp.length;i++)
            {    
                
               
                    dr.beginPath()
                    dr.font       = 30-(DijstraTable.length)+"px " + font
                    dr.textAlign  = "center"
                    dr.fillStyle  = "white"
                    if(k==0) dr.fillText("Khởi Tạo:",50,80+(k*kc)*0.9);
                    else dr.fillText("Bước "+k+":",50,80+(k*kc)*0.9);



                   
                    if(DijstraTable[i][k][0]=="∞"&&k==pointtmp.length-1)
                        dr.fillStyle  = "red"
                    else if(DijstraTable[i][k][2]=="*")
                        dr.fillStyle  = "darkGray"
                    else dr.fillStyle  = "white"
                    
                   

                    if(DijstraTable[i][k][0]=="*")
                        dr.fillText("-  ",100+ kc/2+kc*i,80+(k*kc)*0.9);
                    else
                        dr.fillText("("+((DijstraTable[i][k][0]+100>=vc)?"∞":DijstraTable[i][k][0])+","+DijstraTable[i][k][1]+")"+DijstraTable[i][k][2],100+ kc/2+kc*i,80+(k*kc)*0.9); 
                    dr.closePath()
                
            } 
        
        } 
        
        

    for(let i=0;i<pointtmp.length;i++)
    {
        let listt =[]
        listt.push(pointtmp[i].char)
        let d
           
        let tang =1
        while(d!=from.children[from.selectedIndex].innerText)
        {
            d = DijstraTable[idPoint(listt[listt.length-1],pointtmp)][i-tang++][1]+""
            listt.push(d)
        }
        console.log(listt);
    }
    } catch (error) {
        
    }  
      

    if(DisplayCanvas!="Dijstra") return;
    requestAnimationFrame(Dijstra)//hàm này gọi đề quy để thực hiện animation
}

function isDuong(s,charx)
{
    let huong = Matrix[idPoint(s,point)][idPoint(charx,point)].dir
    if(direct==false)
    if(huong==-1) huong=1
    return (huong==1) 
}
function ktDuong(s,charx,t=0)
{
    let h,k,kp
    h=Matrix[idPoint(s,point)][idPoint(charx,point)].dir
    k=Matrix[idPoint(s,point)][idPoint(charx,point)].Number
    kp=Matrix[idPoint(charx,point)][idPoint(s,point)].Number
   
    if(direct==false) 
    {
        if(h==-1)
        {
            k = kp
            h=1
        }
        
    }
   
    let trongso=vc
    if(h==1)
    {
        trongso = k + t; 
    }
    return trongso
}
function k_nhonhat()
{
    clearInterval(x)
    if(bc==1) if(sound ) keyp.play();
    let tg=0
    if(timers.value==0)
    {
        bc=Maxbc
        return
    }
    x = setInterval(() => {
       if(runauto) tg+=1
       else tg=1
        if(tg>12)
        if(runauto&&bc<pointtmp.length&&bc<Maxbc)
        { 
            tg=0
            bc++
            if(sound &&bc<pointtmp.length &&bc<Maxbc) keyp.play();
        }
        let hien=""
        for(let z=0;z<tg;z++)
        {
           hien+="🟦"
        }
        outDijstra.innerText = "Đang tìm đường đi :"+(hien)
    }, parseInt(timers.value)/12);
    
    if(bc>=pointtmp.length) 
    {
        
        clearInterval(x)
    }
    
}

function paintpoint(s,k,x)
{
    ctx.beginPath()
    if(k==0)ctx.strokeStyle = "blue"
    else if(k==x-1&&to.children[to.selectedIndex].innerText!="All")ctx.strokeStyle = "purple"
    else ctx.strokeStyle = "#51a7f8"

    if(k==0||k==(x-1)) ctx.lineWidth = sizePoint *0.7
    else ctx.lineWidth = sizePoint *0.5
    ctx.arc(point[idPoint(s,point)].x, point[idPoint(s,point)].y, sizePoint*1.5, 0, 2*Math.PI)
    ctx.stroke()
    ctx.closePath()
}
function on0out1(input, list)
{
    for(let i=0;i<list.length;i++)
    {
        if(parseInt(input)  == parseInt(list[i][0])) return list[i][1]
    }
}
function on1out0(input, list)
{
    for(let i=0;i<list.length;i++)
    {
        if(parseInt(input)  == parseInt(list[i][1])) return list[i][0]
    }
}
function createduong(x,listtam)
{
    let listt =[]
    listt.push(listtam[x][0])
    var d
    while(d!=from.children[from.selectedIndex].innerText)
    {
        d = DijstraTable[idPoint(listt[listt.length-1],pointtmp)][on0out1(listt[listt.length-1],listtam)][1]+""
        listt.push(d)
    }
    let listlist=""
    for(let z=listt.length-1;z>=0;z--)
    {
        listlist+=" "+listt[z]
        if(z!=0) listlist+=" → "
    }
    return listlist
                     
}