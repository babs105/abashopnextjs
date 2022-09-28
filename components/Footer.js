import {
  AccountBox,
  Facebook,
  Instagram,
  MailOutline,
  Phone,
  Pinterest,
  Room,
  Twitter,
} from "@mui/icons-material";

import {
  List,
  ListItem,
  styled,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Link from "next/link";

const Container = styled("div")(({ theme }) => ({
  display: "flex",
  backgroundColor: "#FFFFFF",
  [theme.breakpoints.up("xs")]: {
    flexDirection: "column",
    justifyContent: "center",
    // alignItems:"center"
  },
  [theme.breakpoints.up("sm")]: {
    flexDirection: "row",
    // justifyContent:"center",
    // alignItems:"center"
  },
  // ${mobile({ flexDirection: "column" })}
}));

const Left = styled("div")({
  flex: 1,
  display: "flex",
  flexDirection: " column",
  // justifyContent:"start",
  padding: "20px",
});

const Logo = styled("h1")({});

const Desc = styled("p")({
  margin: "20px 0px",
  color: "gray",
});

const SocialContainer = styled("div")({
  display: "flex",
});

const SocialIcon = styled("div")({
  width: " 40px",
  height: " 40px",
  borderRadius: " 50%",
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginRight: "20px",
});

const Center = styled("div")({
  flex: 1,
  padding: "20px",
});

/* ${mobile({ display: "none" })} */

const Title = styled("h3")({
  // marginBottom: "30px",
});
// const List = styled.ul`
//   margin: 0;
//   padding: 0;
//   list-style: none;
//   display: flex;
//   flex-wrap: wrap;
// `;

// const ListItem = styled.li`
//   width: 50%;
//   margin-bottom: 10px;
// `;

const Right = styled("div")({
  flex: 1,
  padding: "20px",
});

// ${mobile({ backgroundColor: "#fff8f8" })}

const Payment = styled("img")({
  width: "50%",
});

const Footer = () => {
  // const pushNotifs = useSelector((state) => state.push.pushNotifs);
  return (
    <Container>
      <Left>
        <Logo>ABA.</Logo>
        <Desc>
          Il existe de nombreuses variantes de passages de Lorem Ipsum
          disponibles, mais la majorité ont subi une altération sous une forme
          ou une autre, par de l'humour injecté ou des mots aléatoires qui ne
          semblent même pas légèrement crédibles Nous vous garantissons la
          confection en moins de 15 jours. L'un des membres de notre équipe vous
          contactera après avoir finalisé votre commande. Merci pour votre
          confiance.
        </Desc>
        <SocialContainer>
          <SocialIcon sx={{ backgroundColor: "#3B5999" }}>
            <Facebook />
          </SocialIcon>
          <SocialIcon sx={{ backgroundColor: "#E4405F" }}>
            <Instagram />
          </SocialIcon>
          <SocialIcon sx={{ backgroundColor: "#55ACEE" }}>
            <Twitter />
          </SocialIcon>
          <SocialIcon sx={{ backgroundColor: "#E60023" }}>
            <Pinterest />
          </SocialIcon>
        </SocialContainer>
      </Left>
      <Center sx={{ display: { xs: "none", sm: "block" } }}>
        <Title>Liens utiles</Title>
        <List>
          <ListItem disablePadding>
            <Link href="/#">
              <ListItemText secondary="Accueil" />
            </Link>
          </ListItem>
          <ListItem disablePadding>
            <Link href="/#">
              <ListItemText secondary="Panier" />
            </Link>
          </ListItem>
          <ListItem disablePadding>
            <Link href="/#">
              <ListItemText secondary="Collection Homme" />
            </Link>
          </ListItem>
          <ListItem disablePadding>
            <Link href="/#">
              <ListItemText secondary="Collection Femme" />
            </Link>
          </ListItem>
          <ListItem disablePadding>
            <Link href="/#">
              <ListItemText secondary="Collection Enfant" />
            </Link>
          </ListItem>
          <ListItem disablePadding>
            <Link href="/#">
              <ListItemText secondary="Woman Fashion" />
            </Link>
          </ListItem>
          <ListItem disablePadding>
            <Link href="/#">
              <ListItemText secondary="Mon Compte" />
            </Link>
          </ListItem>
          <ListItem disablePadding>
            <Link href="/#">
              <ListItemText secondary="Suivi Commande " />
            </Link>
          </ListItem>
          <ListItem disablePadding>
            <Link href="/#">
              <ListItemText secondary="Wishlist" />
            </Link>
          </ListItem>
          <ListItem disablePadding>
            <Link href="/#">
              <ListItemText secondary="CGU" />
            </Link>
          </ListItem>
        </List>
      </Center>
      <Right>
        <Title>Contact</Title>

        <List>
          <ListItem disablePadding>
            {/* <ListItemButton> */}
            <ListItemIcon>
              <Room />
            </ListItemIcon>
            <ListItemText secondary=" Dakar Cite Citec," />
            {/* </ListItemButton> */}
          </ListItem>
          <ListItem disablePadding>
            {/* <ListItemButton> */}
            <ListItemIcon>
              <Phone />
            </ListItemIcon>
            <ListItemText secondary=" 221 77 682 23 28" />
            {/* </ListItemButton> */}
          </ListItem>
          <ListItem disablePadding>
            {/* <ListItemButton> */}
            <ListItemIcon>
              <MailOutline />
            </ListItemIcon>
            <ListItemText secondary="contact@aba.dev" />
            {/* </ListItemButton> */}
            {/* {pushNotifs} */}
          </ListItem>
        </List>
        <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
      </Right>
    </Container>
  );
};

export default Footer;
