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

// import ProductListHead from "../../product/productList/ProductListHead";
// import ProductListToolbar from "../../product/productList/ProductListToolbar";
// import ProductMoreMenu from "../../product/productList/ProductMoreMenu";
// mock
// import ProductLIST from "../../../../_mock/Product";

import { useDispatch, useSelector } from "react-redux";
// import { getAllCategory } from "../../../../redux/categoryRedux/callCategoryApi";
import CategoryMoreMenu from "../../../components/categoryList/CategoryMoreMenu";
import CategoryListHead from "../../../components/categoryList/CategoryListHead";
import CategoryListToolbar from "../../../components/categoryList/CategoryListToolbar";
import useSWR from "swr";
import axios from "axios";
import { BASEURL } from "../../../utils/baseUrl";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "categoryName", label: "Nom", alignRight: false },
  { id: "description", label: "Description", alignRight: false },
  { id: "title", label: "Titre", alignRight: false },
  { id: "type", label: "Type", alignRight: false },
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
      (category) =>
        category.categoryName.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis?.map((el) => el[0]);
}

const fetcherFunc = (url) => axios.get(url).then((res) => res.data);
export default function CategoryList() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("categoryName");
  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const dispatch = useDispatch();
  //   const categories = useSelector((state) => state.category.categories);

  const { data: categories, error } = useSWR(
    `${BASEURL}/category/getAllCategory`,
    fetcherFunc
    // {
    //   initialData: products,
    //   revalidateOnMount: true,
    // }
  );

  useEffect(() => {
    // getAllCategory(dispatch);
    console.log();
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = categories.map((n) => n.categoryName);
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - categories.length) : 0;

  const filteredCategories = applySortFilter(
    categories,
    getComparator(order, orderBy),
    filterName
  );

  const isProductNotFound = filteredCategories?.length === 0;

  if (!categories) return <div>Loading </div>;
  if (error) return <div>Erreur </div>;
  return (
    <>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Categories
          </Typography>
          <Link href="/admin/categories/addcategory">
            <Button
              variant="contained"
              // component={RouterLink}
              // to="/"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              Nouvelle Categorie
            </Button>
          </Link>
        </Stack>
        <Card>
          <CategoryListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <CategoryListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={categories.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredCategories
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const {
                        id,
                        categoryName,
                        categoryImg,
                        description,
                        title,
                        type,
                      } = row;
                      const isItemSelected =
                        selected.indexOf(categoryName) !== -1;

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
                              onChange={(event) =>
                                handleClick(event, categoryName)
                              }
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
                                alt={categoryName}
                                src={`data:image/*;base64,${categoryImg}`}
                              />

                              <Typography variant="subtitle2" noWrap>
                                {categoryName}
                              </Typography>
                            </Stack>
                          </TableCell>
                          {/* <TableCell align="left">{company}</TableCell>
                          <TableCell align="left">{role}</TableCell> */}
                          <TableCell align="left">{description}</TableCell>
                          <TableCell align="left">{title}</TableCell>
                          <TableCell align="left">{type}</TableCell>

                          <TableCell align="right">
                            <CategoryMoreMenu category={row} />
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
            count={categories.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </>
  );
}

CategoryList.auth = true;
CategoryList.layout = "profile";
