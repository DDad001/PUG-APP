import { useState } from "react";

export default function useUser() {
  const [nameContext, setNameContext] = useState("");
  const [userItems, setUserItems] = useState<object>({});
  const [eventItems, setEventItems] = useState<object>({});
  const [viewUserProfile, setViewUserProfile] = useState<object>({});
  const [usersNotifications, setUsersNotifications] = useState<object>([]);
  const [newNotifications, setNewNotifications] = useState<object>([]);
  const [updateScreen, setUpdateScreen] = useState<boolean>(false);
  const [updateProfileOther, setUpdateProfileOther] = useState<boolean>(false);
  const [updateProfileScreen, setUpdateProfileScreen] = useState<boolean>(false);
  const [followersBool, setFollowersBool] = useState<boolean>(false);
  const [followingBool, setFollowingBool] = useState<boolean>(false);
  const [updateEventScreen, setUpdateEventScreen] = useState<boolean>(false);
  const [updateNotificationsScreen, setUpdateNotificationsScreen] = useState<boolean>(false);

  return {
    nameContext,
    setNameContext,
    userItems,
    setUserItems,
    eventItems,
    setEventItems,
    viewUserProfile,
    setViewUserProfile,
    updateScreen,
    setUpdateScreen,
    updateProfileOther,
    setUpdateProfileOther,
    updateProfileScreen, 
    setUpdateProfileScreen,
    followersBool, 
    setFollowersBool,
    followingBool,
    setFollowingBool,
    updateEventScreen, 
    setUpdateEventScreen,
    updateNotificationsScreen, 
    setUpdateNotificationsScreen,
    usersNotifications,
    setUsersNotifications,
    newNotifications,
    setNewNotifications
  };
}
