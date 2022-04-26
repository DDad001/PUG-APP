import { useState } from "react";

export default function useUser() {
  const [name, setName] = useState("");
  const [userItems, setUserItems] = useState<object>({});

  return { name, setName, userItems, setUserItems};
}
