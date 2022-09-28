import React, { useEffect } from "react";
import { filter } from "lodash";
import { sentenceCase } from "change-case";
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
} from "@mui/material";
// components
import Scrollbar from "../../../components/Scrollbar";
import Iconify from "../../../components/Iconify";
import SearchNotFound from "../../../components/SearchNotFound";

// mock
// import ProductLIST from "../../../../_mock/Product";
import { useDispatch, useSelector } from "react-redux";
// import { getAllTarifZone } from "../../../../redux/tarifZoneRedux/callTarifZoneApi";
import TarifZoneMoreMenu from "../../../components/tarifZoneList/TarifZoneMoreMenu";
import TarifZoneListToolbar from "../../../components/tarifZoneList/TarifZoneListToolbar";
import TarifZoneListHead from "../../../components/tarifZoneList/TarifZoneListHead";
import useSWR from "swr";
import axios from "axios";
import { BASEURL } from "../../../utils/baseUrl";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "zone", label: "Zone Ville/Region", alignRight: false },
  { id: "pays", label: "Pays", alignRight: false },
  { id: "tarif", label: "Frais", alignRight: false },

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
      (tarifZone) =>
        tarifZone.tarifs[0].zone.toLowerCase().indexOf(query.toLowerCase()) !==
        -1
    );
  }
  return stabilizedThis?.map((el) => el[0]);
}

const fetcherFunc = (url) =>
  axios
    .get(url)
    // .then(handleResponse)
    .then((res) => res.data);

export default function TarifZoneList() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("zone");
  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const dispatch = useDispatch();
  //   const tarifzones = useSelector((state) => state.tarifZone.tarifZones);

  useEffect(() => {
    // getAllTarifZone(dispatch);
    // console.log();
  }, []);

  const { data: tarifzones, error } = useSWR(
    `${BASEURL}/tarifZone/getAllTarifZone`,
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
      const newSelecteds = tarifzones.map((n) => n.id);
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tarifzones.length) : 0;

  const filteredTarifZones = applySortFilter(
    tarifzones,
    getComparator(order, orderBy),
    filterName
  );

  const isProductNotFound = filteredTarifZones?.length === 0;

  if (!tarifzones) return <div>Loading </div>;
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
            Tarifs Zone
          </Typography>
          <Link href={"/admin/tarifzone/addtarif"}>
            <Button
              variant="contained"
              // component={RouterLink}
              // to="/addtarifzone"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              Nouveau Tarif
            </Button>
          </Link>
        </Stack>
        <Card>
          <TarifZoneListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <TarifZoneListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={tarifzones.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredTarifZones
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const { id, pays, tarifs } = row;
                      const isItemSelected = selected.indexOf(id) !== -1;

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
                              onChange={(event) => handleClick(event, id)}
                            />
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={2}
                            >
                              {/* <Avatar alt={name} src={avatarUrl} /> */}
                              {/* <Avatar
                                alt={categoryName}
                                src={`data:image/*;base64,${categoryImg}`}
                              /> */}

                              <Typography variant="subtitle2" noWrap>
                                {tarifs[0].zone}
                              </Typography>
                            </Stack>
                          </TableCell>
                          {/* <TableCell align="left">{company}</TableCell>*/}
                          <TableCell align="left">{pays}</TableCell>

                          <TableCell align="left">
                            {tarifs[0].tarif} FCFA
                          </TableCell>
                          {/* <TableCell align="left">{type}</TableCell> */}

                          <TableCell align="right">
                            <TarifZoneMoreMenu tarifZone={row} />
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
            count={tarifzones?.length}
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
TarifZoneList.auth = true;
TarifZoneList.layout = "profile";
