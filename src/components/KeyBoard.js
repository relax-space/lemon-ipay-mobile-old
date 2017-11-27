import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { List, InputItem } from 'antd-mobile';
import styles from './KeyBoard.css';

function KeyBoard({ dispatch, list: dataSource, loading, total, page: current }) {
//   function pageChangeHandler(page) {
//     dispatch(routerRedux.push({
//       pathname: '/keyBoard',
//       query: { page },
//     }));
//   }  

  return (
    <div className={styles.normal}>
        <List>
            <InputItem type="money" placeholder="￥" clear>金额</InputItem>
        </List>
    </div>
  );
}

function mapStateToProps(state) {
  const { list, total, page } = state.keyBoard;
  return {
    // loading: state.loading.models.keyBoard,
    list,
    total,
    page,
  };
}

export default connect(mapStateToProps)(KeyBoard);
