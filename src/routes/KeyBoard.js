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

if ('addEventListener' in document) {
  window.addEventListener('load', function () {
    var FastClick = require('fastclick');
    FastClick.attach(document.body)
  }, false)
}

KeyBoard.propTypes = {
};

export default connect()(KeyBoard);
