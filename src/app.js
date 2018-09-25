import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
    render(){ // Every react component has a render method.
        return(
            <div>
            Hello World
        </div>
    );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));