import {RouterProvider, createBrowserRouter} from "react-router-dom";
import "./App.css";

import Document from "./components/Document/Document";
import DocumentsOverview from "./components/DocumentsOverview/DocumentsOverview";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DocumentsOverview></DocumentsOverview>,
  },
  {
    path: "document",
    element: <Document />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
