import { Box, Paper, Stack } from "@mui/material";
import AddTask from "./AddTask";
import SuggestTaskAI from "./SuggestTaskAI";
import TasksList from "./TasksList";

const MainPage = () => {
  return (
    <>
    <Stack direction={"column"} spacing={3}>
        <AddTask />
        <SuggestTaskAI />
        <Paper elevation={2} className="sectionLayout">
          <TasksList />
        </Paper>
    </Stack>
    </>
  );
};

export default MainPage;
