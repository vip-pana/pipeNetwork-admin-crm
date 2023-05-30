import {
  ChakraProvider,
  ColorModeScript,
  useColorMode,
} from "@chakra-ui/react";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { Contacts } from "./pages/Contacts";
import { Base } from "./pages/Base";
import { ContactDetail } from "./pages/ContactDetail";
import { RequireAuth } from "./features/RequireAuth";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export const App = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <ColorModeScript />
      <ChakraProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <Login
                  colorMode={colorMode}
                  toggleColorMode={toggleColorMode}
                />
              }
            />
            <Route element={<RequireAuth></RequireAuth>}>
              <Route element={<Base />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="contacts" element={<Contacts />}></Route>
                <Route path="contacts/:id" element={<ContactDetail />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </>
  );
};
