import Box from "@mui/material/Box"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import DetailPage from "../../components/Detail"
import { Header } from "../../components/Header"
import CountriesAPI from "../../services/api/countries"

interface ItemBordersContries {
  name: { common: string }
}

export default function Detail() {
  let location = useLocation()
  let countryName = location?.search ? location?.search?.replace("?", "") : ""
  const [dataDetail, setDataDetail] = useState<{
    flags: { png: string }
    name: { common: string; nativeName: Object }
    population: string
    region: string
    subregion: string
    capital: Array<string>
    tld: Array<string>
    currencies: Object
    languages: Object
  }>({
    flags: { png: "" },
    name: { common: "string", nativeName: {} },
    population: "",
    region: "string",
    subregion: "string",
    capital: [""],
    tld: [""],
    currencies: {},
    languages: {},
  })
  const [isLoading, setIsLoading] = useState(true)
  const [bordersContries, setBordersContries] = useState<
    Array<ItemBordersContries>
  >([])

  const getListCode = async (codes: string) => {
    try {
      const response = await CountriesAPI.getListCodes(codes)
      setBordersContries(response?.data || [])
    } catch (error) {
      console.log(error)
    }
  }

  const fetchDetailCountry = async (countryName: string) => {
    try {
      setIsLoading(true)
      let response = await CountriesAPI.getByName(countryName)
      setDataDetail(response?.data?.[0] || {})
      let codes = ""
      if (response.data[0].borders) {
        response.data[0].borders.map((item: string) => {
          codes += `${item},`
        })
      }
      getListCode(codes)
      setIsLoading(false)
    } catch (error) {
      console.error({ error })
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchDetailCountry(countryName)
  }, [countryName])

  return (
    <Box sx={{ bgcolor: "background.default", color: "text.primary" }}>
      <div className="background-container">
        <Header />
        <DetailPage
          bordersContries={bordersContries}
          isLoading={isLoading}
          dataDetail={dataDetail}
        />
      </div>
    </Box>
  )
}
