import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import { Typography } from "@mui/material"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import LinearProgress from "@mui/material/LinearProgress"
import Button from "@mui/material/Button"
import { Link } from "react-router-dom"
import { ExpectRatioImageBox } from "../ContextTheme"
import { CountryInfo } from "../CountryCart"
interface Props {
  dataDetail?: {
    flags: { png: string }
    name: { common: string; nativeName: Object }
    population: string
    region: string
    subregion: string
    capital: Array<string>
    tld: Array<string>
    currencies: Object
    languages: Object
  }
  isLoading?: boolean
  bordersContries?: Array<ItemBordersContries>
}

interface ItemBordersContries {
  name: { common: string }
}

export default function DetailPage({
  dataDetail,
  isLoading,
  bordersContries,
}: Props) {
  const parseLanguages = (object: object) => {
    const values = Object.values(object)
    return values[values.length - 1]
  }

  return (
    <div className="content-body-detail">
      {isLoading ? (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      ) : (
        <>
          <Link to="/">
            <Button
              sx={{ bgcolor: "background.secondary" }}
              className="btn-back"
            >
              <ArrowBackIcon sx={{ color: "text.primary" }} />
              <Typography
                sx={{
                  fontSize: "14px",
                  color: "text.primary",
                  fontWeight: "600",
                  textTransform: "initial",
                }}
              >
                Back
              </Typography>
            </Button>
          </Link>
          <Grid container className="group-info-country">
            <Grid item xs={12} md={5} lg={6}>
              <ExpectRatioImageBox>
                <img src={dataDetail?.flags?.png} alt="flag-country" />
              </ExpectRatioImageBox>
            </Grid>
            <Grid
              item
              xs={13}
              md={7}
              lg={6}
              sx={{
                paddingLeft: {
                  xs: "0px",
                  md: "100px",
                },
              }}
              className="info-country"
            >
              <Typography
                sx={{
                  marginTop: {
                    xs: "2rem",
                    md: "0px",
                  },
                }}
                className="name-country"
              >
                {dataDetail?.name?.common}
              </Typography>
              <Grid container>
                <Grid item xs={12} md={6}>
                  <CountryInfo
                    mt="12px"
                    title="Native Name"
                    text={
                      parseLanguages(dataDetail?.name?.nativeName || {}).common
                    }
                  />
                  <CountryInfo
                    mt="12px"
                    title="Population"
                    text={dataDetail?.population || ""}
                  />
                  <CountryInfo
                    mt="12px"
                    title="Region"
                    text={dataDetail?.region || ""}
                  />
                  <CountryInfo
                    mt="12px"
                    title="Sub Region"
                    text={dataDetail?.subregion || ""}
                  />
                  <CountryInfo
                    mt="12px"
                    title="Capital"
                    text={(dataDetail?.capital && dataDetail?.capital[0]) || ""}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={6}
                  sx={{
                    mt: {
                      xs: "2rem",
                      md: "0px",
                    },
                    pl: {
                      xs: "0px",
                      md: "3rem",
                    },
                  }}
                >
                  <Box sx={{ mt: "12px" }}>
                    <Typography variant="body2">Top Level Domain:</Typography>
                    {dataDetail &&
                      dataDetail?.tld?.map((item: string, index: number) => (
                        <Typography key={index} variant="body1">
                          {item}
                        </Typography>
                      ))}
                  </Box>
                  <CountryInfo
                    title="Currencies"
                    mt="12px"
                    text={
                      (dataDetail?.currencies &&
                        parseLanguages(dataDetail?.currencies).name) ||
                      ""
                    }
                  />
                  <CountryInfo
                    title="Languages"
                    mt="12px"
                    text={
                      dataDetail?.languages &&
                      parseLanguages(dataDetail?.languages)
                    }
                  />
                </Grid>
              </Grid>
              {bordersContries && bordersContries?.length > 0 && (
                <Box
                  sx={{
                    mt: "2rem",
                  }}
                >
                  <div className="info-country-text">
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        flexWrap: "wrap",
                      }}
                    >
                      <span
                        style={{
                          marginRight: "1rem",
                          marginTop: "0.75rem",
                        }}
                        className="title-info"
                      >
                        Border Countries:
                      </span>{" "}
                      {bordersContries?.map(
                        (countries: ItemBordersContries, index: number) => (
                          <Box key={index}>
                            <Link to={`/detail?${countries?.name?.common}`}>
                              <Button
                                sx={{ bgcolor: "background.secondary" }}
                                className="btn-border-country"
                              >
                                <Typography
                                  sx={{
                                    color: "text.primary",
                                    textTransform: "initial",
                                  }}
                                  variant="body2"
                                >
                                  {countries?.name?.common}
                                </Typography>
                              </Button>
                            </Link>
                          </Box>
                        )
                      )}
                    </Box>
                  </div>
                </Box>
              )}
            </Grid>
          </Grid>
        </>
      )}
    </div>
  )
}
