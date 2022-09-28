import { Grid } from "@mui/material";
import React from "react";
import Controls from "./Controls";

function InputCaract(props) {
  const { value: car, onChange, values, errors, index } = props;

  return (
    <>
      <Grid item xs={4} sm={3}>
        <Controls.Input
          name="color"
          label="Couleur"
          value={values.caract[index].color}
          onChange={(e) => {
            onChange(e, car);
          }}
          error={
            Object.values(errors).map((err) => {
              return err?.id === car?.id && err.color;
            })[index]
          }
          fullWidth
          size="small"
        />
      </Grid>
      <Grid item xs={4} sm={2}>
        <Controls.Input
          name="size"
          label="Taille"
          value={values.caract[index].size}
          onChange={(e) => onChange(e, car)}
          error={
            Object.values(errors).map((err) => {
              return err?.id === car?.id && err.size;
            })[index]
          }
          fullWidth
          size="small"
        />
      </Grid>

      <Grid item xs={4} sm={2}>
        <Controls.Input
          name="price"
          label="Prix"
          value={values.caract[index].price}
          onChange={(e) => onChange(e, car)}
          error={
            Object.values(errors).map((err) => {
              return err?.id === car?.id && err.price;
            })[index]
          }
          fullWidth
          size="small"
        />
      </Grid>
      {/* <Grid item xs={4} sm={1}></Grid> */}
    </>
  );
}

export default InputCaract;
