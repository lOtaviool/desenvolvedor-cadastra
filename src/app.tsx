import React, { useEffect } from "react";
import { main } from "./ts/index";
import Home from "./pages/Home/home";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const App: React.FC = () => {
  useEffect(() => {
    main();
  }, []);

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <Home />
      </div>
    </QueryClientProvider>
  );
};

export default App;
