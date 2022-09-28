import React, { useEffect, useState } from "react";
import Controls from "../../../../components/controls/Controls";
import { addTarifZone } from "../../../../redux/tarifZoneRedux/callTarifZoneApi";
import {
  Box,
  Card,
  Grid,
  IconButton,
  Stack,
  styled,
  Typography,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";

import { useForm, Form } from "../../../../hooks/useFormTarif";
import { ToastContainer } from "react-toastify";

const Container = styled("div")({
  width: "100%",
  // backgroundColor:"red"
});
const Wrapper = styled(Box)(({ theme }) => ({
  // margin:"20px 0px",
  // width:"100%",
  padding: "30px",
  display: "flex",
  flex: "wrap",
  gap: "30px",
  [theme.breakpoints.down("sm")]: {
    // width:"100%",
    flexDirection: "column",
    // padding: "10px",
  },
}));
const Hr = styled("hr")({
  backgroundColor: "#eee",
  border: "none",
  height: "2px",
});

const DetailsCommandeContainer = styled("div")({
  flex: 2,
  // minWidth:"50%"
  /* ${mobile({ padding: "10px" })} */
});

function AddTarif({ location }) {
  // const cart = location.state;
  const dispatch = useDispatch();

  // const [cart, setCart] = useState(location.state);

  const initialFValues = {
    id: 0,
    pays: "",
    zone: "",
    tarif: "",
  };

  useEffect(() => {}, []);

  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    if ("pays" in fieldValues)
      temp.pays = fieldValues.pays ? "" : "Champ obligation";
    if ("zone" in fieldValues)
      temp.zone = fieldValues.zone ? "" : "Champ obligation";
    if ("tarif" in fieldValues)
      temp.tarif = fieldValues.tarif ? "" : "Champ obligation";

    //  temp.caract = fieldValues.caract.length != 0 ? "" : "This field is required."

    setErrors({ ...temp });
    console.log("temp", temp);
    console.log("errors", errors);
    if (fieldValues == values)
      return Object.values(temp).every((item) => item == "");
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFValues, true, validate);

  const createTarifZone = () => {
    console.log("VALUES", values);
    const data = {
      pays: values.pays,
      tarifs: [{ zone: values.zone, tarif: values.tarif }],
    };
    console.log("data", data);
    addTarifZone(dispatch, data);
    // console.log("values",values)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("passer test");
      createTarifZone();
    }
  };
  return (
    <>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={3}
        >
          <Typography variant="h4">Nouveau Tarif</Typography>
        </Stack>
        <Card>
          <Form onSubmit={handleSubmit}>
            <Wrapper>
              <DetailsCommandeContainer>
                <Grid
                  container
                  spacing={{ xs: 2, sm: 2 }}
                  columns={{ xs: 4, sm: 12 }}
                >
                  {/* <Grid item xs={4} sm={6}>
                  
                  </Grid> */}
                  <Grid item xs={4} sm={6}>
                    <Controls.Input
                      name="pays"
                      label="Pays"
                      value={values.pays}
                      onChange={handleInputChange}
                      error={errors.pays}
                      fullWidth
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={4} sm={6}>
                    <Controls.Input
                      name="zone"
                      label="Zone Ville/Region"
                      value={values.zone}
                      onChange={handleInputChange}
                      error={errors.zone}
                      fullWidth
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={4} sm={6}>
                    <Controls.Input
                      name="tarif"
                      label="Frais Livraison"
                      value={values.tarif}
                      onChange={handleInputChange}
                      error={errors.tarif}
                      fullWidth
                      size="small"
                    />
                  </Grid>

                  <Grid item xs={4} sm={12}></Grid>

                  <Stack
                    direction={"row"}
                    justifyContent={"flex-end"}
                    sx={{ width: "100%" }}
                  >
                    <Grid item xs={4} sm={2}>
                      <Controls.Button
                        type="submit"
                        text="Ajouter"
                        fullWidth
                        sx={{
                          backgroundColor: "primary",
                          color: "white",
                          padding: "10px",
                          margin: "30px 0px",
                          "&:hover": {
                            backgroundColor: "black",
                          },
                        }}
                      />
                    </Grid>
                  </Stack>
                </Grid>
              </DetailsCommandeContainer>
            </Wrapper>
          </Form>
        </Card>
        <ToastContainer />
      </Container>
    </>
  );
}

export default AddTarif;
AddTarif.auth = true;
AddTarif.layout = "profile";
