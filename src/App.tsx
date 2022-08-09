import { useState } from "react";
import StartScreen from "./components/StartScreen";
import Home from "./components/player";
import React from "react";

const App: React.FC = (): JSX.Element => {

  const [timer, setTimer] = useState<number>(0)

  const getTimerInfo = (e: any) => {
    const value: string = (e.target  as HTMLInputElement).value
    console.log(value)
  }

  return (
    <div className='w-screen'>
      <StartScreen getTimerInfo={getTimerInfo} />
      {/* <Home /> */}
    </div>
  );
};

export default App;
