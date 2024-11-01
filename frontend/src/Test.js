import React from 'react';
import { reducerCases } from "../src/context/Constants.js";
import { useStateProvider } from "../src/context/StateContext.jsx";

const Test = () => {
  const [{ userInfo, newUser }, dispatch] = useStateProvider();

  console.log(userInfo);

  return (
    <div>
      <div>Full success</div>
    </div>
  );
};

export default Test;
