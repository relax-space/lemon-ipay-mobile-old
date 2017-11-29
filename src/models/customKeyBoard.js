export default {
    namespace: 'customKeyBoard',
    state: {
      amt: '',
    },
    reducers: {
      save(state, { payload: { amt } }) {
        return { ...state, amt };
      },
    },
    effects: {
        *itemClick({ payload: {amt,val} }, { call, put }) {
            var newAmt=amt;

            switch (val) {
                case 'd':
                    newAmt = amt.substring(0,amt.length-1);
                    break;
                case 'c':
                case 'h':
                    break;
                case '.':
                    var indexDot = amt.indexOf('.');
                    if(indexDot < 0){
                        if (amt == ''){
                            newAmt = amt + '0' + val;
                        }else{
                            newAmt = amt + val;
                        }
                    } 
                    break;
                default:
                    var indexDot = amt.indexOf('.');
                    if(indexDot >= 0){
                        if(amt.length - indexDot > 2){
                            break;
                        } else {
                            newAmt = amt + val;
                            break;
                        }
                    }
                    newAmt = parseFloat(amt + val) + '';
                    break;
              } 
            
              if(newAmt > 2000){
                  newAmt = amt;
              }
            
            // console.log(newAmt)
            yield put({ 
                type: 'save',
                payload: {
                    amt:newAmt,
                },
            });
          },
    },
    subscriptions: {
    },
  };
  