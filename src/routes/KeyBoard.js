import React from 'react';
import { connect } from 'dva';
import KeyBoardComponent from '../components/KeyBoard';

function KeyBoard() {
  return (
    <div>
        <KeyBoardComponent />
    </div>
  );
}

KeyBoard.propTypes = {
};

export default connect()(KeyBoard);
