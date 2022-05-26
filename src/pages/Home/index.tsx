import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import SearchIcon from "@mui/icons-material/Search"
import { InputAdornment } from "@mui/material"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import LinearProgress from "@mui/material/LinearProgress"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import TextField from "@mui/material/TextField"
import { debounce } from "lodash"
import * as React from "react"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import CountryCart from "../../components/CountryCart"
import { Header } from "../../components/Header"
import CountriesAPI from "../../services/api/countries"
import { removeMark } from "../../utils/helper"
import { Button } from "@mui/material"

interface ItemListCountry {
  flags: { png: string }
  name: { common: string }
  population: number
  region: string
  capital: Array<string>
}

interface ItemListRegion {
  region: string
}

function Home() {
  const [listCountry, setListCountry] = useState<Array<ItemListCountry>>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filterParams, setFilterParams] = useState({
    name: "",
    region: "All",
  })
  const [listRegion, setListRegion] = useState<Array<string>>([])
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const mapCountry = (listCountry: Array<ItemListCountry>) => {
    if (listCountry && listCountry?.length) {
      return (
        <Grid container spacing={{ xs: 4, md: 8 }}>
          {listCountry?.map((item: ItemListCountry, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Link to={`/detail?${item?.name?.common}`}>
                <CountryCart data={item} />
              </Link>
            </Grid>
          ))}
        </Grid>
      )
    } else {
      return (
        <div className="text-no-countries">
          There are currently no countries! Please try again
        </div>
      )
    }
  }

  const handleSearch = debounce(
    async (event: { target: { value: string } }) => {
      const { value } = event?.target
      let params = {
        name: value,
        region: filterParams?.region,
      }
      try {
        setFilterParams(params)
      } catch (error) {
        console.error({ error })
      }
    },
    500
  )

  const getListRegion = (data: Array<ItemListRegion>) => {
    let list_region: Array<string> = ["All"]
    data &&
      data?.length &&
      data?.forEach((item: ItemListRegion) => {
        if (!list_region.includes(item?.region)) {
          list_region.push(item?.region)
        }
      })
    setListRegion(list_region)
  }

  const handleFilterCountry = async (filterParams: {
    name: string
    region: string
  }) => {
    setIsLoading(true)
    try {
      const search = removeMark(filterParams?.name?.trim())
      let list_country: Array<ItemListCountry> = []
      let response: any = []
      if (
        !filterParams?.region ||
        filterParams?.region === "" ||
        filterParams?.region === "All"
      ) {
        response = await CountriesAPI.getAll()
        response = response?.data
        getListRegion(response)
      } else {
        response = await CountriesAPI.getByRegion(filterParams?.region)
        response = response?.data
      }
      if (
        filterParams?.name &&
        filterParams?.name !== "" &&
        response &&
        response?.length
      ) {
        response?.forEach((item: ItemListCountry) => {
          if (
            search
              .split(" ")
              .every((u: string) => removeMark(item?.name?.common).includes(u))
          ) {
            list_country?.push(item)
          }
        })
      } else list_country = response
      await setListCountry(list_country)
      setTimeout(() => {
        setIsLoading(false)
      }, 500)
    } catch (error) {
      console.error({ error })
      setIsLoading(false)
    }
  }

  useEffect(() => {
    handleFilterCountry(filterParams)
  }, [filterParams])

  return (
    <Box sx={{ bgcolor: "background.default", color: "text.primary" }}>
      <div className="background-container">
        <Header />
        <div className="content-body">
          <Box
            sx={{
              display: {
                xs: "block",
                md: "flex",
              },
              mb: {
                xs: "1rem",
                md: "78px",
              },
            }}
            className="search-filter"
          >
            <Box
              sx={{
                width: {
                  md: "480px",
                },
                mb: {
                  xs: "3rem",
                  md: "0px",
                },
              }}
              className="group-search"
            >
              <TextField
                sx={{ borderRadius: "8px", bgcolor: "background.secondary" }}
                className="search"
                type="text"
                placeholder="Search for a country..."
                onChange={(e) => {
                  e.preventDefault()
                  handleSearch(e)
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <div className="group-filter-region">
              <Button
                sx={{
                  bgcolor: "background.secondary",
                  color: "text.primary",
                  fontSize: "14px",
                  textTransform: "initial",
                }}
                onClick={handleClick}
                className="filter-region"
              >
                <div className="filter-region-text">
                  {filterParams?.region === "All"
                    ? "Filter by Region"
                    : filterParams?.region}
                </div>
                <KeyboardArrowDownIcon />
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
                className="filter-popup"
              >
                {listRegion?.length &&
                  listRegion?.map((item, index) => {
                    return (
                      <MenuItem
                        sx={{
                          bgcolor: "background.secondary",
                        }}
                        key={index}
                        onClick={() => {
                          setFilterParams({
                            name: filterParams?.name,
                            region: item,
                          })
                          handleClose()
                        }}
                      >
                        {item}
                      </MenuItem>
                    )
                  })}
              </Menu>
            </div>
          </Box>
          <Box
            sx={{
              padding: {
                xs: "2.5rem",
                sm: "0px",
              },
            }}
          >
            {isLoading ? (
              <Box sx={{ width: "100%" }}>
                <LinearProgress />
              </Box>
            ) : (
              mapCountry(listCountry)
            )}
          </Box>
        </div>
      </div>
    </Box>
  )
}

export default Home
