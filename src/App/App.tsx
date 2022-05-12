import * as React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";

import Home from "../item/components/Home";
import MainList from "../item/components/MainList/MainList";

const App: React.FC = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<Home />} path="/home" />
          <Route element={<MainList />} path="/list" />
          <Route element={<Home />} path="*" />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
