import styled, { ThemeProvider } from "styled-components";
import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

const App = () => {
  const theme = {
    colors: {
      heading: "       ",
      text: "rgba(29,29,29,.8)",
      white: "#fff",
      black: "#000",
      helper: "#8490ff",
      submitBtn: "#5a55f2",
      adminBtnColor: "#007BFF",
      colorProfileCat: "#f5f5f5",
      themeColor: "rgb(166, 199, 108)",
      blue: "#f5f5f5",

      bg: "#F6F8FA",
      footer_bg: "#0a1435",
      border: "rgba(98,84,243,0.5)",
      hr: "#ffffff",
      gradient:
        "linear-gradient(0deg,rgb(132 144 255) 0% rgb(98 189 252) 100%)",
      shadow:
        "rgba(0,0,0,0.02) 0px 1px 3px 0px, rgba(27,31,35,0.15) 0px 0px 0px 1px;",
      shadowSupport: "rgba(0, 0, 0 ,0.16) 0px 1px 4px",
      btn: "#28a745",
      grey: "#EEEEEE",
    },
    media: {
      mobile: "768px ",
      tab: "998px ",
    },
  };
  return (
    <>
      <ThemeProvider theme={theme}>
        <Toaster />
        <main>
          <Outlet />
        </main>
      </ThemeProvider>

    </>
  );
};

const Wrapper = styled.section`

`;

export default App;
