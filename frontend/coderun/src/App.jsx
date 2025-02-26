import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import CodeRunApp from "./components/CodeRunApp";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <CodeRunApp></CodeRunApp>
    </>
  );
}

export default App;
