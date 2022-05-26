import React from "react"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Typography from "@mui/material/Typography"
import { CardActionArea } from "@mui/material"
import { ExpectRatioImageBox } from "../ContextTheme"
import { Box } from "@mui/system"

interface ICCountry {
  title: string
  text: string
  mt?: string
}

interface Props {
  data: {
    flags: { png: string }
    name: { common: string }
    population: number
    region: string
    capital: Array<string>
  }
}

export const CountryInfo = ({ title, text, mt }: ICCountry) => {
  return (
    <Box sx={{ mt: mt }}>
      <Typography variant="body2">{title}:</Typography>
      <Typography variant="body1">{` ${text}`}</Typography>
    </Box>
  )
}

export default function CountryCart({ data }: Props) {
  const formatNumber = (num: number) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
  }
  return (
    <>
      <Card
        sx={{
          backgroundColor: "background.default",
          color: "text.primary",
        }}
        className="cart-country"
      >
        <CardActionArea>
          <ExpectRatioImageBox>
            <CardMedia
              component="img"
              height="190"
              image={data?.flags?.png}
              alt="flag"
            />
          </ExpectRatioImageBox>
          <CardContent sx={{ padding: "1.5rem 1rem 2rem 1rem" }}>
            <Typography gutterBottom variant="subtitle1">
              {data?.name?.common || ""}
            </Typography>
            <Box>
              <CountryInfo
                title="Population"
                text={formatNumber(data?.population)}
              />
              <CountryInfo title="Region" text={data?.region} />
              <CountryInfo title="Capital" text={data?.capital?.[0]} />
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  )
}
