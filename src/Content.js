import React from 'react'

class Content extends React.Component {
    render() {
        return (
            <div className="content">
                <h1>WELCOME</h1>
            </div>
        )
    }
}
export default Content;























    // state = {
    //     equation: '',
    // }

    // updateEquation = (value) => {
    //     const equation = this.state.equation;

    //     this.setState({
    //         equation: equation + value
    //     });

    //     //this.state.equation = equation + value;
    // }

    // clearEquation = () => {
    //     this.setState({
    //         equation: ''
    //     })
    // }
    
    // getAnswer = () => {
    //     const equation = this.state.equation;
    //     try {
    //         this.setState({
    //             equation: eval
    //             (equation),
    //         })
    //     } catch (error) {
    //         this.setState({
    //             equation: "Error"
    //         })
    //     }
    // }

    // render() {
    //     return (
    //         <div className="content">
    //             <div className="page-container">
    //                 <div className="main-container">
    //                     <div className="calculator">
    //                         <input value={this.state.equation} id="number-input" />
    //                         <div id="button-container">
    //                             <div className="button-row">
    //                                 <button onClick={() => this.updateEquation("7")} >7</button>
    //                                 <button onClick={() => this.updateEquation("8")} >8</button>
    //                                 <button onClick={() => this.updateEquation("9")} >9</button>
    //                                 <button onClick={() => this.updateEquation("+")} >+</button>
    //                             </div>
    //                             <div className="button-row">
    //                                 <button onClick={() => this.updateEquation("4")} >4</button>
    //                                 <button onClick={() => this.updateEquation("5")} >5</button>
    //                                 <button onClick={() => this.updateEquation("6")} >6</button>
    //                                 <button onClick={() => this.updateEquation("-")} >-</button>
    //                             </div>
    //                             <div className="button-row">
    //                                 <button onClick={() => this.updateEquation("1")} >1</button>
    //                                 <button onClick={() => this.updateEquation("2")} >2</button>
    //                                 <button onClick={() => this.updateEquation("3")} >3</button>
    //                                 <button onClick={() => this.updateEquation("*")} >*</button>
    //                             </div>
    //                             <div className="button-row">
    //                                 <button onClick={() => this.updateEquation("0")} >0</button>
    //                                 <button onClick={() => this.updateEquation(".")} >.</button>
    //                                 <button onClick={() => this.clearEquation("c")} >c</button>
    //                                 <button onClick={() => this.updateEquation("/")} >/</button>
    //                             </div>
    //                             <button onClick={() => this.getAnswer()} id="equal">=</button>
    //                         </div>

    //                     </div>
    //                     <div className="history">
    //                         <div id="history-label">History</div>

    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     )
    // }
// }

// export default Content;