import React, { useEffect } from "react";
import { filter } from "lodash";
import { useState } from "react";
import Link from "next/link";
// material
import {
  Card,
  Table,
  Stack,
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
import SearchNotFound from "../../../components/SearchNotFound";

import UserListHead from "../../../components/userList/UserListHead";
import UserListToolbar from "../../../components/userList/UserListToolbar";
import UserMoreMenu from "../../../components/userList/UserMoreMenu";

import { useDispatch, useSelector } from "react-redux";
// import { getAllUsers } from "../../../redux/userRedux/callUserApi";
import { localStorageHelper } from "../../../utils/localStorageHelper";
import useSWR from "swr";
import axios from "axios";
import { BASEURL } from "../../../utils/baseUrl";
import { userRequest } from "../../../axios/axios";
import { baseUrl } from "../../../config";
import { fetchWrapper } from "../../../helpers/fetch-wrapper";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "firstName", label: "Nom", alignRight: false },
  { id: "username", label: "Email", alignRight: false },
  { id: "address", label: "Adresse", alignRight: false },
  { id: "telephone", label: "Telephone", alignRight: false },
  { id: "roles", label: "Roles", alignRight: false },

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
      (_user) =>
        _user.firstName
          .concat(_user.username)
          .concat(_user.address)
          .concat(_user.telephone)
          .concat(_user.roles)
          .toLowerCase()
          .indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis?.map((el) => el[0]);
}
// const fetcherFunc = (url) =>
// // axios
// //   .create({
// //     headers: localStorageHelper.getLocalStorage("user") && {
// //       Authorization:
// //         "Bearer " + localStorageHelper.getLocalStorage("user").accessToken,
// //     },
// //   })
// userRequest.get(url).then((res) => res.data);
async function fetcherFunc(url) {
  try {
    const response = await fetchWrapper.get(url);
    if (!response.hasError) {
      console.log("success swr", response.body);
      return response.body;
    }
    if (response.hasError) {
      console.log("error swr", response.errorMessage);
      return response.errorMessage;
    }
  } catch (error) {
    console.log("error swr", error);
  }
}

export default function UserList() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("firstName");
  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const dispatch = useDispatch();
  // const users = useSelector((state) => state.user.users);
  const { data: users, error } = useSWR(
    `${baseUrl}/admin/users`,
    fetcherFunc
    // {
    //   initialData: products,
    //   revalidateOnMount: true,
    // }
  );

  // useEffect(() => {
  //   getAllUsers(dispatch);
  // }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = users.map((n) => n.username);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, username) => {
    const selectedIndex = selected.indexOf(username);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, username);
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;

  const filteredUsers = applySortFilter(
    users,
    getComparator(order, orderBy),
    filterName
  );

  const isUserNotFound = filteredUsers?.length === 0;

  if (!users) return <div>Loading... </div>;
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
            Clients
          </Typography>
          {/* <Button
            variant="contained"
            component={RouterLink}
            to="/newUser"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            Nouveau Produit
          </Button> */}
        </Stack>
        <Card>
          <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={users.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const {
                        _id,
                        firstName,
                        lastName,
                        username,
                        address,
                        telephone,
                        roles,
                      } = row;
                      const isItemSelected = selected.indexOf(username) !== -1;

                      return (
                        <TableRow
                          hover
                          key={_id}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isItemSelected}
                              onChange={(event) => handleClick(event, username)}
                            />
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={2}
                            >
                              <Typography variant="subtitle2" noWrap>
                                {firstName} {lastName}
                              </Typography>
                            </Stack>
                          </TableCell>
                          {/* <TableCell align="left">{company}</TableCell>
                          <TableCell align="left">{role}</TableCell> */}
                          <TableCell align="left">{username}</TableCell>
                          <TableCell align="left">{address}</TableCell>
                          <TableCell align="left">{telephone}</TableCell>

                          <TableCell align="left">
                            {roles.map((role, index) => (
                              <Box key={index}>
                                <b>Role: </b> {role}
                              </Box>
                            ))}
                          </TableCell>

                          <TableCell align="right">
                            <UserMoreMenu user={row} />
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

                {isUserNotFound && (
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
            count={users.length}
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

UserList.auth = true;
UserList.layout = "profile";
