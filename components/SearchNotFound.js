import PropTypes from "prop-types";
// material
import { Card, Paper, Typography } from "@mui/material";

// ----------------------------------------------------------------------

SearchNotFound.propTypes = {
  searchQuery: PropTypes.string,
};

export default function SearchNotFound({ searchQuery = "", ...other }) {
  return (
    <Card variant="outlined" {...other}>
      <Typography gutterBottom align="center" variant="subtitle1">
        0 resultat Trouve
      </Typography>
      <Typography variant="body2" align="center">
        Aucun Resultat Trouve &nbsp;
        <strong>&quot;{searchQuery}&quot;</strong>. Essayez de saisir le mot au
        complet.
      </Typography>
    </Card>
  );
}
