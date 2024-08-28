import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Layout from "./layout/Layout";
import MainPage from "./pages/MainPage";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<MainPage />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
