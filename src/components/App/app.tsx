import { Suspense } from "react"
import { AllRoutes } from "../../routes/index"
export const App = () => {
  return (
    <Suspense>
      <AllRoutes />
    </Suspense>
  )
}
