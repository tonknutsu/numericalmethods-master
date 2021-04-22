import React, { Component } from 'react';
import {Input} from 'antd';
import * as math from 'mathjs';


var MatrixA=[],MatrixB=[],Output=[],A=[],B=[],C=0;
class Matrix extends Component{
  constructor(props){
    super(props);
    this.state={showMatrix:false,showOutput:false,N:""};
    this.handleChange=this.handleChange.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
    this.clear=this.clear.bind(this);
    this.MIM=this.MIM.bind(this);
  }
  createMatrix(n) {
        for (var i=1 ; i<=n ; i++) {
            for (var j=1 ; j<=n ; j++) {
                MatrixA.push(<Input style={{
                    width: "10%",
                    height: "40%",
                    fontSize: "18px",
                    marginInlineEnd: "5%",
                    marginBlockEnd: "5%",
                }}
                type="number"
                className="input is-primary"
                id={"a"+i+""+j} key={"a"+i+""+j}
                placeholder={"a"+i+""+j} />)
            }
            MatrixA.push(<br key={"br"+i}/>)
            MatrixB.push(<Input style={{
                width: "10%",
                height: "40%",
                fontSize: "18px",
                marginInlineEnd: "5%",
                marginBlockEnd: "5%",
            }}
            type="number"
            className="input is-danger"
            id={"b"+i} key={"b"+i}
            placeholder={"b"+i} />)
        }
    }

    clear(event){
      event.preventDefault();
      this.setState({showMatrix:false,showOutput:false,N:""});
      MatrixA=[];
      MatrixB=[];
      Output=[];
    }

    handleSubmit(event) {
      let N=parseInt(this.state.N);
      if(N!==0||N!==""){
        this.createMatrix(N);
        this.setState({showMatrix:true});
      }
      event.preventDefault();
    }

    handleChange(event) {
      this.setState({[event.target.name]: event.target.value});
      this.setState({showMatrix:false,showOutput:false});
      MatrixA=[];
      MatrixB=[];
    }

    initMatrix() {
      A=[];
      B=[];
      C=0;
      Output=[];
        for(var i=0 ; i<this.state.N ; i++) {
            A[i] = []
            for(var j=0 ; j<this.state.N ; j++) {
                A[i][j] = (parseFloat(document.getElementById("a"+(i+1)+""+(j+1)).value));
            }
            B.push(parseFloat(document.getElementById("b"+(i+1)).value));
        }
    }
    printFraction (value) {
        return math.format(value, { fraction: 'ratio' })
    }
    MIM(n) {
        this.initMatrix();
        try {
            A = math.inv(A);
            /*for (var i=0 ; i<n ; i++) {
                for (var j=0 ; j<n ; j++) {
                    if (!Number.isInteger(A[i][j])) {
                        A[i][j] = this.printFraction(math.fraction(A[i][j]));
                    }

                }
            }*/
            for (let i=0 ; i<n ; i++) {
                for(let j=0 ; j<n ; j++) {
                    Output.push(A[i][j]);
                }
            }

        } catch (error) {

        }
        this.setState({showOutput: true});
    }

    render() {
      const DataRow=(props)=>{return (<tr><td>{C+1}</td>
                                          <td>{Output[C++]}</td>
                                          {/* <td><progress class="progress is-danger" value={props.data.err} max="100">{props.data.err}%</progress></td> */}
                                          </tr>);
                                           }
      let rows=Output.map(x =>{return <DataRow key={C+1}/>});
      return (
        <div className="columns has-background-light">
                    <div className="column is-2">
                        <a href="#N"><div className="box has-text-centered is-custom">
                            <strong>Enter N</strong>
                        </div></a>

                        <br/><br/>
                        <a href="#M"><div className="box has-text-centered is-custom">
                            <strong>Matrix</strong>
                        </div></a>
                        <br/><br/>
                        <a href="#O"><div className="box has-text-centered is-custom">
                            <strong>Output</strong>
                        </div></a>
                        <br/><br/>
                    </div>
                    <div className="column is-10 is-custom">
                        <form id="N"  onSubmit={this.handleSubmit}>
                        <h1 className="title is-1 has-text-danger"><strong>Enter Matrix dimentions</strong></h1>
                        <hr className="is-divider"/>
                        <div className="field has-addons">
                            <p className="control">
                              <a className="button is-static is-large" href="#undefined" >
                                  N :
                              </a>
                            </p>
                            <p className="control">
                                <input className="input is-black is-large" name="N" type="number" style={{width:"100vh"}} value={this.state.N} onChange={this.handleChange} min="2" max="10" placeholder="Enter Matrix dimentions" />
                            </p>
                        </div>
                        <br/>
                        <div className="field has-addons">
                            <div className="control">
                                <input type="submit" value="Submit" className="button is-success is-rounded"/>
                            </div>
                            <div className="control">
                                <button className="button is-warning is-rounded" onClick={this.clear}>  Reset  </button>
                            </div>
                        </div>
                        </form>


                        <div>
                        {(this.state.showMatrix)&&
                          <div id="M" className="box has-background-light">
                              <h1 className="title is-1 has-text-danger"><strong>Enter Matrix values</strong></h1>
                              <hr className="is-divider"/>
                                  <div>
                                      <strong className="title is-3 has-text-dark">Enter Matrix values :</strong>
                                      <br/><br/>
                                      <div>{MatrixA}</div>
                                      <br/><br/>
                                      <strong className="title is-3 has-text-dark">Enter Vector values :</strong>
                                      <br/><br/>
                                      <div>{MatrixB}</div>
                                  </div><br/><br/>
                              <div className="field has-addons">
                                  <div className="control">
                                      <button className="button is-success is-rounded" onClick={()=>this.MIM(this.state.N)}>  Submit  </button>
                                  </div>
                              </div>
                          </div>
                        }
                        </div><br/>



                    <div>
                    {(this.state.showOutput)&&
                      <div id="O" className="box has-background-light">
                          <h1 className="title is-1 has-text-dark"><strong>Output</strong></h1>
                          <hr className="is-divider"/>
                          <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth ">
                          <thead>
                            <tr><th>N</th>
                                <th>Xn</th>
                            </tr>
                          </thead>
                          <tbody>
                              {rows}
                          </tbody>
                      </table>
                      </div>
                    }
                  </div>
              </div>
        </div>
      );
    }
}
export default Matrix;
