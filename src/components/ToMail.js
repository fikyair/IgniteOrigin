import React from 'react';
import '../style/index.css';

class ToMail extends React.Component {


    state = {
        display: 'none',
        newData: [],

    }

    componentDidMount(){
       // let input = document.getElementById('email-input').value;
       // console.log(input);
    }

    keyupHandle=()=>{
        this.setState({
            display: 'none',
            newData: [],
        })
        let input = document.getElementById('email-input1').value;
        // console.log("input1=>",input.trim());//按下松开才打印，得到的是即时的文本， 上下左右回车都会触发
        this.create(input);
    }

    //生成提示框内容
    create(input){
        debugger
        console.log(input);
        input = this.inputValueFormat(input);
        let postfixList = ['163.com', 'gmail.com', '126.com', 'qq.com', '263.net'];
        let indextemp = input.indexOf('@');
        let postfix = input.slice(indextemp);//后缀
        let newPostFix = [];//新后缀
        //匹配后缀
        if(indextemp!=-1){
            for (let i = 0; i< postfixList.length; i++){
                if(postfixList[i].slice(0,postfix.length)=== postfix&&postfix){
                    newPostFix.push(postfixList[i]);
                }
            }

            if(newPostFix.length===0){
                newPostFix = postfix;
            }
        }else{
            newPostFix = postfix;
        }

        for(let i = 0; i < newPostFix.length; i++){
            newPostFix.push(input.trim()+'@'+newPostFix[i]);
        }
        if(input.length!=0){
            this.setState({
                display: 'inline-block',
                newData: [...newPostFix],
            })
        }
    }

    //对输入内容做处理
    inputValueFormat(value){
        if(value.indexOf('@')!=-1){
            let index = value.indexOf('@');
            const newValue = value.substring(0,index);
            return newValue;
        }else {
            return value;
        }
    }


    // keypressHandle(){
    //     let input = document.getElementById('email-input2').value;
    //     console.log("input2=>",input);//只要文本内容变化就打印，得到的是触发键盘事件前的文本, 只有回车会触发
    // }
    //
    // keydownHandle(){
    //     let input = document.getElementById('email-input3').value;
    //     console.log("input3=>",input);//只要文本内容变化就打印，得到的是触发键盘事件前的文本， 上下左右回车都会触发
    // }
    //
    // inputHandle () {
    //     let input = document.getElementById('email-input4').value;
    //     console.log("input4=>",input);//只要文本内容变化就打印，得到的是即时的文本，都不触发
    // }



    render(){
        const { newData = [] } = this.state;
        return(
            <div>
                <div className="wrapper">
                    <input id='email-input1' type='text' onKeyUp={this.keyupHandle}/>
                    {/*<input id='email-input2' type='text' onKeyPress={this.keypressHandle}/>*/}
                    {/*<input id='email-input3' type='text' onKeyDown={this.keydownHandle}/>*/}
                    {/*<input id='email-input4' type='text' onInput={this.inputHandle}/>*/}
                    <ul id='email-sug-wrapper' className='email-sug' >
                        {
                            newData.map((v,k)=>{
                                return(
                                    <li key = {k} >{v}</li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        )
    }
}

export default ToMail;