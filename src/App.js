import Navigation from "./routes/navigation/navigation.component";
import Home from "./routes/home/home.component";
import { Routes, Route } from "react-router-dom";
import Authentication from "./routes/authentication/authentication.component";
import { UserProvider } from "./contexts/user.context";

const Shop = () => {
 return <div>The Shop page</div>;
};

const App = () => {
 return (
  <Routes>
   <Route path='/' element={<Navigation />}>
    <Route index element={<Home />} />
    <Route path='shop' element={<Shop />} />
    <Route path='auth' element={<Authentication />} />
   </Route>
  </Routes>
 );
};

export default App;
