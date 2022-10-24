import React, { FC } from "react";
import { configureStore, createAction } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { createRoot } from "react-dom/client";
import { Provider, useDispatch, useSelector } from "react-redux";

const increment = createAction("increment");
const decrement = createAction("decrement");

const counter = (state = 0, action: any) => increment.match(action) ? state + 1 : decrement.match(action) ? state - 1 : state;

const root = combineReducers({ counter });

const timer = ({ dispatch }: { dispatch: any }) => {
     setInterval(() => dispatch(increment()), 1000);

     return (next: any) => (action: any) => {
          next(action);
     };
};

const store = configureStore({
     reducer: root,
     middleware: [timer],
});

const App:FC = () => {
     const dispatch = useDispatch();
     const counter = useSelector((state: any) => state.counter);

     return (
     <>
          <button onClick={() => dispatch(decrement())}>-</button>
               {counter}
          <button onClick={() => dispatch(increment())}>+</button>
     </>
     );
};

createRoot(document.getElementById("root")!).render(
     <Provider store={store}>
          <App />
     </Provider>
);