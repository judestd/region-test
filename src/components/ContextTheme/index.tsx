import { PaletteMode } from "@mui/material"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import React, { ReactNode } from "react"
import { styled } from "@mui/material/styles"
import Box from "@mui/material/Box"
import cookie from "js-cookie"
interface DarkThemeProviderProps {
  children: ReactNode
}

export const ExpectRatioImageBox = styled(Box)(({ theme }) => ({
  width: "100%",
  position: "relative",
  overflow: "hidden",
  margin: "0px",
  paddingTop: "56.25%",
  "& img": {
    height: "100%",
    objectFit: "cover",
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "100%",
    transform: "translate(-50%, -50%)",
  },
}))

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
})

const getDesignTokens = (mode: PaletteMode) => ({
  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          body1: "span",
          body2: "span",
          subtitle1: "div",
          h5: "p",
        },
      },
    },
  },
  typography: {
    body2: {
      fontSize: "14px",
      fontWeight: "600",
      lineHeight: "17px",
    },
    body1: {
      fontSize: "14px",
      lineHeight: "17px",
      fontWeight: "500",
    },
    subtitle1: {
      fontSize: "18px",
      lineHeight: "22px",
      fontWeight: "700",
    },
    h5: {
      fontSize: "24px",
      fonWeight: "700",
      lineHeight: "29px",
      marginBottom: "22px",
    },
  },
  button: {
    boxShadow: "0px 4px 12px rgb(0 0 0 / 8%)",
  },
  palette: {
    mode,
    ...(mode === "light"
      ? {
          text: {
            primary: "#000000",
          },
          background: {
            default: "#fff",
            secondary: "#fff",
          },
        }
      : {
          text: {
            primary: "#fff",
          },
          background: {
            default: "hsl(207, 26%, 17%)",
            secondary: "hsl(209, 23%, 22%)",
          },
        }),
  },
})

export function DarkThemeProvider({ children }: DarkThemeProviderProps) {
  const [mode, setMode] = React.useState<PaletteMode>(
    (cookie.get("paletteMode") as PaletteMode) || "light"
  )
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) =>
          prevMode === "light" ? "dark" : "light"
        )
        if (cookie.get("paletteMode") === "light") {
          cookie.set("paletteMode", "dark")
        } else {
          cookie.set("paletteMode", "light")
        }
      },
    }),
    []
  )

  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode])

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  )
}
