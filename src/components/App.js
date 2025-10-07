import React, { useRef } from "react";
import "./../styles/App.css";

const App = () => {
  const arr = useRef(Array.from({length:150},(_,i)=>(i+1)));
  return <div style={{height:"500px",overflowX:"hidden",overflowY:"scroll",scrollbarWidth:"none",textAlign:"center"}}>
    {arr.current.map((v,i)=><Item n={i}  key={i+v}/>)}
  </div>;
};``
const Item = ({n}) => (
  <>
    <h1>Item {n} </h1>
    <p>Lorem ipsum dolor sit amet</p>
  </>
);
export default App;