import React from 'react';
import '../style/index.less';

let nowSelectIndex = 0;
class ToMail extends React.Component {


    state = {
        newData: [],
        nowSelectTipIndex: 0,
    }

    componentDidMount(){
        let input = document.getElementById('email-input1');
        input.onkeydown  = this.onkey;
    }

    onkey=(e)=>{
        let input = document.getElementById('email-input1');
        let li = document.querySelectorAll('li');
            if(e.keyCode === 38){
                e.preventDefault();
                if(nowSelectIndex === 0){
                    li[nowSelectIndex].className = '';
                    nowSelectIndex =li.length - 1;
                    li[nowSelectIndex].className = 'select';
                }else {
                    li[nowSelectIndex].className = '';
                    nowSelectIndex = nowSelectIndex -1;
                    li[nowSelectIndex].className = 'select';
                }
            }

        if (e.keyCode == 40) {
            if (nowSelectIndex == li.length - 1) {
                li[nowSelectIndex].className = "";
                nowSelectIndex = 0;
                li[nowSelectIndex].className = "select";
            }else {
                li[nowSelectIndex].className = "";
                nowSelectIndex = nowSelectIndex + 1;
                li[nowSelectIndex].className = "select";
            }
        }

        if (e.keyCode == 13) {
            input.value = li[nowSelectIndex].innerHTML;
            this.hide();
        }

    }

    hide=()=>{
        this.setState({
            newData: [],
        })
    }

    inputHandle=()=>{
        this.setState({
            newData: [],
        })
        let input = document.getElementById('email-input1').value;
        //只要文本内容变化就打印，得到的是即时的文本，都不触发
        this.create(input);
    }

    //生成提示框内容
    create(input){
        let  { newData } = this.state;
        let postfixList = ['163.com', 'gmail.com', '126.com', 'qq.com', '263.net'];
        let indextemp = input.indexOf('@');
        let postfix = input.slice(indextemp+1);//后缀
        let newPostFix = [];//新后缀
        let newDataPostFix = [];
        let inputWithOutPostFix = this.inputValueFormat(input);
        let list = document.querySelectorAll('li');
        //匹配后缀
        if(indextemp!=-1){
            for (let i = 0; i< postfixList.length; i++){
                if(postfixList[i].slice(0,postfix.length)=== postfix.trim()&&postfix){
                    newPostFix.push(postfixList[i]);
                }
            }
            for(let i = 0; i < newPostFix.length; i++){
                newDataPostFix.push(inputWithOutPostFix.trim()+'@'+newPostFix[i]);
            }
        }
        //不匹配显示全部
        if(newPostFix.length===0){
            for(let i = 0; i < postfixList.length; i++){
                newDataPostFix.push(inputWithOutPostFix.trim()+'@'+postfixList[i]);
            }

            if(list.length!=0){
                list[nowSelectIndex].className = '';
            }
        }

        if(input.length!=0){
            this.setState({
                newData: [...newDataPostFix],
            },()=>{
                let listTemp = document.querySelectorAll('li');
                nowSelectIndex = 0;
                listTemp[nowSelectIndex].className = 'select';
            })//疑问怎样优雅的解决setState异步的问题
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

    handleClick=(e)=>{
        let currentValue = e.target.innerHTML;
        document.getElementById('email-input1').value = currentValue;
        this.setState({
            newData: [],
        })
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
    // onkeyUp () {
    //     let input = document.getElementById('email-input4').value;
    //     console.log("input4=>",input);//按下松开才打印，得到的是即时的文本， 上下左右回车都会触发
    // }



    render(){
        const { newData = [] } = this.state;
        return(
            <div>
                <div className='wrapper'>
                    <input id='email-input1' type='text' onInput={this.inputHandle}/>
                    <ul id='email-sug-wrapper' className='email-sug' >
                        {
                            newData.map((v,k)=>{
                                return(
                                    <li key = {k} onClick={this.handleClick}>{v}</li>
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