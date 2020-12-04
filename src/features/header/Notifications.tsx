import React, { useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
// MUI stuff
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
// Icons
import NotificationsIcon from "@material-ui/icons/Notifications";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ChatIcon from "@material-ui/icons/Chat";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "app/store";
import { markNotificationsRead } from "features/user/userSlice";

export default function Notifications() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null),
    dispatch = useDispatch(),
    notifications = useSelector(
      (state: RootState) => state.user.currentUser.notifications
    ),
    handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    },
    handleClose = () => {
      setAnchorEl(null);
    },
    onMenuOpened = () => {
      let unreadNotificationsIds = notifications
        .filter(not => !not.read)
        .map(not => not.notificationId);
      console.log("entered", unreadNotificationsIds);
      dispatch(markNotificationsRead(unreadNotificationsIds));
    };

  dayjs.extend(relativeTime);

  let notificationsIcon =
    notifications && notifications.length > 0 ? (
      notifications.filter(not => not.read === false).length > 0 ? (
        <Badge
          badgeContent={notifications.filter(not => not.read === false).length}
          color="secondary"
        >
          <NotificationsIcon />
        </Badge>
      ) : (
        <NotificationsIcon />
      )
    ) : (
      <NotificationsIcon />
    );

  let notificationsMarkup =
    notifications && notifications.length > 0 ? (
      notifications.map(not => {
        const verb = not.type === "like" ? "liked" : "commented on";
        const time = dayjs(not.createdAt._seconds * 1000).fromNow();
        const iconColor = not.read ? "primary" : "secondary";
        const icon =
          not.type === "like" ? (
            <FavoriteIcon color={iconColor} style={{ marginRight: 10 }} />
          ) : (
            <ChatIcon color={iconColor} style={{ marginRight: 10 }} />
          );

        return (
          <MenuItem key={not.createdAt._seconds} onClick={handleClose}>
            {icon}
            <Typography variant="body1">
              {not.sender} {verb} your scream {time}
            </Typography>
          </MenuItem>
        );
      })
    ) : (
      <MenuItem onClick={handleClose}>You have no notifications yet</MenuItem>
    );
  return (
    <>
      <Tooltip placement="top" title="Notifications">
        <IconButton
          aria-owns={anchorEl ? "simple-menu" : undefined}
          aria-haspopup="true"
          onClick={handleOpen}
        >
          {notificationsIcon}
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        onEntered={onMenuOpened}
      >
        {notificationsMarkup}
      </Menu>
    </>
  );
}
