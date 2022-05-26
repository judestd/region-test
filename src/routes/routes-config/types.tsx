import { RouteObject } from "react-router-dom"

export type PageLayoutObject<
  T extends Record<string, Function> = Record<string, Function>
> = T
export interface RouteConfig<E extends PageLayoutObject>
  extends Omit<RouteObject, "children"> {
  authenticated?: true
  wrapper?: keyof E
  children?: RouteConfig<E>[]
}
