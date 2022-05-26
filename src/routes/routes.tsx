import { Pages } from "../pages"
import { createRoutes } from "./routes-config"

export const routes = createRoutes({
  routes: [
    {
      path: "/",
      element: <Pages.Home />,
    },
    {
      path: "/detail",
      element: <Pages.Detail />,
    },
  ],
})
