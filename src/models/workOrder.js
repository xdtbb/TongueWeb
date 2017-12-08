import pathToRegexp from 'path-to-regexp';
import {queryWorkOrder,addWorkOrder} from '../services/messageService';

export default {
  namespace: 'workOrder',
  state: {
    patientId:1,
    description:"",
    type:"",  //病人的问诊
    photos:[{
      id:0,
      url:"",
    }],
    time:"",
    sequences:[
      {
        workOrderId:1,
        patientId:1,
        sequenceId:1,
        description:"",
        type:"",
        photos:[{
          id:1,
          url:"",
          category:{}
        }],
        time:""
      }
    ]
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location)=>{
        console.log(location);
        const match= pathToRegexp('/workOrder/:workOrderId').exec(
          location.pathname
        );
        if(match){
          const workOrderId = match[1];
          dispatch({
            type:'query',
            payload:{
              workOrderId:workOrderId
            }
          })
        }
      })
    }
  },

  effects: {
    *query({payload},{call,put}){
      const data = yield call(queryWorkOrder,{
        ...payload
      });
      console.log("data",data);
      if(data.ok){
        yield put({
          type:'update',
          payload:data
        })
      }
    },
    *add({payload},{call,put}){
      const data = yield call(addWorkOrder,{
        ...payload
      });
      if(data.ok){
        yield put({
          type:'update',
          payload:data
        })
      }
    }
  },
  reducers: {
    update(state,action){
      console.log("action",action);
      return {...state,...action.payload}
    }
  },
};