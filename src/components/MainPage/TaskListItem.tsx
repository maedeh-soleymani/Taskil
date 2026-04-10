import {
  Box,
  Button,
  Checkbox,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  Stack,
} from "@mui/material";
import { deleteTask, editTask } from "../../api/tasks";
import { useContext, useState } from "react";
import { TaskContext } from "../../context/TaskContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import theme from "../../theme/theme";

const TaskListItem = ({ task }) => {
  const [deleteId, setDeleteId] = useState(null);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({ taskId, updates }) => editTask(taskId, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: ({ taskId }) => deleteTask(taskId),
    onSuccess: () => {
      alert("Task Deleted!");
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const { setTasks, tasks } = useContext(TaskContext);
  const [updatedTasks, setupdatedTasks] = useState([]);

  const formatDate = (str) => {
    const date = new Date(str);
    const formatted = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    return formatted;
  };

  const taskStatusChange = async () => {
    // console.log(task);
    let newState = task.state;
    if (task.state === 1) {
      newState = 0;
    } else newState = 1;

    try {
      mutation.mutate({
        taskId: task.id,
        updates: { state: newState },
      });

      // -------------- Edit Task Using set Tasks ------------
      // const response = await editTask(task.id, { state: newState });
      // console.log("Change Status Done:", response);

      // const updatedTasks = tasks.map((t) =>
      //   t.id === task.id ? { ...t, state: newState } : t,
      // );
      // setTasks(updatedTasks); // TODO: if user try to change state of the task after adding teh task without refreash id would be empty and got error
      //-----------------------------
    } catch (error) {
      console.log("error on changing status:", error);
    }
  };

  let priorityColor = "";
  switch (task.priority) {
    case "High":
      priorityColor = "error";
      break;
    case "Medium":
      priorityColor = "warning";
      break;
    case "Low":
      priorityColor = "info";
      break;
    default:
      break;
  }

  const titleStyle = Boolean(task.state)
    ? {
        color: "#a2a2a2",
        textDecoration: "line-through",
        alignContent: "center",
        textAlign: "left",
      }
    : {
        color: "#111",
        alignContent: "center",
        textAlign: "left",
      };
  return (
    <>
      <Stack
        direction={"row"}
        spacing={1}
        sx={{ borderBottom: "1px solid #E9EAED", padding: "1rem" }}
      >
        <Box flex={1} sx={{ textAlignLast: "start" }}>
          <Checkbox onChange={taskStatusChange} checked={Boolean(task.state)} />
        </Box>
        <Box flex={6} sx={titleStyle}>
          {task.title}
        </Box>
        <Box
          flex={2}
          sx={{ textAlignLast: "start" }}
          //   sx={
          //     task.priority
          //       ? {
          //           bgcolor: "#FFE2E2",
          //           color: "#FC3D47",
          //           borderRadius: "3rem",
          //           alignContent: "center",
          //         }
          //       : {
          //           bgcolor: "",
          //           color: "#8d8d8d",
          //           borderRadius: "3rem",
          //           alignContent: "center",
          //         }
          //   }
        >
          <Chip
            label={task.priority ? task.priority : "Not Specified"}
            color={priorityColor}
          />
          {/* {task.priority ? task.priority : "Not Specified"} */}
        </Box>
        <Box flex={2} sx={{ textAlignLast: "start" }}>
          {formatDate(task.due_date)}
        </Box>
        <Box flex={2} sx={{ textAlignLast: "start" }}>
          {formatDate(task.created_at)}
        </Box>
        <Box flex={1} sx={{ textAlignLast: "start" }}>
          <IconButton
            sx={{
              width: 40,
              height: 40,
              // border: "1px solid #de3b3b",
              borderRadius: "8px",
            }}
            onClick={() => {
              setDeleteId(task.id);
              // deleteMutation.mutate({ taskId: task.id });
            }}
          >
            <DeleteForeverIcon
              sx={(theme) => ({ color: theme.custom.solids.danger })}
            />
          </IconButton>
          {/* <Button
            color="secondary"
            sx={(theme) => ({ color: theme.custom.solids.danger })}
          >
            Delete
          </Button> */}
        </Box>
      </Stack>

      <Dialog open={!!deleteId} onClose={() => setDeleteId(null)}>
        <DialogTitle>Delete task?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            sx={(theme) => ({ color: theme.palette.secondary.main })}
            onClick={() => setDeleteId(null)}
          >
            Cancel
          </Button>

          <Button
            sx={(theme) => ({ color: theme.custom.solids.danger })}
            // color="error"
            onClick={() => {
              deleteMutation.mutate({ taskId: deleteId });
              setDeleteId(null);
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TaskListItem;
