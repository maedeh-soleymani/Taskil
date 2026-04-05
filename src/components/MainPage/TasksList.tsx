import TaskListItem from "./TaskListItem";
import { useContext } from "react";
import { TaskContext } from "../../context/TaskContext";
import { Box, Grid, Stack } from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";

import Paper from "@mui/material/Paper";

// Showing data with MUI Tables
const columns: GridColDef[] = [
  { field: "state", headerName: "", width: 72 },
  { field: "title", headerName: "Title", width: 250 },
  { field: "priority", headerName: "Priority", width: 160 },
  { field: "due_date", headerName: "Due Date", width: 130 },
  { field: "created", headerName: "Created", width: 130 },

];
const paginationModel = { page: 0, pageSize: 10 };
// ------------ /Showing data with MUI Tables ------------

const TasksList = () => {
  const { tasks } = useContext(TaskContext);
  // Showing data with MUI Tables
  const rows = [];
  tasks.map((task, key) => {
    rows.push({
      id: task.id,
      title: task.title,
      priority: task.priority,
      due_date: task.due_date,
      created: task.created,
      state: task.state
    });
  });
  // ------------ /Showing data with MUI Tables ------------
  return (
    <>
      {/* Showing data with MUI Tables */}
      {/* <Paper sx={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          // checkboxSelection
          sx={{ border: 0 }}
        />
      </Paper> */}
      {/* ------------ /Showing data with MUI Tables ------------ */}

      <Stack
        direction={"row"}
        spacing={1}
        sx={{ borderBottom: "1px solid #E9EAED", padding: "1rem" }}
      >
        <Box
          flex={1}
          sx={{
            color: "#8d8d8d",
            alignContent: "center",
            textAlign: "left",
          }}
        >
          {/* Title */}
        </Box>
        <Box
          flex={6}
          sx={{
            color: "#8d8d8d",
            alignContent: "center",
            textAlign: "left",
          }}
        >
          Title
        </Box>
        <Box
          flex={2}
          sx={{
            color: "#8d8d8d",
            alignContent: "center",
            textAlign: "left",
          }}
        >
          Priority
        </Box>
        <Box
          flex={2}
          sx={{
            color: "#8d8d8d",
            alignContent: "center",
            textAlign: "left",
          }}
        >
          Due Date
        </Box>
        <Box
          flex={2}
          sx={{
            color: "#8d8d8d",
            alignContent: "center",
            textAlign: "left",
          }}
        >
          Created
        </Box>
        {/* <Box
          flex={2}
          sx={{
            color: "#8d8d8d",
            alignContent: "center",
            textAlign: "left",
          }}
        ></Box> */}
      </Stack>
      {tasks.length > 0 ? (
        tasks.map((task, key) => {
          return <TaskListItem task={task} key={key} />;
        })
      ) : (
        <h4>No tasks yet. Add your first task above!</h4>
      )}
    </>
  );
};

export default TasksList;

//     {tasks.map((task) => (
//       <h2>{task.title}</h2>
//   <TaskListItem />
//     ))}
