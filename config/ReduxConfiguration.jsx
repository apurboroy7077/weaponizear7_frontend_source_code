import { createStore } from "redux";

let initialState = {
  userData: null,
  cartData: [],
  search: "",
  customerOrders: [
    { name: "m416", quantity: 3 },
    { name: "akm", quantity: 5 },
    { name: "vector", quantity: 2 },
    { name: "scar-l", quantity: 3 },
  ],
  productData: [
    {
      name: "M416",
      price: "130",
      description: "Excellent Performence, High Durability.",
    },

    {
      name: "AKM",
      price: "150",
      description: "Powerful Assault Rifle, High Damage.",
    },
    {
      name: "SCAR-L",
      price: "140",
      description: "Versatile Rifle, Accurate Shots.",
    },
    {
      name: "UMP45",
      price: "120",
      description: "Submachine Gun, Good Stability.",
    },
    {
      name: "AWM",
      price: "300",
      description: "Bolt Action Sniper Rifle, High Accuracy.",
    },
    {
      name: "Vector",
      price: "110",
      description: "Fast Firing SMG, Low Recoil.",
    },
    {
      name: "M16A4",
      price: "135",
      description: "Burst Fire Assault Rifle, Precise Shots.",
    },
    {
      name: "S686",
      price: "100",
      description: "Double-Barrel Shotgun, Close-Range Power.",
    },
    {
      name: "Kar98k",
      price: "280",
      description: "Classic Sniper Rifle, Deadly Precision.",
    },
    {
      name: "DP-28",
      price: "160",
      description: "Light Machine Gun, Decent Damage Output.",
    },
    {
      name: "Mini14",
      price: "170",
      description: "Semi-Automatic Rifle, Good for Long Range.",
    },
  ],
};
let reducer = (state = initialState, action) => {
  if (action.type == "LOGIN") {
    let userData = action.payload;
    let newState = {
      ...state,
      userData: userData,
    };
    return newState;
  } else if (action.type == "LOGOUT") {
    let newState = {
      ...state,
      userData: null,
    };
    return newState;
  } else if (action.type == "ADD_TO_CART") {
    let myCart = [...state.cartData];
    let addedItem = action.payload;
    addedItem = { ...addedItem, quantity: 1 };
    myCart.push(addedItem);
    let newState = {
      ...state,
      cartData: myCart,
    };
    return newState;
  } else if (action.type == "DELETE_FROM_CART") {
    let theCartData = [...state.cartData];
    theCartData = theCartData.filter((data) => data.name != action.payload);
    let newState = {
      ...state,
      cartData: theCartData,
    };
    return newState;
  } else if (action.type == "CLEAR_CART") {
    let newState = {
      ...state,
      cartData: [],
    };
    return newState;
  } else if (action.type == "UPDATE_CART_ITEM_QUANTITY") {
    let name = action.payload.name;
    let updatedQuantity = Number(action.payload.quantity);
    let myCart = [...state.cartData];
    for (let i = 0; i < myCart.length; i++) {
      let item = myCart[i];
      if (name == item.name) {
        item.quantity = updatedQuantity;
      }
    }
    let newState = {
      ...state,
      cartData: myCart,
    };
    return newState;
  } else if (action.type == "SEARCH") {
    let searchValue = action.payload;
    let newState = {
      ...state,
      search: searchValue,
    };
    return newState;
  } else if (action.type == "ADD_SAVED_CART_DATA") {
    let newState = {
      ...state,
      cartData: action.payload,
    };
    return newState;
  } else {
    return state;
  }
};
let myStore = createStore(reducer);
export { myStore };
