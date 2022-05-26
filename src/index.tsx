import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import "./assets/styles/global.scss"
import { App } from "./components/App"
import reportWebVitals from "./reportWebVitals"
import { DarkThemeProvider } from "./components/ContextTheme"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <DarkThemeProvider>
        <App />
      </DarkThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
)

reportWebVitals()
