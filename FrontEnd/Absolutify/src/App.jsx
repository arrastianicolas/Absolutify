import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./components/login/Login";
import Home from "./components/home/Home";
import NotFound from "./components/notFound/NotFound";
import Playlits from "./components/playlits/Playlits";
import User from "./components/user/User";
import Configuration from "./components/configuration/Configuration";

const router = createBrowserRouter(
  [
    {
      path: "/home",
      element: <Home />,
      children: [
        { path: "playlists", element: <Playlits /> },
        { path: "perfil", element: <User /> },
        { path: "configuracion", element: <Configuration /> },
      ],
    },
    { path: "/", element: <Login /> },
    { path: "*", element: <NotFound /> },
  ],
  { basename: "/" }
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
