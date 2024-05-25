import { RouteObject, createBrowserRouter } from "react-router-dom";
import Resume from "@/pages/resume";
const routes: RouteObject[] = [
  {
    path: "/resume",
    element: <Resume />,
  },
];
export const router = createBrowserRouter(routes);
