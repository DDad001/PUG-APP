import { useState } from "react";

export default function useUser() {
  const [name, setName] = useState("");

  return { name, setName };
}
