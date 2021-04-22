import React from 'react'
import Header from './Header';
import Sidebar from './Sidebar';

class About extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <Sidebar />
                    <div className="content">
                        <h1>About</h1>
                        <h3>Nuttamon Chianchana</h3>
                        <h3>6004062630167</h3>
                        <h3>Section 2</h3>
                    </div>

            </div>
        )
    }
}
export default About;