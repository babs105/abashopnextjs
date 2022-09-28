import { useRouter } from "next/router";
// import //////||\\\
// import { Mail, Notifications, Pets, Search, ShoppingCartOutlined,ExpandCircleDown, ExpandMore } from "@mui/icons-material";

import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  styled,
  Button,
  Card,
} from "@mui/material";
import Navbar from "../../../components/Navbar";
import Announcement from "../../../components/Announcement";
import Products from "../../../components/Products";
import Newsletter from "../../../components/Newsletter";
import Footer from "../../../components/Footer";

import { useEffect, useState } from "react";
import ProductCartWidget from "../../../components/ProductCartWidget";
import Iconify from "../../../components/Iconify";
import { getAllProductByCatSuccess } from "../../../redux/productRedux/productRedux";
import { useDispatch } from "react-redux";
import useSWR from "swr";
import { BASEURL } from "../../../utils/baseUrl";
import { Box } from "@mui/system";

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

const Option = styled("option")({});

async function fetcherFunc(url) {
  const res = await fetch(url);
  return res.json();
}
const ProductListByCat = ({ products }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { cat } = router.query;
  const [searchName, setSearchName] = useState("");
  // const [filteredProducts, setFilteredProducts] = useState([...products]);
  const [filters, setFilters] = useState({ color: "", size: "" });
  const [sort, setSort] = useState("newest");

  const handleFilters = (e) => {
    const value = e.target.value;
    setSort("newest");
    setFilters({
      ...filters,
      [e.target.name]: value,
    });
  };
  const { data, error } = useSWR(
    cat ? `${BASEURL}/product/getProductByCat/${cat}` : null,
    fetcherFunc,
    {
      fallbackData: products,
    }
  );

  useEffect(() => {
    console.log("categorie", cat);
    console.log("sort", sort);
    // dispatch(getAllProductByCatSuccess(products));
  }, [products]);
  // if (error) return <div>failed to load</div>;
  // if (!data) return <div>loading...</div>;
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
          <Title>{cat ? cat : "Tous Les Produits"}</Title>
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
            <FilterText>Filtrer Produits:</FilterText>
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
            <FilterText>Trier Produits:</FilterText>
            <FormControl
              sx={{ minWidth: 100, marginRight: "20px" }}
              size="small"
            >
              <InputLabel id="demo2">Critere</InputLabel>
              <Select
                labelId="demo2"
                defaultValue={sort}
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
          {/* <Filter> */}
          {/* <IconButton onClick={() =>{
              setFilters({color:'',size:''});
              setSort("newest")
            
             }
            }>
            <Clear />
            </IconButton> */}
          {/* </Filter> */}
        </FilterContainer>
      </Card>
      {data && !error ? (
        <Products
          searchName={searchName}
          cat={cat}
          filters={filters}
          sort={sort}
          products={data}
        />
      ) : (
        <div style={{ textAlign: "center" }}>Loading...</div>
      )}
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default ProductListByCat;

export async function getStaticPaths() {
  const response = await fetch(`${BASEURL}/category/getAllCategory`);
  const data = await response.json();
  const paths = data.map((categ) => ({
    params: { cat: categ.title.toString() },
  }));
  return {
    paths: paths.slice(0, 1),
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const { params } = context;
  const { cat } = params;
  // Fetch data from external API

  const response = await fetch(`${BASEURL}/product/getProductByCat/${cat}`);
  const data = await response.json();
  // console.log("Data", data);

  // Pass data to the page via props
  return { props: { products: data.slice(0, 1) } };
}
