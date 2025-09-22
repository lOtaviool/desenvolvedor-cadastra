import React, { useEffect } from "react";
import { main } from "./ts/index";
import Home from "./pages/home";

const App: React.FC = () => {
  useEffect(() => {
    main();
  }, []);

  return (
    <div>
      <Home />
    </div>
  );
};

export default App;
