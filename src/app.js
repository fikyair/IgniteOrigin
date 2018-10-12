import React from 'react';
import ReactDOM from 'react-dom';
import ToMail from './components/ToMail';

class App extends React.Component {
    render(){
        return(
            <ToMail />
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));