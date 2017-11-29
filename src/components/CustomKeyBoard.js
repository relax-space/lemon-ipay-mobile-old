import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Button } from 'antd-mobile';
import styles from './CustomKeyBoard.css';
import cs from 'classnames'//引入classnames依赖库

function CustomKeyBoard({dispatch, amt }) {
    function keyBoardItemClickHandler(el,op) {
        var val='';
        if(op == undefined){
            val = el.target.innerHTML;
        } else{
            val = op;
        }
        dispatch({
          type: 'customKeyBoard/itemClick',
          payload: {amt,val},
        });
      }
  return (
    <div className={styles.normal}>
        <div id="am-number-keyboard-container">
            <div data-reactroot="" className={cs({'am-number-keyboard-wrapper':true})}>
                <table>
                    <tbody>
                        <tr>
                            <td onClick={keyBoardItemClickHandler.bind(this)} className={cs({'am-number-keyboard-item':true})}>1</td>
                            <td onClick={keyBoardItemClickHandler.bind(this)} className={cs({'am-number-keyboard-item':true})}>2</td>
                            <td onClick={keyBoardItemClickHandler.bind(this)} className={cs({'am-number-keyboard-item':true})}>3</td>
                            <td onClick={keyBoardItemClickHandler.bind(this,null,'d')} className={cs({"am-number-keyboard-item":true,"keyboard-delete":true})} rowSpan="2"></td>
                        </tr>
                        <tr>
                            <td onClick={keyBoardItemClickHandler.bind(this)} className={cs({'am-number-keyboard-item':true})}>4</td>
                            <td onClick={keyBoardItemClickHandler.bind(this)} className={cs({'am-number-keyboard-item':true})}>5</td>
                            <td onClick={keyBoardItemClickHandler.bind(this)} className={cs({'am-number-keyboard-item':true})}>6</td>
                        </tr>
                        <tr>
                            <td onClick={keyBoardItemClickHandler.bind(this)} className={cs({'am-number-keyboard-item':true})}>7</td>
                            <td onClick={keyBoardItemClickHandler.bind(this)} className={cs({'am-number-keyboard-item':true})}>8</td>
                            <td onClick={keyBoardItemClickHandler.bind(this)} className={cs({'am-number-keyboard-item':true})}>9</td>
                            <td onClick={keyBoardItemClickHandler.bind(this,null,'c')} className={cs({"am-number-keyboard-item":true,"keyboard-confirm":true})} rowSpan="2">支付</td>
                        </tr>
                        <tr>
                            <td onClick={keyBoardItemClickHandler.bind(this)} className={cs({'am-number-keyboard-item':true})}>.</td>
                            <td onClick={keyBoardItemClickHandler.bind(this)} className={cs({'am-number-keyboard-item':true})}>0</td>
                            <td onClick={keyBoardItemClickHandler.bind(this,null,'h')} className={cs({"am-number-keyboard-item":true,"keyboard-hide":true})}></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  );
}

function mapStateToProps(state) {
  const { amt } = state.customKeyBoard;
  return {
    amt,
  };
}

export default connect(mapStateToProps)(CustomKeyBoard);
