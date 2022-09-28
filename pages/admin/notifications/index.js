import PropTypes from "prop-types";
import { set, sub } from "date-fns";
import { noCase } from "change-case";
import { faker } from "@faker-js/faker";
import { useState, useRef } from "react";
import moment from "moment";
// @mui
import {
  Box,
  List,
  Card,
  Badge,
  Button,
  Avatar,
  Tooltip,
  Divider,
  Typography,
  IconButton,
  ListItemText,
  ListSubheader,
  ListItemAvatar,
  ListItemButton,
} from "@mui/material";

// utils
import { fToNow } from "../../../utils/formatTime";

// components
import Iconify from "../../../components/Iconify";
import { useDispatch, useSelector } from "react-redux";
import useSWR from "swr";
import { BASEURL } from "../../../utils/baseUrl";
import { userRequest } from "../../../axios/axios";
import {
  readAllNotif,
  readOneNotif,
} from "../../../redux/notifRedux/callNotifApi";
import { getStatOrder } from "../../../utils/GetStatusOrder";
import { ToastContainer } from "react-toastify";

const fetcherFunc = (url) => {
  console.log("fecth SWR");
  return userRequest.get(url).then((res) => res.data);
};
function Notifications() {
  const dispatch = useDispatch();
  //   const anchorRef = useRef(null);
  // const notifs = useSelector((state) => state.notif.notifs);
  // const notifs = [6];
  const user = useSelector((state) => state.user.currentUser);
  // const [notifications, setNotifications] = useState(NOTIFICATIONS);

  const { data: notifs, error } = useSWR(
    user?.roles.includes("ROLE_ADMIN")
      ? `${BASEURL}/notif/getAllNotification`
      : `${BASEURL}/notif/getUserNotification/${user.id}`,
    fetcherFunc,
    {
      //   refreshInterval: 3000,
      revalidateOnMount: true,
    }
  );
  const totalUnRead = notifs?.filter(
    (notification) => notification.read === false
  ).length;
  const handleMarkAllAsRead = () => {
    // setNotifications(

    const updateNotifs = notifs?.map((notification) => {
      if (notification.readerUsers.length === 0) {
        return {
          ...notification,
          read: true,
          readerUsers: [user.id],
        };
      } else {
        if (notification.readerUsers.indexOf(user.id) === -1) {
          // notification.readerUsers.push(user.id);
          return {
            ...notification,
            read: true,
            readerUsers: [...notification.readerUsers, user.id],
          };
        }
      }
    });
    readAllNotif(dispatch, updateNotifs);
    // dispatch(pushNotifSucces(updateNotifs));
    // );
  };
  const handleMarkOneAsRead = (notif) => {
    // setNotifications(
    const notifRead = {};
    console.log("NOTIIF", notif);
    notifs?.map((notification) => {
      if (notification.id === notif.id) {
        if (notification.readerUsers.length === 0) {
          notifRead = {
            ...notification,
            read: true,
            readerUsers: [user.id],
          };
        }
      } else {
        if (notification.readerUsers.indexOf(user.id) === -1) {
          notifRead = {
            ...notification,
            read: true,
            readerUsers: [...notification.readerUsers, user.id],
          };
        }
      }
    });
    readOneNotif(dispatch, notifRead);
    // dispatch(pushNotifSucces(updateNotifs));
  };
  if (!notifs) return <div>Loading ...</div>;
  if (error) return <div>Erreur ! </div>;
  return (
    <Card>
      <List
        disablePadding
        subheader={
          <ListSubheader
            disableSticky
            sx={{ py: 1, px: 2.5, typography: "overline" }}
          >
            {"Notifications"}
          </ListSubheader>
        }
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            <span> {totalUnRead}</span> messages non-lus
          </Typography>
          {totalUnRead > 0 && (
            <Tooltip title=" Marquer tous comme lus">
              <IconButton
                size="small"
                sx={{ fontSize: "8px" }}
                color="primary"
                onClick={handleMarkAllAsRead}
              >
                {/* {"Marquer tous comme lus"} */}
                <Iconify icon="eva:done-all-fill" width={20} height={20} />
              </IconButton>
            </Tooltip>
          )}
        </Box>
        <Divider />
        {notifs.map((notification) => {
          return (
            <>
              <NotificationItem
                key={notification.id}
                notification={notification}
                user={user}
                handleAsRead={handleMarkOneAsRead}
              />
              <Divider />
            </>
          );
        })}
      </List>
      <ToastContainer />
    </Card>
  );
}
Notifications.auth = true;
Notifications.layout = "profile";
export default Notifications;
NotificationItem.propTypes = {
  notification: PropTypes.shape({
    createdAt: PropTypes.instanceOf(Date),
    id: PropTypes.string,
    isUnRead: PropTypes.bool,
    title: PropTypes.string,
    description: PropTypes.string,
    type: PropTypes.string,
    avatar: PropTypes.any,
  }),
};

