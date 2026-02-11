import BlockGame from "./components/BlockGame";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/play" element={<BlockGame />} />
    </Routes>
  );
}
