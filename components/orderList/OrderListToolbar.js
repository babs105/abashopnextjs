import PropTypes from "prop-types";
// material
import { styled } from "@mui/material/styles";
import {
  Toolbar,
  Tooltip,
  IconButton,
  Typography,
  OutlinedInput,
  InputAdornment,
  Box,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
// component
import Iconify from "../../components/Iconify";

// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: "flex",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1, 0, 3),
}));

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  transition: theme.transitions.create(["box-shadow", "width"], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  "&.Mui-focused": { width: 320, boxShadow: theme.customShadows },
  "& fieldset": {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[500_32]} !important`,
  },
}));

// ----------------------------------------------------------------------
const StatusOrderList = [
  { id: 1, title: "Preparation", value: 0 },
  { id: 2, title: "Pret", value: 1 },
  { id: 3, title: "En Route", value: 2 },
  { id: 4, title: "Non Trouve", value: 3 },
  { id: 5, title: "Retourne", value: 4 },
  { id: 6, title: "Livre", value: 5 },
];
ProductListToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
};

export default function ProductListToolbar({
  numSelected,
  filterName,
  onFilterName,
  status,
  onFilterStatus,
}) {
  return (
    <RootStyle
      sx={{
        ...(numSelected > 0 && {
          color: "primary.main",
          bgcolor: "primary.lighter",
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} selectionne{numSelected > 1 ? "s" : ""}
        </Typography>
      ) : (
        <>
          <SearchStyle
            value={filterName}
            onChange={onFilterName}
            placeholder="Recherche Commande..."
            startAdornment={
              <InputAdornment position="start">
                <Iconify
                  icon="eva:search-fill"
                  sx={{ color: "text.disabled", width: 20, height: 20 }}
                />
              </InputAdornment>
            }
          />
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <FormControl
              sx={{ minWidth: 100, marginRight: "20px", outline: "none" }}
              size="small"
            >
              <Select
                labelId="demo"
                name=""
                value={status}
                autoWidth
                id="demo-color"
                //label="Taille"
                // onChange={(e) => handleStatusOrder(e, row)}
                onChange={onFilterStatus}
              >
                <MenuItem value={-1}>{"Toutes les etapes"}</MenuItem>
                {StatusOrderList.map((item, index) => (
                  <MenuItem key={index} value={item.value}>
                    {item.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </>
      )}

      {
        numSelected > 0 && (
          <Tooltip title="Supprimer">
            <IconButton>
              <Iconify icon="eva:trash-2-fill" />
            </IconButton>
          </Tooltip>
        )
        // ) : (
        //   <Tooltip title="Filtrer">
        //     <IconButton>
        //       <Iconify icon="ic:round-filter-list" />
        //     </IconButton>
        //   </Tooltip>
        // )
      }
    </RootStyle>
  );
}
