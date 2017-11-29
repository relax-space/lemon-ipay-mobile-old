import React from 'react';
import { connect } from 'dva';
import styles from './CustomKeyBoard.css';
import CustomKeyBoardComponent from '../components/CustomKeyBoard';

function CustomKeyBoard({amt}) {
  return (
    <div>
        <div ><input className={styles.payInput} value={amt} placeholder='支付金额' /></div>

        <CustomKeyBoardComponent />
    </div>
  );
}

CustomKeyBoard.propTypes = {
};

function mapStateToProps(state) {
  const { amt } = state.customKeyBoard;
  return {
    amt,
  };
}

export default connect(mapStateToProps)(CustomKeyBoard);