function NotificationItem({ notification, user, handleAsRead }) {
  const { avatar, title } = renderContent(notification);

  return (
    <ListItemButton
      sx={{
        display: "flex",
        py: 1.5,
        px: 2.5,
        mt: "1px",
        ...// notification.read === false
        // (notification.readerUsers.indexOf(user.id) === -1 && {
        //   bgcolor: "action.selected",
        // }),
        (notification.read === false && {
          bgcolor: "action.selected",
        }),
      }}
    >
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: "background.neutral" }}>{avatar}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={title}
        secondary={
          <Typography
            variant="caption"
            sx={{
              mt: 0.5,
              display: "flex",
              flexDirection: "column",
              // alignItems: "center",
              color: "text.disabled",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Iconify
                icon="eva:clock-outline"
                sx={{ mr: 0.5, width: 16, height: 16 }}
              />
              {notification.dateNotif}
            </Box>
            <Typography
              variant="caption"
              sx={{
                // mt: 0.5,
                display: "flex",
                flexDirection: "column",
                // alignItems: "center",
                color: "text.disabled",
              }}
            >
              {fToNow(
                moment(notification.dateNotif, "DD/MM/YYYY HH:mm")
                  .toDate()
                  .toString()
              )}{" "}
            </Typography>
          </Typography>
        }
      />
      {notification.read ? (
        <Tooltip title="Actions">
          <IconButton
            color="primary"
            //  onClick={() => handleAsRead(notification)}
          >
            <Iconify icon="eva:more-horizontal-fill" width={20} height={20} />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title=" Marquer comme lus">
          <IconButton
            color="primary"
            onClick={() => handleAsRead(notification)}
          >
            <Iconify icon="eva:checkmark-fill" width={20} height={20} />
          </IconButton>
        </Tooltip>
      )}
    </ListItemButton>
  );
}

// ----------------------------------------------------------------------

function renderContent(notification) {
  const mes = notification?.message.split(" ");
  const title = (
    <>
      <Typography variant="subtitle2">{notification.title}</Typography>
      <Typography component="span" variant="body2" sx={{ color: "blue" }}>
        &nbsp;
        {mes.length === 2
          ? mes[0] + " " + getStatOrder(Number(mes[1]))
          : noCase(notification?.message)}
      </Typography>
    </>
  );

  // if (notification.to === "all") {
  //   return {
  //     avatar: (
  //       <img
  //         alt={notification.title}
  //         src="/static/icons/ic_notification_package.svg"
  //       />
  //     ),
  //     title,
  //   };
  // }
  // if (notification.to === "private") {
  //   return {
  //     avatar: (
  //       <img
  //         alt={notification.title}
  //         src="/static/icons/ic_notification_shipping.svg"
  //       />
  //     ),
  //     title,
  //   };
  // }
  // if (notification.type === "mail") {
  //   return {
  //     avatar: (
  //       <img
  //         alt={notification.title}
  //         src="/static/icons/ic_notification_mail.svg"
  //       />
  //     ),
  //     title,
  //   };
  // }
  // if (notification.type === "chat_message") {
  //   return {
  //     avatar: (
  //       <img
  //         alt={notification.title}
  //         src="/static/icons/ic_notification_chat.svg"
  //       />
  //     ),
  //     title,
  //   };
  // }
  // return {
  //   avatar: notification.avatar ? (
  //     <img alt={notification.title} src={notification.avatar} />
  //   ) : null,
  //   title,
  // };
  return {
    avatar: (
      <img
        alt={notification.title}
        src="/static/icons/ic_notification_mail.svg"
      />
    ),
    title,
  };
}
