import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2C7FFF",
    },
    secondary: {
      main: "#465408",
    },
    background: {
      default: "#F9FAFB",
    },
  },
  typography: {
    fontFamily: "Poppins, Roboto, Arial",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          //   border: "1px solid",
          //   borderColor: "#ccc",
          borderRadius: "12px",
          height: "48px",
        },
      },
    },

    //     MuiIconButton: {
    //       styleOverrides: {
    //         root: {
    //           width: 40,
    //           height: 40,
    //           border: "1px solid",
    //           borderColor: "#ccc",
    //           borderRadius: 8,
    //         },
    //       },
    //     },

    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
          borderColor: "#1552e0",
        },
      },
    },
  },

  custom: {
    gradients: {
      primary: "linear-gradient(90deg, #AD47FF, #F6339A)",
      secondary: "linear-gradient(90deg, #F59E0B, #EF4444)",
    },
    background: {
      primary: "linear-gradient(90deg, #AD47FF, #F6339A)",
      secondary: "#d8ff2c",
    },
    outline: {
      main: "#d8d8d8",
    },
    solids : {
      danger: "#EF4444"
    }
  },
});

export default theme;
