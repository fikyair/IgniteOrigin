import React from 'react';

class ToMail extends React.Component {

    componentDidMount(){
        let input = document.getElementById('email-input').value;
        console.log(input);
    }

    inputHandle (a) {
        let input = document.getElementById('email-input').value;
        console.log("input=>",input);
    }


    render(){
        return(
            <div>
                <div className="wrapper">
                    <input id='email-input' type='text' onInput={(e)=>this.inputHandle(e)}/>
                    <ul id='email-sug-wrapper' className='email-sug'></ul>
                </div>
            </div>
        )
    }
}

export default ToMail;