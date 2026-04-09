import "./App.css";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {
  Button,
  CssBaseline,
  IconButton,
  Paper,
  Stack,
  Tab,
  Tabs,
} from "@mui/material";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import AddTask from "./components/MainPage/AddTask";
import { useEffect, useState } from "react";
import { getTasks } from "./api/tasks";
import TasksList from "./components/MainPage/TasksList";
import { TaskContext } from "./context/TaskContext";
import theme from "./theme/theme";
// import { ThemeProvider } from "@emotion/react";
import { ThemeProvider } from "@mui/material";
import SuggestTaskAI from "./components/MainPage/SuggestTaskAI";
import MainPage from "./components/MainPage/MainPage";
import MovieList from "./components/MoviesPage/MovieList";
import { useQuery } from "@tanstack/react-query";

function App() {
  // const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [AllTaskDoneFlag, setAllTaskDoneFlag] = useState();
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const {
    data: tasks = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
  });
  // if (isLoading) console.log("isLoading:", isLoading);
  if (error) console.log("Error:", error);


  // ------------ Getting Tasks with useEffect ------------
  // useEffect(() => {
  //   const fetchList = async () => {
  //     const taskList = await getTasks();
  //     setTasks(taskList);
  //   };

  //   fetchList();
  // }, []);

  useEffect(() => {
    setAllTaskDoneFlag(!tasks.some((t) => t.state === 0));
    console.log("AllTaskDoneFlag", AllTaskDoneFlag);
  }, [tasks]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <TaskContext.Provider
        value={{
          tasks,
          loading,
          // setTasks,
          setLoading,
          setAllTaskDoneFlag,
          AllTaskDoneFlag,
        }}
      >
        <Container className="mainLayout" maxWidth="md">
          {/* <Stack direction="column" spacing={3}> */}
          {/* <MainPage /> */}
          <Box sx={{ width: "100%" }}>
            <MainPage />
            {/* Uncomment to show Tabs */}
            {/* Tabs */}
            {/* <Tabs
              value={value}
              onChange={handleChange}
              sx={(theme) => ({
                marginBottom: "1rem",
                borderBottom: "1px solid",
                borderColor: theme.custom.outline.main,
              })}
            >
              <Tab label="Tasks" />
              <Tab label="Movies" />
            </Tabs> */}
            {/* Content */}
            {/* <Box sx={{ mt: 2 }}> */}
            {/* Uncomment to show Tabs */}
            {/* {value === 0 && <MainPage />} */}
            {/* {value === 1 && <MovieList />} */}
            {/* </Box> */}
          </Box>
          {/* </Stack> */}
        </Container>
      </TaskContext.Provider>
    </ThemeProvider>
  );
}

export default App;
