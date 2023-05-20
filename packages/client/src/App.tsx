import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/component";
import EditAttendance from "./pages/editAttendance/component";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/edit/:attendaceId" element={<EditAttendance />} />
        <Route path="/*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
