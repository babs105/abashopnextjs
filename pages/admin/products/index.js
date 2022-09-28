import React, { useEffect } from "react";
import { filter } from "lodash";
import { useState } from "react";
import Link from "next/link";
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Box,
} from "@mui/material";
// components

import Scrollbar from "../../../components/Scrollbar";
import Iconify from "../../../components/Iconify";
import SearchNotFound from "../../../components/SearchNotFound";

import ProductListHead from "../../../components/productList/ProductListHead";
import ProductListToolbar from "../../../components/productList/ProductListToolbar";
import ProductMoreMenu from "../../../components/productList/ProductMoreMenu";

import { useDispatch, useSelector } from "react-redux";
// import { productActions } from "../../../../redux/productRedux/productActions";
import { localStorageHelper } from "../../../utils/localStorageHelper";
import useSWR from "swr";
import axios from "axios";
import { BASEURL } from "../../../utils/baseUrl";
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "name", label: "Nom", alignRight: false },
  { id: "desc", label: "Description", alignRight: false },
  { id: "caract", label: "Details", alignRight: false },
  // { id: "status", label: "Status", alignRight: false },
  { id: "" },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array?.map((el, index) => [el, index]);
  stabilizedThis?.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      (_product) =>
        _product.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis?.map((el) => el[0]);
}

const fetcherFunc = (url) => axios.get(url).then((res) => res.data);
export default function ProductList() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("name");
  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const dispatch = useDispatch();
  //   const products = useSelector((state) => state.product.products);

  //   useEffect(() => {
  //     productActions.getAllProduct(dispatch);
  //   }, []);
  const { data: products, error } = useSWR(
    `${BASEURL}/product/getAllProduct`,
    fetcherFunc
    // {
    //   initialData: products,
    //   revalidateOnMount: true,
    // }
  );

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = products.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - products.length) : 0;

  const filteredProducts = applySortFilter(
    products,
    getComparator(order, orderBy),
    filterName
  );

  const isProductNotFound = filteredProducts?.length === 0;

  if (!products) return <div>Loading </div>;
  if (error) return <div>Erreur </div>;
  return (
    <Container>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h4" gutterBottom>
          Produits
        </Typography>
        <Link href="/admin/products/addproduct">
          <Button
            variant="contained"
            //   component={RouterLink}
            // to="/newProduct"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            Nouveau Produit
          </Button>
        </Link>
      </Stack>
      <Card>
        <ProductListToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ minWidth: 800 }}>
            <Table>
              <ProductListHead
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD}
                rowCount={products.length}
                numSelected={selected.length}
                onRequestSort={handleRequestSort}
                onSelectAllClick={handleSelectAllClick}
              />
              <TableBody>
                {filteredProducts
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    const {
                      id,
                      name,
                      // role,
                      // status,
                      // company,
                      // avatarUrl,
                      // isVerified,
                      img,
                      desc,
                      price,
                      quantity,
                      caract,
                    } = row;
                    const isItemSelected = selected.indexOf(name) !== -1;

                    return (
                      <TableRow
                        hover
                        key={id}
                        tabIndex={-1}
                        role="checkbox"
                        selected={isItemSelected}
                        aria-checked={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={isItemSelected}
                            onChange={(event) => handleClick(event, name)}
                          />
                        </TableCell>
                        <TableCell component="th" scope="row" padding="none">
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={2}
                          >
                            {/* <Avatar alt={name} src={avatarUrl} /> */}
                            <Avatar
                              alt={name}
                              src={`data:image/*;base64,${img}`}
                            />

                            <Typography variant="subtitle2" noWrap>
                              {name}
                            </Typography>
                          </Stack>
                        </TableCell>
                        {/* <TableCell align="left">{company}</TableCell>
                          <TableCell align="left">{role}</TableCell> */}
                        <TableCell align="left">{desc}</TableCell>
                        <TableCell align="left">
                          {caract.map((ct, index) => (
                            <Box key={index}>
                              <b>Couleur: </b> {ct.color} <b>Taille: </b>
                              {ct.size} <b>Prix</b> :{ct.price} F
                            </Box>
                          ))}
                        </TableCell>
                        <TableCell align="left">{quantity}</TableCell>
                        {/* <TableCell align="left">
                            {isVerified ? "Yes" : "No"}
                          </TableCell>
                          <TableCell align="left">
                            <Label
                              variant="ghost"
                              color={
                                (status === "banned" && "error") || "success"
                              }
                            >
                              {sentenceCase(status)}
                            </Label>
                          </TableCell> */}

                        <TableCell align="right">
                          <ProductMoreMenu product={row} />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>

              {isProductNotFound && (
                <TableBody>
                  <TableRow>
                    <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                      <SearchNotFound searchQuery={filterName} />
                    </TableCell>
                  </TableRow>
                </TableBody>
              )}
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={products.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
ProductList.auth = true;
ProductList.layout = "profile";
