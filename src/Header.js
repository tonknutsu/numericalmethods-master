import React from 'react'
import {Link} from 'react-router-dom';

class Header extends React.Component {
    render(){
        return(
            <div className = "header">
                   <ul class="header-ul">
                    <li class="header-li"><Link to ="/">Numerical Method</Link></li>
                    <li class="header-li"><Link to ="/About">About</Link></li>
                </ul>
            </div>
        )
    }
}

export default Header;