import { Routes, Route  , Navigate} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import { Toaster } from 'react-hot-toast';
import MoreBooks from "./components/MoreBooks";
import SignUp from "./components/SignUp";
import Cartpage from "./components/Cartpage";
import Footer from "./components/Footer";
import { useAuth } from "./context/Authprovider";

function App() {
  const[authUser , setAuthUser] = useAuth();
  //  console.log(authUser);
  return (
    <div>
      {/* Removed Router here */}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
            path="/MoreBooks"
            element={authUser ? <MoreBooks /> : <Navigate to="/signup" />}
          />
            <Route path="/cartpage" element={<Cartpage />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;
