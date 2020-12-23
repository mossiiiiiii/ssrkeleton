import React, {Component} from 'react';
import {Switch , Route , Link} from 'react-router-dom';

function Menu(){
    return(
        <div>
            <ul>
                <li>
                    <Link  to={'/'} >Homepage</Link>
                </li>
                <li>
                    <Link to={'/contact'}>Contact</Link>
                </li>
            </ul>
        </div>
    )
}


function Home(){
    return(
        <div>
            <Menu/>
            Home
        </div>
    )
}

function Contact(){
    return(
        <div>
            <Menu/>
            Contact
        </div>
    )
}

 class App extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route path='/contact' component={Contact} />
                </Switch>
            </div>
        );
    }
}


export default App;
