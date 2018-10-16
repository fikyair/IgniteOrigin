import React from 'react';
import ReactDOM from 'react-dom';
import ToMail from './components/ToMail';
import SmartSeller from "./components/SmartSeller";

class App extends React.Component {
    render(){
        return(
            <SmartSeller />
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));