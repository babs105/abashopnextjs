import React, { useEffect } from "react";
import { filter } from "lodash";
import { sentenceCase } from "change-case";
import { useState } from "react";
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
  IconButton,
  styled,
  Box,
} from "@mui/material";
// components

import Label from "../../../components/Label";
import Scrollbar from "../../../components/Scrollbar";
import SearchNotFound from "../../../components/SearchNotFound";

import OrderListHead from "../../../components/myOrdersList/OrderListHead";
import OrderListToolbar from "../../../components/myOrdersList/OrderListToolbar";
import OrderMoreMenu from "../../../components/myOrdersList/OrderMoreMenu";
import { useDispatch, useSelector } from "react-redux";

import { getAllOrdersByUserId } from "../../../redux/orderRedux/callOrderApi";
import Iconify from "../../../components/Iconify";

// ----------------------------------------------------------------------

const Hr = styled("hr")(({ theme }) => ({
  backgroundColor: "#eee",
  border: "none",
  width: "100%",
  height: "8px",
  [theme.breakpoints.down("sm")]: {
    width: "8px",
    height: "50px",
  },
}));
const TABLE_HEAD = [
  { id: "numOrder", label: "N. Cmde", alignRight: false },
  { id: "orderDate", label: "Date Commande", alignRight: false },
  { id: "firstName", label: "Client", alignRight: false },
  { id: "mdp", label: "Paiement", alignRight: false },
  { id: "etape", label: "Etape", alignRight: false },
  // { id: "", label: "Action", alignRight: false },
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
    ? (a, b) => -descendingComparator(a, b, orderBy)
    : (a, b) => descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query = "", query2 = -1) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query && query2 >= 0) {
    return filter(
      array,
      (_order) =>
        _order.orderDate
          .concat(_order.addressEmetteur.firstName)
          .concat(_order.statusOrder)
          .concat(_order.statusPay)
          .concat(_order.amount)
          .concat(_order.addressEmetteur.lastName)
          .concat(_order.numOrder)
          .toLowerCase()
          .includes(query.toLowerCase()) && _order.statusOrder === query2
      // !== -1
    );
  }
  if (query) {
    return filter(
      array,
      (_order) =>
        _order.orderDate
          .concat(_order.addressEmetteur.firstName)
          .concat(_order.statusOrder)
          .concat(_order.statusPay)
          .concat(_order.amount)
          .concat(_order.addressEmetteur.lastName)
          .concat(_order.numOrder)
          .toLowerCase()
          .includes(query.toLowerCase())
      // !== -1
    );
  }
  if (query2 >= 0) {
    return filter(
      array,
      (_order) => _order.statusOrder === query2
      // !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function MyOrders() {
  // const myorders = useSelector((state) => state.user.myOrders);
  const user = useSelector((state) => state.user.currentUser);
  useEffect(() => {
    getAllOrdersByUserId(dispatch, user.id);
  }, []);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("numOrder");
  const [filterName, setFilterName] = useState("");
  const [status, setStatus] = useState(-1);

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const dispatch = useDispatch();
  const orders = useSelector((state) => state.user.myOrders);

  const StatusOrderList = [
    { id: 1, title: "Preparation", value: 0 },
    { id: 2, title: "Pret", value: 1 },
    { id: 3, title: "En Route", value: 2 },
    { id: 4, title: "Non Trouve", value: 3 },
    { id: 5, title: "Retourne", value: 4 },
    { id: 6, title: "Livre", value: 5 },
  ];
  useEffect(() => {
    // getAllOrders(dispatch);
    console.log("reset", orders[0]?.statusOrder);
  }, []);

  const getStatOrder = (status) => {
    switch (status) {
      case 0:
        return "Preparation";
        break;
      case 1:
        return "Pret";
        break;
      case 2:
        return "En Route";
        break;
      case 3:
        return "Non Trouve";
        break;
      case 4:
        return "Retourne";
        break;
      case 5:
        return "Livre";
        break;
      default:
        break;
    }
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = orders.map((n) => n.numOrder);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, numOrder) => {
    const selectedIndex = selected.indexOf(numOrder);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, numOrder);
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
  const handleFilterStatus = (event) => {
    setStatus(event.target.value);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - orders.length) : 0;

  const filteredOrders = applySortFilter(
    orders,
    getComparator(order, orderBy),
    filterName,
    status
  );

  const isOrderNotFound = filteredOrders.length === 0;

  return (
    <>
      <Container sx={{ backgroundColor: "#f5f8fc" }}>
        <Stack
          direction="column"
          alignItems="center"
          justifyContent="space-between"
          mb={2}
          sx={{ width: "100%" }}
        >
          <Typography variant="h4">Suivi Derniere Commande</Typography>
          <Card sx={{ paddingX: "10px", paddingY: "20px", width: "100%" }}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              mb={2}
              sx={{ width: "100%" }}
            >
              {/* <span>N. Commande: {orders[0]?.numOrder}</span>
              <span>Paiement:{orders[0]?.statusPay}</span> */}
            </Stack>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexDirection: { xs: "column", sm: "row" },
                width: "100%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <IconButton
                  size="large"
                  sx={{
                    backgroundColor: orders[0]?.statusOrder === 0 && "teal",
                    color: orders[0]?.statusOrder === 0 && "white",
                  }}
                >
                  <Iconify
                    sx={{ color: orders[0]?.statusOrder > 0 && "teal" }}
                    icon={
                      orders[0]?.statusOrder > 0
                        ? "eva:checkmark-circle-2-outline"
                        : "eva:clipboard-outline"
                    }
                  />
                </IconButton>
                <Typography>Preparation</Typography>
              </Box>
              <Hr />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <IconButton
                  size="large"
                  sx={{
                    backgroundColor: orders[0]?.statusOrder === 1 && "teal",
                    color: orders[0]?.statusOrder === 1 && "white",
                  }}
                >
                  <Iconify
                    sx={{ color: orders[0]?.statusOrder > 1 && "teal" }}
                    icon={
                      orders[0]?.statusOrder > 1
                        ? "eva:checkmark-circle-2-outline"
                        : "eva:shopping-bag-outline"
                    }
                  />
                </IconButton>
                <Typography>Pret</Typography>
              </Box>

              <Hr />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <IconButton
                  size="large"
                  sx={{
                    backgroundColor: orders[0]?.statusOrder === 2 && "teal",
                    color: orders[0]?.statusOrder === 2 && "white",
                  }}
                >
                  <Iconify
                    sx={{ color: orders[0]?.statusOrder > 2 && "teal" }}
                    icon={
                      orders[0]?.statusOrder > 2
                        ? "eva:checkmark-circle-2-outline"
                        : "eva:car-outline"
                    }
                  />
                </IconButton>
                <span>En_Route</span>
              </Box>

              <Hr />
              {orders[0]?.statusOrder >= 3 && orders[0]?.statusOrder <= 4 && (
                <>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <IconButton
                      size="large"
                      sx={{
                        backgroundColor: orders[0]?.statusOrder === 3 && "teal",
                        color: orders[0]?.statusOrder === 3 && "white",
                      }}
                    >
                      <Iconify
                        sx={{ color: orders[0]?.statusOrder > 3 && "teal" }}
                        icon={
                          orders[0]?.statusOrder > 3
                            ? "eva:checkmark-circle-2-outline"
                            : "eva:question-mark-circle-outline"
                        }
                      />
                      {/* eva:undo-fill */}
                    </IconButton>
                    <Typography>Non_Retrouve</Typography>
                  </Box>
                  <Hr />
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <IconButton
                      size="large"
                      sx={{
                        backgroundColor: orders[0]?.statusOrder === 4 && "teal",
                        color: orders[0]?.statusOrder === 4 && "white",
                      }}
                    >
                      <Iconify
                        sx={{ color: orders[0]?.statusOrder > 4 && "teal" }}
                        icon={
                          orders[0]?.statusOrder > 4
                            ? "eva:checkmark-circle-2-outline"
                            : "eva:undo-outline"
                        }
                      />
                    </IconButton>
                    <Typography>Retourne</Typography>
                  </Box>
                  <Hr />
                </>
              )}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <IconButton
                  size="large"
                  sx={{
                    backgroundColor: orders[0]?.statusOrder === 5 && "teal",
                    color: orders[0]?.statusOrder === 5 && "white",
                  }}
                >
                  <Iconify
                    sx={{ color: orders[0]?.statusOrder > 5 && "teal" }}
                    icon={
                      orders[0]?.statusOrder > 5
                        ? "eva:checkmark-circle-2-outline"
                        : "eva:home-outline"
                    }
                  />
                </IconButton>
                <Typography>Livre</Typography>
              </Box>
            </Box>
          </Card>
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mt={4}
        >
          <Typography variant="h4">Mes Commandes</Typography>
        </Stack>
        <Card>
          <OrderListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
            status={status}
            onFilterStatus={handleFilterStatus}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <OrderListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={orders.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredOrders
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const {
                        id,
                        numOrder,
                        orderDate,
                        addressEmetteur,
                        mdp,
                        amount,
                        statusPay,
                        statusOrder,
                      } = row;
                      const isItemSelected = selected.indexOf(numOrder) !== -1;

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
                              onChange={(event) => handleClick(event, numOrder)}
                            />
                          </TableCell>
                          <TableCell align="left">{numOrder}</TableCell>
                          <TableCell align="left">{orderDate}</TableCell>
                          <TableCell align="left">
                            <Stack
                              direction="column"
                              // alignItems="center"
                              // spacing={2}
                            >
                              <Typography variant="subtitle2" noWrap>
                                {addressEmetteur.firstName}{" "}
                                {addressEmetteur.lastName}
                              </Typography>
                              <Typography variant="body2" noWrap>
                                Tel : {addressEmetteur.telephone}{" "}
                                {/* {addressEmetteur.lastName} */}
                              </Typography>
                            </Stack>
                          </TableCell>

                          {/* <TableCell align="left">{role}</TableCell>  */}
                          <TableCell align="left">
                            <b>{amount} FCFA </b> <br />
                            {mdp} <br />
                            <Label
                              variant="ghost"
                              color={
                                (statusPay === "encours" && "error") ||
                                "success"
                              }
                            >
                              {sentenceCase(statusPay)}
                            </Label>
                          </TableCell>

                          <TableCell align="left">
                            <Label variant="ghost" color={"success"}>
                              {sentenceCase(getStatOrder(statusOrder))}
                            </Label>
                          </TableCell>

                          <TableCell align="right">
                            <OrderMoreMenu order={row} />
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

                {isOrderNotFound && (
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
            count={orders.length}
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

MyOrders.auth = true;
MyOrders.layout = "profile";
