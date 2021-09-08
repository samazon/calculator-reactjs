import './Calculator.css';

import React, {useState} from 'react'

var mexp = require('math-expression-evaluator');

const Calculator = () => {

    const [input, setInput] = useState('');
    const [expressions, setExpression] = useState([]);

    const handleInputViaBtn = (val) => {
        switch (val) {
            case 'C':
                return setInput('');
            case 'CE':
                return setInput(input.slice(0, input.length - 1));
            case '=':
                // let incomingExp = input;
                // console.log('incomingExp', incomingExp)
                // var value = mexp.eval(input);  
                // console.log('value:', value);
                // var output = {}
                var lexed = mexp.lex(input);  
                // console.log('lexed:', lexed)
                var postfix = lexed.toPostfix();  
                // console.log('postfix:', postfix.value)
                var result = postfix.postfixEval(); 
                var output = {
                    infix: input.toString(),
                    postfix: postfix.value,
                    result: result
                }
                setExpression((expressions) => [
                    ...expressions,
                    output
                ])
                // console.log('output:', output)
                return setInput(`${input}=${result}`)
            default:
               return setInput(input + val);
        }
    }
    return (
        <div className="Wrapper">
            <div className="Calculator">
                <div className="text">{input}</div>
                <div className="Btns">
                    <button className="Btn" onClick={()=> handleInputViaBtn('(')}>&#40;</button>
                    <button className="Btn" onClick={()=> handleInputViaBtn('CE')}>CE</button>
                    <button className="Btn" onClick={()=> handleInputViaBtn(')')}>&#41;</button>
                    <button className="Btn" onClick={()=> handleInputViaBtn('C')}>C</button>
                    <button className="Btn" onClick={()=> handleInputViaBtn('1')}>1</button>
                    <button className="Btn" onClick={()=> handleInputViaBtn('2')}>2</button>
                    <button className="Btn" onClick={()=> handleInputViaBtn('3')}>3</button>
                    <button className="Btn" onClick={()=> handleInputViaBtn('+')}>+</button>
                    <button className="Btn" onClick={()=> handleInputViaBtn('4')}>4</button>
                    <button className="Btn" onClick={()=> handleInputViaBtn('5')}>5</button>
                    <button className="Btn" onClick={()=> handleInputViaBtn('6')}>6</button>
                    <button className="Btn" onClick={()=> handleInputViaBtn('-')}>-</button>
                    <button className="Btn" onClick={()=> handleInputViaBtn('7')}>7</button>
                    <button className="Btn" onClick={()=> handleInputViaBtn('8')}>8</button>
                    <button className="Btn" onClick={()=> handleInputViaBtn('9')}>9</button>
                    <button className="Btn" onClick={()=> handleInputViaBtn('*')}>x</button>
                    <button className="Btn" onClick={()=> handleInputViaBtn('.')}>.</button>
                    <button className="Btn" onClick={()=> handleInputViaBtn('0')}>0</button>
                    <button className="Btn" onClick={()=> handleInputViaBtn('=')}>=</button>
                    <button className="Btn" onClick={()=> handleInputViaBtn('/')}>&#247;</button>
                </div>
            </div>
            {expressions.length !== 0 && 
                <div className="Output">
                {
                    expressions.map(item => {
                       return (
                           <div className="result-item">
                               <div><strong>{`==>`}</strong>{item.infix}</div>
                               <div><strong>{`~>`}</strong>{item.postfix.map(i=> {
                                   if(i.show === '&times;'){
                                       return <span>*</span>
                                   } else if(i.show === '&divide;'){
                                        return <span>/</span>
                                   } else {
                                     return <span>{i.show}</span>
                                   }
                               })}</div>
                               <div><strong>{`==`}</strong>{item.result}</div>
                           </div>
                       )
                   })
                }
                </div>
            }
        </div>
    )
}

export default Calculator
