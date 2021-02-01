function Draw()
{    
    ctx.clearRect(0,0,c.width,c.height);//XÓA MÀNG HÌNH
    if(mouse.tool=="ADD"&& k!=undefined&&h!=undefined)
    {
        Matrix[k][h].dir = 1
        if(Matrix[h][k].dir==0) Matrix[h][k].dir=-1
        {
            if(isNumber)
            {
                let person
                while (true) {
                    person = prompt("Bạn hãy nhập Trọng Số", "1")
                    if(person==0)
                    {
                        alert(" Trọng số nhận giá trị (-∞, 0)∪(0 đến +∞) vui lòng nhập số khác 0")
                    }
                    else break
                }
                
                if(!isNaN(parseInt(person)))
                 Matrix[k][h].Number = parseInt(person)
                
            }
            SaveData()
        }
        
        h=undefined
        k=undefined
        if(sound) move.play()
    }
    let selectpoint=select.point
    if(mouse.tool=="ADD" && k!=undefined && mouse.click)
    {
        
        ctx.beginPath()
        ctx.strokeStyle="black"
        ctx.setLineDash([10,3])
        ctx.moveTo(point[k].x,point[k].y)
        ctx.lineTo(mouse.x,mouse.y)
        ctx.stroke();
        ctx.closePath()
        ctx.setLineDash([])
    }
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
    /* Đây là code liên quan đến hiệu ứng animation */
    
    //   vẽ cung trước
    for(let i = 0;i < line.length;i++)
    {
        if(select.point==undefined) line[i].Check() 
     
        if(mouse.click&& mouse.tool=="DEL"&&select.line!=undefined)
        {
            if(Matrix[line[select.line].point2.id][line[select.line].point1.id].dir==1)
            {
                Matrix[line[select.line].point1.id][line[select.line].point2.id].dir=-1
            }else 
            if(Matrix[line[select.line].point2.id][line[select.line].point1.id].dir==-1)
            {
                Matrix[line[select.line].point1.id][line[select.line].point2.id].dir=0
                Matrix[line[select.line].point1.id][line[select.line].point2.id].Number=0
            }
            if(sound) delp.play()
        }
        line[i].Paint()
        if(mouse.click&&mouse.tool=="SET"&&select.line!=undefined)
        {
            pName = prompt('Trọng số của đường thẳng là "'+Matrix[line[select.line].point1.id][line[select.line].point2.id].Number+'" thành ', Matrix[line[select.line].point1.id][line[select.line].point2.id].Number)
            mouse.click=false
            if(isNaN(parseInt(pName))&&pName!=null)
            {
                alert("Vui lòng nhập số!")
            }
            else 
            {
                Matrix[line[select.line].point1.id][line[select.line].point2.id].Number = parseInt(pName)
                SaveData()
            }
        }
        
        

    }
    select.point = undefined;//RESET LẠI VÙNG CHỌN point
    if(select.line==undefined) checkl = true
    select.line=undefined
    //   vẽ đỉnh sau
    for(let i = 0;i < point.length;i++)
    {
        point[i].Check()
        point[i].Paint()     
    }
    if(select.point==undefined) checkp = true
    matrixall()
    if(DisplayCanvas!="Draw")
    {

        if(DisplayCanvas!="Dijstra") Dijstra()

        return
    }
    requestAnimationFrame(Draw)//hàm này gọi đề quy để thực hiện animation
}