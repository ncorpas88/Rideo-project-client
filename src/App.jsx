import { Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./Pages/HomePage";
import ErrorPage from "./Pages/ErrorPage";
import Login from "./Pages/auth/Login";
import Signup from "./Pages/auth/Signup";
import UserProfilePage from "./Pages/UserProfilePage";
import FormUpdatePostPage from "./Pages/FormUpdatePostPage";
import FormUpdateProfilePage from "./Pages/FormUpdateProfilePage";
import FormCreatePostPage from "./Pages/FormCreatePostPage";
import DetailsPostPage from "./Pages/DetailsPostPage";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/signin" element={<Signup />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="*" element={<ErrorPage />}/>
      </Routes>
        {/*<UserProfilePage />
        <FormUpdatePostPage />
        <FormUpdateProfilePage />
        <FormCreatePostPage />
        <DetailsPostPage />*/}
      <Footer />
    </>
  );
}

export default App;
