import React from 'react'
import Header from './Header';//ที่เป็นส่วนหัวเรื่อง
import Sidebar from './Sidebar';
import * as math from 'mathjs';//ที่ใช้ในการคำนวณเลข
import Plot from 'react-plotly.js';//ใช้ในการพ้อทกราฟ
import {LineChart} from 'recharts';
import axios from 'axios';//ใช้ในการติดต่อ api

var X,Y;
class NewtonRaphson extends React.Component {
    constructor(props) {//เพื่อทำการกำหนดค่าเริ่มต้นให้กับตัวแปลต่างๆ
        super(props);
        X=[];
        Y=[];
        this.state={Arr:[],x0:"",equation:"",submitted:true}; //ประกาศตัวแปร x0 equation และ submitted 
        this.handleSubmit = this.handleSubmit.bind(this); //ประกาศฟังก์ชัน handleSubmit
        this.handleChange = this.handleChange.bind(this); //ประกาศฟังก์ชัน handleChange
        this.NewtonRaphsonMethod=this.NewtonRaphsonMethod.bind(this); //ประกาศฟังก์ชัน NewtonRaphsonMethod
    }
    handleChange(event) {
        this.setState({[event.target.name]: event.target.value}); //ทำการเซตค่า x0 และ equation เป็นฟังชั่นที่เปลี่ยนแปลงค่าตามที่ผู้ใช้กรอก
        this.setState({submitted:true});//เหมือนเป็นการแจ้งสถานะsubmit ว่ายังไม่ถูกsubmit นะ
        this.setState({Arr:[]});//เก็บค่า output ทั้งหมด  ถ้ามีการเปลี่ยนแปลง equation และ x0 อาเรย์จะถูกเซตเป็นค่าว่าง
    }
    handleSubmit(event) {
        let str=this.state.equation; //ให้ str = equation (สมการที่รับมา)
        let c=0;
        for(let i=0;i<str.length;i++){ //เข้าลูปเพื่อเช็คว่า มี x หรือ X หรือไม่ ในสมาการที่ยูเซอร์กรอกเข้ามา
          if(str[i]==="x"||str[i]==="X"){
            c++;
          }
        }
        if((str.length!==0)&&(c!==0)&&this.state.submitted&&this.state.x0!==""){ //เช็คความยาวสมการต้องไม่เท่ากับ 0 สมการต้องไม่ว่าง (ต้องมีสมการ)  และ  c ต้องไม่เท่ากับ 0  หมายความว่าต้องมีx อยู่ในสมการ
                                                                                //และ this.state.submitted ซับมิตต้องเป็น ทรูด้วยและ x0 ต้องไม่ใช่ค่าว่าง
          axios
          .post("http://localhost:8000/NewtonRaphson/NewtonRaphson", { //เป็นการส่งค่าผ่าน axios ไปยังดาต้าเบส นำค่าไปที่ localhost8000 โดยเรากำหนดให้ใข้ port8000 โดยเราส่งค่า x0 กับ equation 
            xl: parseFloat(this.state.x0),
            equation: this.state.equation
          })
          .then(res => {
            this.setState({result: res.data.result})
            console.log(this.state.result)
          })
          .catch(err => {
            console.log(err);
        });           
          this.NewtonRaphsonMethod(); //ส่งไปที่ฟังก์ชัน NewtonRaphsonMethod
          this.setState({submitted:false});
        }
        event.preventDefault();
    }
    NewtonRaphsonMethod(event){
        var func=(x)=>{// ต่อมาฟังชั่นย่อยโดยรับค่าที่เข้ามาอยู่ในตัวแปร x
            let scope={x:x}// ตั้งตัวแปรสโคปให้ เอ็ก เท่ากับ เอ็ก
            let code=math.compile(this.state.equation);// เป็นการกระจายสมการที่เข้ามา เหมือนตอนเข้ามามันจะเป็นคำ เราต้องแยกออก เพื่อหาว่าอันไหนคือ x แล้วนำไปใส่ในตัวแปรที่ชื่อ code
            return code.eval(scope);//เอาค่าที่ไปแทนในสมการรีเทินออกมา
        };
        var err=(x0,x1)=>{return Math.abs((x1-x0)/x1)*100};//เป็นฟังชั่นย่อย รับค่าที่ถูกส่งเข้ามา เอ็ก0 และ เอ็ก1 และรีเทินค่ากลับ ซึ่งก็คือเป็นฟังชันหาเออเร่อ
        var arr;
        var data={x0:0,err:"",fx:0,count:1};// สร้างตัวแปรเดต้าขึ้นมา มีตัวแปรย่อยคือ x0 err fx count
        var t=true;
        var xOld=parseFloat(this.state.x0);//เอ็กโอนเท่ากับพาดโฟส ก็คือ เอ็กโอน เท่ากับ x0 ที่เป็นค่าที่รับมาโดยแปลงเป็นประเภทโฟส
        while(t){//เข้าลูปวาย
          var diff = this.state.equation; //ปรธกาศตัวแปร ดิฟเท่ากับสมการที่เรารับเข้ามา
          diff = math.derivative(diff, 'x')//ให้ทำการดิฟสมการที่เรากรอกเข้ามา
          let scope={x:xOld}//ตั้งสโคปไว้ว่าให้ เอ็ก เท่ากับ เอ็กโอน
          data.x0=xOld-(func(xOld)/(diff.evaluate(scope)));//ส่งค่า เอ็กโอน ไปยังฟังชั่น ฟังซี เพื่อนำค่าไปแทนในสมการที่เรายังไม่ได้ดิฟ  และหารด้วย ค่าในสโคปที่นำมาดิฟ
          data.fx=func(data.x0);//ส่งค่าเอ็ก0 ไปแทนในสมการ และเก็บไว้ในตัวแปร fx
          data.err=err(xOld,data.x0).toFixed(4);//หาเออเร่อในฟังชั่นเออเร่อ โดยนำค่า เอ็กโอน เอ็ก0 ส่งไป
          arr=this.state.Arr;
          if(data.err<=0||data.count>15){//ถ้าเออเร่อ น้อยกว่าเท่ากับ 0 แล้ว หรือ เกิน15รอบแล้ว
            t=false;//เราจะออกนอกลูปวาย
          }else{
            arr.push({x0:data.x0,err:data.err,count:data.count});//จะใส่ค่าไว้ในอาเรย์ต่อ
          }
          data.count++;//เค้าท์จะบวกไปเรื่อยๆ
          xOld=data.x0;//และเซ็ทให้่ เอ็กโอนเท่ากับเอ็ก0
        }
        for(let i=-40;i<=40;i++){//หมายถึงระยะในกรอบ 40 ถึง -40
          X.push(i);
          Y.push(func(i));
        }
    }

