// component
import Iconify from "../../components/Iconify";

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

export const navConfig = [
  {
    title: "dashboard",
    path: "/admin",
    icon: getIcon("eva:pie-chart-2-fill"),
  },

  {
    title: "produits",
    path: "/allproducts",
    icon: getIcon("eva:shopping-bag-fill"),
  },
  {
    title: "Commandes",
    path: "/orders",
    icon: getIcon("eva:file-text-fill"),
  },
  {
    title: "Utilisateurs",
    path: "/admin/users",
    icon: getIcon("eva:people-fill"),
  },
  {
    title: "login",
    path: "/login",
    icon: getIcon("eva:lock-fill"),
  },
  {
    title: "register",
    path: "/register",
    icon: getIcon("eva:person-add-fill"),
  },
  {
    title: "Not found",
    path: "/404",
    icon: getIcon("eva:alert-triangle-fill"),
  },
];
export const navProfile = [
  {
    title: "Mon Profile",
    path: "/profile",
    icon: getIcon("eva:pie-chart-2-fill"),
  },

  // {
  //   title: "Mes Commandes",
  //   path: "/allproducts",
  //   icon: getIcon("eva:shopping-bag-fill"),
  // },
  {
    title: "Mes Commandes",
    path: "/user/orders/myorders",
    icon: getIcon("eva:file-text-fill"),
  },
  {
    title: "Mes Contacts",
    path: "/contact",
    icon: getIcon("eva:file-text-fill"),
  },
  {
    title: "Administration",
    path: "#",
    icon: getIcon("eva:people-fill"),
    children: [
      {
        title: "dashboard",
        path: "/admin",
        icon: getIcon("eva:pie-chart-2-fill"),
      },

      {
        title: "Les produits",
        path: "/admin/products",
        icon: getIcon("eva:shopping-bag-fill"),
      },
      {
        title: "Les Commandes",
        path: "/admin/orders",
        icon: getIcon("eva:file-text-fill"),
      },
      {
        title: "Categories",
        path: "/admin/categories",
        icon: getIcon("carbon:categories"),
      },
      {
        title: "Tarifs Livraision",
        path: "/admin/tarifzone",
        icon: getIcon("carbon:categories"),
      },

      {
        title: "Clients",
        path: "/admin/users",
        icon: getIcon("eva:people-fill"),
      },
      // {
      //   title: "login",
      //   path: "/login",
      //   icon: getIcon("eva:lock-fill"),
      // },
      // {
      //   title: "register",
      //   path: "/register",
      //   icon: getIcon("eva:person-add-fill"),
      // },
      // {
      //   title: "Not found",
      //   path: "/404",
      //   icon: getIcon("eva:alert-triangle-fill"),
      // },
    ],
  },
  // {
  //   title: "Test",
  //   path: "#",
  //   icon: getIcon("eva:people-fill"),
  //   children: [
  //     { title: "test", path: "/test", icon: getIcon("eva:people-fill") },
  //   ],
  // },
];
