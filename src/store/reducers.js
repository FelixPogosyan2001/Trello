import {combineReducers} from 'redux';
/*var initialState = {
  auth : {
    email :'',
  } ,
  reg : {

  }
}*/
const initialState = [];
export const reducer = (state = initialState,action) => {
  switch (action.type) {
    case 'Add_Data':
     return [
       ...state,
       {
         title : action.payload.title,
         description : action.payload.description
       }
     ]
  
  }
  return state;
}
