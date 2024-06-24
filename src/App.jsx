// import { useState } from "react";

import "./App.css";
import { Todo } from "./components/todo";
import { Completed } from "./components/completed";
function App() {
  // const [count, setCount] = useState(0);

  return (
    <div>
      <Todo></Todo>
      <Completed></Completed>
    </div>
  );
}

export default App;
