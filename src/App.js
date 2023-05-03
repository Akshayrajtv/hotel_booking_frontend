import "./App.css";
import Navbar from "./components/Navbar";
import {BrowserRouter,Route,Routes,Link} from 'react-router-dom'
import Homescreen from "./screens/Homescreen";
import BookingScreen from "./screens/BookingScreen";
import Register from "./screens/Register";
import Login from "./screens/Login";


function App() {
    return (
        <div classNameName="App">
            <Navbar />
            <BrowserRouter>
              <Routes>
              <Route path="/home" exact Component={Homescreen} />         
              <Route path='book/:id/:fromdate/:todate' element={<BookingScreen/>}/>
              <Route path="/register" exact Component={Register}/>
              <Route path="/login" exact Component={Login}/>

              </Routes>
              
            </BrowserRouter>

        </div>
    );
}

export default App;