    render() {
        const DataRow=(props)=>{return (<tr><td>{props.data.count}</td> 
                                            <td>{props.data.x0}</td>
                                            <td>{props.data.err}</td></tr>);}
                                            //ประกาศให้ DataRow เก็บค่าที่จะแสดงในตารางเอาไว้ แล้วส่งไปเมื่อมีคนเรียกใช้
        let rows=this.state.Arr.map(x =>{return <DataRow key={x.count} data={x}/>}); //ใส่ค่าเอ้าพุด ลงไปในตาราง
        return (
            <div>
                <Header/> 
                <Sidebar />
                <div className="content">
                <form id="F" onSubmit={this.handleSubmit}>
                    <h1>NEWTON RAPHSON</h1><br></br>
                        <h3>Equation :</h3>
                        <input name="equation" type="text" value={this.state.equation} onChange={this.handleChange} placeholder="Enter Equation"></input><br></br>
                        <h3>X[0] :</h3>
                        <input name="x0" type="text" step="any" value={this.state.x0} onChange={this.handleChange} placeholder="Enter X[0]"></input><br></br><br></br>
                        <button type="submit" value="Submit">Submit</button><br></br><br></br><br></br>
                </form>

                        {(this.state.submitted)//เมื่อเรากดซับมิต จะมีตารางขึ้นมาแสดงค่าที่เรากดหนดไว้ข้างต้น
                        ? <div></div>
                        : <div><h3>{this.state.result}</h3><br></br><div id="T"> 
                            <center><table>
                            <thead>
                              <tr><th>Iteration</th>
                                  <th>X </th>
                                  <th>Error</th>
                              </tr>
                            </thead>
                            <tbody>
                              {rows}
                            </tbody>
                        </table></center>
                        </div>
                        </div>
                        
                        }<br></br><br></br><br></br><br></br> 

                        <center><div id="C">
                        <LineChart Data={this.state.Arr}/>
                        <div>
                            <Plot
                                data={[
                                    {
                                        x:X,
                                        y:Y,
                                        type:'scatter'
                                    }
                                ]}
                                latout={{width:500,height:300}}
                            />
                        </div>
                        </div></center><br></br><br></br><br></br><br></br>
                </div>

            </div>
        )
    }
}//การทำงานส่วน api เมื่อเราส่งค่าไปยัง localhost ผ่านตัว axios แล้วเราไปที่ app.js 
export default NewtonRaphson;