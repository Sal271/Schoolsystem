import { useEffect, useState } from "react";
import { Appearance } from "react-native";
export function useColors() {
  const [scheme, setScheme] = useState(Appearance.getColorScheme());
  useEffect(() => {
    Appearance.addChangeListener(({ colorScheme }) => {
      setScheme(colorScheme);
    });
  }, []);
  if (scheme == "light") {
    return {
      scheme: scheme,
      textColor: "black",
      amitBlue: "#0C46C4",
    };
  }
  return {
    scheme: scheme,
    textColor: "black",
    amitBlue: "#0C46C4",
  };
}
