import React from 'react'
import {Link} from 'react-router-dom';

class Sidebar extends React.Component {
    render(){
        return(
            <div>
                <ul className ="sidebar">
                    {/* <Link to ="/"><img></img></Link> */}
                    <div class="dropdown">
                        <button class="dropbtn">Chapter 1 
                            <i class="fa fa-caret-down"></i>
                        </button>
                            <div class="dropdown-content">
                                <Link to ="/Bisection"><li className ="button">Bisection</li></Link>
                                <Link to ="/FalsePosition"><li className ="button">False-Position</li></Link>
                                <Link to ="/Onepoint"><li className ="button">One-Point</li></Link>
                                <Link to ="/NewtonRaphson"><li className ="button">Newton-Raphson</li></Link>
                                
                            </div>
                    </div>
                   
                    
                   
                </ul>
            </div>
        )
    }
}

export default Sidebar;