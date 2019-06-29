import {combineReducers} from 'redux';

const initialState = [];
const reducer_cards = (state = initialState,action) => {
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

const reducer_color  = (state = {},action) => {
  switch (action.type) {
    case 'Change_Color':
      var id = action.payload.id;
      return {
        ...state,
        [id] : action.payload.work
      }
  }
  return state
}
export default combineReducers({
  cards : reducer_cards,
  color : reducer_color
});
