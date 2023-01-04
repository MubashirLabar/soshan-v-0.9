const initState = {
  dialogID: null,
  cartItems: [],
  isAdmin: false,
};

const generalReducers = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "DIALOG_ID":
      return { ...state, dialogID: payload };
    case "USER_INFO":
      return { ...state, userInfo: action.payload };
    case "CART":
      return { ...state, cartItems: [...state.cartItems, ...action.payload] };
    case "UPDATE_LOGIN_STATUS":
      return { ...state, isAdmin: true };
    case "UPDATE_LOGOUT_STATUS":
      return { ...state, isAdmin: false };
    case "CART_UPDATE": {
      console.log(action.payload);
      const newCartItems = state.cartItems.map((item) => {
        if (item.id == action.payload.id) {
          return { ...item, Quantity: action.payload.Quantity };
        } else {
          return item;
        }
      });
      console.log(newCartItems);
      return { ...state, cartItems: [...newCartItems] };
    }
    case "CART_DELETE_ITEM": {
      console.log(action.payload);
      const newCartItems = state.cartItems.filter((item) => {
        if (item.id == action.payload.id) {
          return false;
        } else {
          return true;
        }
      });
      return { ...state, cartItems: [...newCartItems] };
    }
    default:
      return state;
  }
};

export default generalReducers;
