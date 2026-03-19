import { BrowserRouter, Routes, Route } from "react-router-dom";
import HeaderComponent from "./components/HeaderComponent";
import ListEmployeeComponent from "./components/ListEmployeeComponent";
import EmployeeComponent from "./components/EmployeeComponent";
import FooterComponent from "./components/FooterComponent";



function App() {


  return (
    <>
    <BrowserRouter>
      <HeaderComponent/>
          <Routes>
          {/* adding --  http://localhost:5173 */}
          <Route path="/" element={<ListEmployeeComponent/>}></Route>

          {/* adding -- http://localhost:5173/employees */}
          <Route path="employees" element={<ListEmployeeComponent/>}></Route>

          {/* adding http://Localhost:5173/add-employee */}
          <Route path="add-employee" element={<EmployeeComponent/>}></Route>

          {/* adding http://Localhost:5173/update-employee/1 */}
          <Route path="/update-employee/:id" element={<EmployeeComponent/>}></Route>
         </Routes>
       <FooterComponent/>
    </BrowserRouter>
    </>
  )
}

export default App
