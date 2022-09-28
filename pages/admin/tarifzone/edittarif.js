import React, { useEffect, useRef, useState } from "react";
import Controls from "../../../components/controls/Controls";
import {
  addTarifZone,
  updateTarifZone,
} from "../../../redux/tarifZoneRedux/callTarifZoneApi";
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

import { useForm, Form } from "../../../hooks/useFormTarif";
import { ToastContainer } from "react-toastify";
import { tarifZoneService } from "../../../service/tarifZoneService";
import { useRouter } from "next/router";
import useSWR from "swr";
import axios from "axios";
import { publicRequest } from "../../../axios/axios";
import { BASEURL } from "../../../utils/baseUrl";

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

const fetcherFunc = (url) => {
  console.log("CALL SWR");
  return axios.get(url).then((res) => res.data);
};
function EditTarif({ tarifInit }) {
  // const cart = location.state;
  const [keyword, setKeyword] = useState(null);

  const dispatch = useDispatch();
  const router = useRouter();

  const hasMounted = useRef(false);

  // const [cart, setCart] = useState(location.state);

  const initialFValues = {
    id: 0,
    pays: "",
    zone: "",
    tarif: "",
  };

  useEffect(() => {}, []);
  const { data: tarif, error } = useSWR(
    keyword ? `${BASEURL}/tarifZone/getTarifZoneById/${keyword}` : null,
    fetcherFunc,
    {
      fallbackData: hasMounted.current ? undefined : tarifInit,
    }
  );
  useEffect(() => {
    console.log("mounted");
    hasMounted.current = true;
  }, []);
  useEffect(() => {
    console.log("tarif", tarif);
    setKeyword(router.query.id);
    setValues({
      ...tarif,
      zone: tarif.tarifs[0].zone,
      tarif: tarif.tarifs[0].tarif,
    });
  }, [router.isReady]);

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

  const updateTarif = () => {
    console.log("VALUES", values);
    const data = {
      pays: values.pays,
      tarifs: [{ zone: values.zone, tarif: values.tarif }],
    };
    console.log("data", data);
    updateTarifZone(dispatch, data);
    // console.log("values",values)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("passer test");
      updateTarif();
    }
  };

  if (!tarif) return <div>Loading... </div>;
  if (error) return <div>Erreur </div>;
  return (
    <>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={3}
        >
          <Typography variant="h4">Editer Tarif</Typography>
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
                        text="Modifier"
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

export default EditTarif;

EditTarif.auth = true;
EditTarif.layout = "profile";
export async function getServerSideProps(context) {
  //req res query
  // const { token } = cookies(context);
  const id = context.query.id;

  // console.log("TOKEN", token);

  try {
    const data = await tarifZoneService.getTarifZoneById(id);
    // const response = await publicRequest.get(
    //   "/tarifZone/getTarifZoneById/" + id
    // );
    // const data = response.data;
    // const data = await axios.get(
    //   `http://localhost:8080/tarifZone/getTarifZoneById/${id}`
    // );
    console.log("get product data");
    console.log("data", data);
    // const initialKey = buildKey(id);
    return { props: { tarifInit: data } };
  } catch (err) {
    return { props: { error: "Something went wrong." } };
  }
}
