import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter,Route} from 'react-router-dom';
import Bisection from './Bisection';
import FalsePosition from './FalsePosition';
import Onepoint from './Onepoint';
import NewtonRaphson from './NewtonRaphson';


import About from './About';

ReactDOM.render(
    <BrowserRouter>
    <div>
    <Route exact path="/" component={App} />
    <Route path="/Bisection" component={Bisection} />
    <Route path="/FalsePosition" component={FalsePosition} />
    <Route path="/Onepoint" component={Onepoint} />
    <Route path="/NewtonRaphson" component={NewtonRaphson} />

    
  

    <Route path="/About" component={About} />
    </div>
    </BrowserRouter>,document.getElementById('root'));

/*ReactDOM.render(<App />, document.getElementById('root'));*/

//serviceWorker.unregister();