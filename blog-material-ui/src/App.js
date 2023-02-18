
import './App.css';
import { createBrowserRouter,  RouterProvider } from "react-router-dom";
import Layout from './components/Utility/Layout/Layout';
import Notfound from './components/Utility/NotFound/Notfound';
import Template from './components/Utility/Template/Template';
import SinglePost from './components/Home/Singlepost/SinglePost';
import Updatepost from './Pages/forms/Updatepost';
import Home from './Pages/Home/Home';
import Register from './Pages/Register/Register';
import Login from './Pages/Login/Login';
import Addpost from './Pages/forms/Addpost';
import ProtectedRoute from './context/ProtectedRoute';
function App() {
  let routes = createBrowserRouter([
  
    {path: "/", element: <Layout />,errorElement: <Notfound/>,children: [
      { index: true, element:<ProtectedRoute ><Template><Home/></Template></ProtectedRoute> },
      { path: "/add-post", element: <ProtectedRoute ><Template><Addpost/></Template></ProtectedRoute>  },
      { path: "/update-post/:id", element: <ProtectedRoute ><Template><Updatepost/></Template></ProtectedRoute>  },
      { path: "post/:id", element: <ProtectedRoute ><Template><SinglePost/></Template></ProtectedRoute>  },
      { path: "/register", element:  <Register/> },
      { path: "/login", element:  <Login/> },




    ]}

    ])
  return (
    <>
  <RouterProvider router={routes}/>

    </>
  );
}

export default App;
