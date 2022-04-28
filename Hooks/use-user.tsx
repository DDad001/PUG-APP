import { useState } from "react";

export default function useUser() {
  const [nameContext, setNameContext] = useState("");
  const [userItems, setUserItems] = useState<object>({});
  const [eventItems, setEventItems] = useState<object>({});

  return { nameContext, setNameContext, userItems, setUserItems, eventItems, setEventItems};
}
