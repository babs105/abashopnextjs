import { useState } from "react";
import useSWR from "swr";

import {
  styled,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Card,
  Box,
} from "@mui/material";
import Navbar from "../../components/Navbar";
import Announcement from "../../components/Announcement";
import ProductCartWidget from "../../components/ProductCartWidget";
import Iconify from "../../components/Iconify";
import Products from "../../components/Products";
import { productService } from "../../service/productService";
import { BASEURL } from "../../utils/baseUrl";

const Container = styled("div")({
  width: "100%",
  backgroundColor: "#f5f8fc",
});

const Title = styled("h1")({
  color: "teal",
  margin: "20px",
});

const FilterContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flex: "nowrap",
  padding: "0px 15px",
  gap: "20px",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "start",
  },
}));

const Filter = styled("div")({
  display: "flex",
  alignItems: "center",
});

const FilterText = styled("span")({
  fontSize: " 20px",
  fontWeight: 600,
  marginRight: "10px",
});

async function fetcherFunc(url) {
  const res = await fetch(url);
  return res.json();
}
const ProductList = ({ products }) => {
  const [searchName, setSearchName] = useState("");
  const [filters, setFilters] = useState({ color: "", size: "" });
  const [sort, setSort] = useState("newest");

  const handleFilters = (e) => {
    const value = e.target.value;
    // setSort("newest");
    setFilters({
      ...filters,
      [e.target.name]: value,
    });
  };

  const { data, error } = useSWR(
    `${BASEURL}/product/getAllProduct`,
    fetcherFunc,
    {
      fallbackData: products,
      revalidateOnMount: true,
    }
  );

  if (!data) return <div>Loading </div>;
  if (error) return <div>Erreur </div>;

  return (
    <Container>
      <Navbar searchName={searchName} setSearchName={setSearchName} />
      <Announcement />
      <ProductCartWidget />
      <Card
        variant="outlined"
        sx={{
          margin: { sm: "20px 60px", xs: "20px 10px" },
          paddingBottom: "20px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Title>{"Toutes Les Tenues"}</Title>
          {/* <Title>{cat}</Title> */}
          {/* <Title>{cat ? cat : "Tous Les Produits"}</Title> */}
          <Button
            // fullWidth
            // size="large"
            sx={{ margin: "20px" }}
            type="submit"
            color="inherit"
            // variant="outlined"
            startIcon={<Iconify icon="ic:round-clear-all" />}
            onClick={() => {
              setFilters({ color: "", size: "" });
              setSort("newest");
            }}
          >
            Effacer Filtre
          </Button>
        </Box>

        <FilterContainer>
          <Filter>
            <FilterText>Filtrer Tenues:</FilterText>
            <FormControl
              sx={{ minWidth: 100, marginRight: "20px" }}
              size="small"
            >
              <InputLabel id="demo">Couleur</InputLabel>
              <Select
                labelId="demo"
                name="color"
                // defaultValue=""
                value={filters.color}
                autoWidth
                id="demo-color"
                label="Couleur"
                onChange={handleFilters}
              >
                <MenuItem value={"Noire"}>Noire</MenuItem>
                <MenuItem value={"Blanche"}>Blanche</MenuItem>
                <MenuItem value={"Jaune"}>Jaune</MenuItem>
                <MenuItem value={"Bleu"}>Bleue</MenuItem>
                <MenuItem value={"Verte"}>Verte</MenuItem>
              </Select>
            </FormControl>
            <FormControl
              sx={{ minWidth: 80, marginRight: "20px" }}
              size="small"
            >
              <InputLabel id="demo1">Taille</InputLabel>
              <Select
                labelId="demo1"
                name="size"
                //  defaultValue=""
                value={filters.size}
                autoWidth
                id="demo1-size"
                label="Taille"
                onChange={handleFilters}
              >
                <MenuItem value={"XS"}>XS</MenuItem>
                <MenuItem value={"S"}>S</MenuItem>
                <MenuItem value={"M"}>M</MenuItem>
                <MenuItem value={"L"}>L</MenuItem>
                <MenuItem value={"XL"}>XL</MenuItem>
              </Select>
            </FormControl>
          </Filter>
          <Filter>
            <FilterText>Trier Tenues:</FilterText>
            <FormControl
              sx={{ minWidth: 100, marginRight: "20px" }}
              size="small"
            >
              <InputLabel id="demo2">Critere</InputLabel>
              <Select
                labelId="demo2"
                // name="sort"
                value={sort}
                autoWidth
                id="demo2-citere"
                label="Critere"
                selected="newest"
                onChange={(e) => {
                  setSort(e.target.value);
                }}
              >
                <MenuItem value="newest">Plus recents</MenuItem>
                <MenuItem value="asc">Moins chers</MenuItem>
                <MenuItem value="desc">Plus chers</MenuItem>
              </Select>
            </FormControl>
          </Filter>
          {/* <Filter>
            <Button
              fullWidth
              size="large"
              type="submit"
              color="inherit"
              variant="outlined"
              startIcon={<Iconify icon="ic:round-clear-all" />}
              onClick={() => {
                setFilters({ color: "", size: "" });
                setSort("newest");
              }}
            >
              Annuler Filtre
            </Button>
          </Filter> */}
        </FilterContainer>
      </Card>
      <Products
        searchName={searchName}
        // cat={}
        products={data}
        filters={filters}
        sort={sort}
      />
    </Container>
  );
};
export default ProductList;

export async function getStaticProps() {
  // Fetch data from external API

  // const response = await fetch("http://localhost:8080/product/getAllProduct");
  const data = await productService.getAllProduct();
  // const data = await response.json();

  // console.log("Data", data);
  // Pass data to the page via props
  return { props: { products: data.slice(0, 1) } };
}
