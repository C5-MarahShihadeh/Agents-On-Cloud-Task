import "./App.css";
import { Route, Routes } from "react-router-dom";
import CollapsibleExample from "../src/components/NavBar/NavBar";
import BasicExample from "../src/components/Login/Login";
import BasicExample2 from "../src/components/Register/Register";
import Homepage from "../src/components/Home/Home";
import FavoriteList from "./components/FavoriteList/FavoriteList";
import Cart from "./components/Cart/cart";
import AddBook from "./components/AddBook/AddBook";
import ImgOverlayExample from "./components/About-book/About-book"
function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/login"
          element={
            <>
              <CollapsibleExample />
              <BasicExample />
            </>
          }
        />
        <Route
          path="/register"
          element={
            <>
              <CollapsibleExample />
              <BasicExample2 />
            </>
          }
        />
        <Route
          path="/"
          element={
            <>
              <CollapsibleExample />
              <Homepage  />
            </>
          }
        />
        <Route
          path="/favorite"
          element={
            <>
              <CollapsibleExample />
              <FavoriteList />
            </>
          }
        />
        <Route
          path={"/cart"}
          element={
            <>
            
              <CollapsibleExample />
              <Cart />
            </>
          }
        />

   
       

        <Route
          path="/sell"
          element={
            <>
              <CollapsibleExample />
              <AddBook />
            </>
          }
        />

<Route
          path="/book/:id"
          element={
            <>
              <CollapsibleExample />
              < ImgOverlayExample/>
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
