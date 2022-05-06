import { useState } from "react";

export default function useUser() {
  const [nameContext, setNameContext] = useState("");
  const [userItems, setUserItems] = useState<object>({});
  const [eventItems, setEventItems] = useState<object>({});
  const [viewUserProfile, setViewUserProfile] = useState<object>({});
  const [updateScreen, setUpdateScreen] = useState<boolean>(false);
  const [updateProfileOther, setUpdateProfileOther] = useState<boolean>(false);
  const [updateProfileScreen, setUpdateProfileScreen] = useState<boolean>(false);

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
    setUpdateProfileScreen
  };
}
