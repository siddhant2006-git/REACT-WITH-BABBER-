import { useState } from "react";
import "./App.css";

function App() {
  const [counter, setCount] = useState(0);

  const onhandler = () => {
    setCount(counter + 1);
  };

  return (
    <div>
      <h1>Counter: {counter}</h1>

      <button onClick={onhandler}>
      
      
        Increase
      </button>
    </div>
  );
}

export default App;