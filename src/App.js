import Navigasi from "./Components/Navigasi";
import Home from "./Components/Home";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import QuranDetail from "./Components/QuranDetail";

export default function App() {



  return (
    <>
    <Navigasi />
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/quranDetail/:id" element={<QuranDetail/>}  />
    </Routes>
    </>
  )
}