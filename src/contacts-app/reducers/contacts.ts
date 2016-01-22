import * as actions from '../actions/contacts';

export const contacts = (state = [], action) => {
  switch(action.type){
    case actions.ADD_CONTACT:
      return state.concat([action.payload]);
    case actions.DELETE_CONTACT:
      return state.filter(contact => {
        return contact.id !== action.payload.id;
      });
    case actions.UPDATE_CONTACT:
      return state.map(contact => {
        return contact.id === action.payload.id ? Object.assign({},action.payload) : contact;
      });
    case actions.POPULATE_CONTACTS:
      return [...action.payload];
    default:
      return state;
  }
}

export const selectedContact = (state = null, action) => {
  switch(action.type){
    case 'SELECT_CONTACT':
      return action.payload;
    default:
      return state;
    
  }
}
