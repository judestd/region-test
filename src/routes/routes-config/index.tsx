import type { RouteObject } from "react-router-dom"
import type { PageLayoutObject, RouteConfig } from "./types"

const routeConfigToRouteObj = <T extends PageLayoutObject>({
  wrapper = undefined,
  ...route_props
}: RouteConfig<T>) => {
  if (!!route_props.children && Array.isArray(route_props.children)) {
    route_props.children = route_props.children.map((d) =>
      routeConfigToRouteObj(d)
    )
  }
  return route_props as RouteObject
}

export const createRoutes = <PageLayouts extends PageLayoutObject>({
  routes,
}: {
  routes: RouteConfig<PageLayouts>[]
}) => {
  return routes.map((route: RouteConfig<PageLayouts>) =>
    routeConfigToRouteObj<PageLayouts>(route)
  ) as RouteObject[]
}
