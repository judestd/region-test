import DarkModeIcon from "@mui/icons-material/DarkMode"
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined"
import { Typography } from "@mui/material"
import { useTheme } from "@mui/material/styles"
import { Box } from "@mui/system"
import { useContext } from "react"
import { ColorModeContext } from "../ContextTheme"

export const Header = () => {
  const theme = useTheme()
  const colorMode = useContext(ColorModeContext)

  return (
    <Box
      sx={{
        bgcolor: "background.secondary",
        display: "flex",
        height: "80px",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.08)",
        padding: "0 5vw",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          alignItems: "center",
        }}
      >
        <Typography variant="subtitle1">Where in the world?</Typography>
        <Box
          sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          onClick={colorMode.toggleColorMode}
        >
          {theme.palette.mode === "dark" ? (
            <DarkModeIcon />
          ) : (
            <DarkModeOutlinedIcon />
          )}
          <Typography variant="body2" sx={{ ml: "0.5rem" }}>
            {theme.palette.mode === "dark" ? "Dark" : "Light"} Mode
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}
