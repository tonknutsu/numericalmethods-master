import React from 'react'
import Header from './Header';
import Sidebar from './Sidebar';
import * as math from 'mathjs';
import Plot from 'react-plotly.js';
import {LineChart} from 'recharts';
import axios from 'axios';

var X,Y;
class FalsePosition extends React.Component {
    constructor(props) {
        super(props);
        X=[];
        Y=[];
        this.state={Arr:[],xl:"",xr:"",equation:"",submitted:true}; //ประกาศตัวแปร xl xr และ equation
        this.handleSubmit = this.handleSubmit.bind(this); //ประกาศฟังก์ชัน handleSubmit
        this.handleChange = this.handleChange.bind(this); //ประกาศฟังก์ชัน handleChange
        this.FalsePositionMethod=this.FalsePositionMethod.bind(this); //ประกาศฟังก์ชัน FalsePositionMethod
    }
    handleChange(event) {
        this.setState({[event.target.name]: event.target.value}); //ทำการเซตค่า xl xr equation ใหม่ให้เป็นไปตามที่ผู้ใช้กรอก
        this.setState({submitted:true});
        this.setState({Arr:[]});
    }
    handleSubmit(event) {
        let str=this.state.equation; //ให้ str = equation (สมการที่รับมา)
        let c=0;
        for(let i=0;i<str.length;i++){ //เข้าลูปเช็คว่ามี x หรือ X หรือไม่ (ดูว่าที่กรอกมาเป็นสมการหรือเปล่า)
          if(str[i]==="x"||str[i]==="X"){
            c++;
          }
        }
        if((str.length!==0)&&(c!==0)&&this.state.submitted&&this.state.xl!==""&&this.state.xr!==""){ //เช็คความยาวสมการต้องไม่เท่ากับ 0 และ c ที่เช็ค x ต้องไม่เท่ากับ 0 และ xl xr ต้องไม่ใช่ค่าว่าง
          axios
            .post("http://localhost:8000/FalsePosition/FalsePosition", {
              xl: parseFloat(this.state.xl),
              xr: parseFloat(this.state.xr),
              equation: this.state.equation
            })
            .then(res => {
              this.setState({result: res.data.result})
              console.log(this.state.result)
            })
            .catch(err => {
              console.log(err);
          });           
          this.FalsePositionMethod(); //ส่งไปที่ฟังก์ชัน FalsePositionMethod
          this.setState({submitted:false});
        }
        event.preventDefault();
      }
    FalsePositionMethod(event){
        X=[];
        Y=[];
          var func=(x)=>{ //ฟังก์ชันย่อยรับค่ามาแล้วส่งไปแทนในสมการ
              let scope={x:x}
              let code=math.compile(this.state.equation); //ทำการกระจายสมการ
              return code.eval(scope); //เอาค่าไปแทนในสมการแล้วรีเทิร์น
            };
          var err=(x0,x1)=>{return Math.abs((x1-x0)/x1)*100}; //ฟังก์ชันย่อยหาเออเร่อ
          var arr;
          var data={xl:0,xr:0,xm:0,err:"",fxl:0,fxr:0,fxm:0,count:1}; //ให้ดาต้าเริ่มต้นเป็น 0 ทั้งหมด
          var t=true;
          var xOld=0;
          data.xl=parseFloat(this.state.xl); //ให้ xl ในดาต้าเท่ากับ xl ที่รับเข้ามาตอนกรอก
          data.xr=parseFloat(this.state.xr); //ให้ xr ในดาต้าเท่ากับ xr ที่รับเข้ามาตอนกรอก

          while(t){
            data.xm=data.xr-((func(data.xr))*(data.xl-data.xr)/(func(data.xl))-(func(data.xr))); //หา xm
            data.fxl=(func(data.xl)).toFixed(6); //หา fxl
            data.fxr=(func(data.xr)).toFixed(6); //หา fxr
            data.fxm=(func(data.xm)).toFixed(6); //หา fxm

            data.err=err(xOld,data.xm); //หาเออเร่อ

            arr=this.state.Arr; //ให้ตัวแปร arr เท่ากับอาเรย์
            arr.push({xl:data.xl,xr:data.xr,xm:data.xm,err:data.err,fxl:data.fxl,fxr:data.fxr,fxm:data.fxm,count:data.count}); //ใส่ค่าใน arr เป็นค่าที่ใช้ไปแสดง
            if(func(data.xm)===0||data.count===15){ //เช็คว่าถ้า fxm = 0 หรือ ทำครบ 15 รอบแล้ว ให้ t เป็น false
              t=false;
            }
            else if(func(data.xl)*func(data.xm)<0){ //เช็คว่า fxl คูณกับ ​fxm แล้ว มีค่าน้อยกว่า 0 ให้ xr เป็น xm
              data.xr=data.xm;
            }
            else if(func(data.xl)*func(data.xm)>0){ //เช็คว่า fxl คูณกับ ​fxm แล้ว มีค่ามากกว่า 0 ให้ xl เป็น xm
              data.xl= data.xm;
            }
            data.count++;
            xOld=data.xm;
          }
          for(let i=-40;i<=40;i++){
            X.push(i);
            Y.push(func(i));
          }
    }

    render() {
        const DataRow=(props)=>{return (<tr><td>{props.data.count}</td> 
                                            <td>{props.data.xl}</td>
                                            <td>{props.data.xr}</td>
                                            <td>{props.data.xm}</td>
                                            <td>{props.data.fxl}</td>
                                            <td>{props.data.fxr}</td>
                                            <td>{props.data.fxm}</td>
                                            <td>{props.data.err}</td></tr>);}
                                            //ประกาศให้ DataRow เก็บค่าที่จะแสดงในตารางเอาไว้ แล้วส่งไปเมื่อมีคนเรียกใช้
        let rows=this.state.Arr.map(x =>{return <DataRow key={x.count} data={x}/>}); 
        return (
            <div>
                <Header/>
                <Sidebar />
                <div className="content">
                <form id="F" onSubmit={this.handleSubmit}>
                    <h1>FALSE POSITION</h1><br></br>
                        <h3>Equation :</h3>
                        <input name="equation" type="text" value={this.state.equation} onChange={this.handleChange} placeholder="Enter Equation"></input><br></br>
                        <h3>X<sub>L</sub> :</h3>
                        <input name="xl" type="text" step="any" value={this.state.xl} onChange={this.handleChange} placeholder="Enter Xl"></input><br></br>
                        <h3>X<sub>R</sub> :</h3>
                        <input name="xr" type="text" step="any" value={this.state.xr} onChange={this.handleChange} placeholder="Enter Xr"></input><br></br><br></br>
                        <button type="submit" value="Submit">Submit</button><br></br><br></br><br></br>
                </form>
            
                        {(this.state.submitted)
                        ? <div></div>
                        : <div><h3>{this.state.result}</h3><br></br><div id="T">
                            <center><table>
                            <thead>
                              <tr><th>Iteration</th>
                                  <th>X<sub>L</sub> </th>
                                  <th>X<sub>R</sub> </th>
                                  <th>X<sub>M</sub> </th>
                                  <th>F(X<sub>L</sub>)</th>
                                  <th>F(X<sub>R</sub>)</th>
                                  <th>F(X<sub>M</sub>)</th>
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

                        {(this.state.submitted)
                        ? <div></div>
                        : <center><div id="C">
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
                        </div></center>
                        }<br></br><br></br><br></br><br></br>
                </div>

            </div>
        )
    }
}
export default FalsePosition;