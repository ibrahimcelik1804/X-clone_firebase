import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import FeedPage from "./pages/FeedPage";
import ProtectedRoute from "./pages/ProtectedRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<FeedPage />} />
          <Route path="/1" element={<h1> özel sayfa1 </h1>} />
          <Route path="/2" element={<h1> ayar sayfası </h1>} />
          <Route path="/3" element={<h1>like sayfası </h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
