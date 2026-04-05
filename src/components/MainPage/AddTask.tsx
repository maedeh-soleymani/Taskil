import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import AddIcon from "@mui/icons-material/Add";
import { Formik, Form } from "formik";
import { taskSchema } from "../../validations/taskValidation";
import { addTask } from "../../api/tasks";

// import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useContext, useState } from "react";
import { TaskContext } from "../../context/TaskContext";

const AddTask = () => {
  const { tasks, setTasks } = useContext(TaskContext);
  const [addTaskLoading, setAddTaskLoading] = useState(false);

  return (
    <Formik
      initialValues={{ taskName: "", due_date: new Date(), priority: "" }}
      validationSchema={taskSchema}
      onSubmit={async (values, { resetForm }) => {
        setAddTaskLoading(true);
        try {
          const status = await addTask({
            title: values.taskName,
            description: "",
            due_date: new Date(values.due_date),
            priority: values.priority,
          });
          const newTask = {
            title: values.taskName,
            description: "",
            due_date: new Date(values.due_date),
            priority: values.priority,
            id: status[0].id,
            created_at: new Date(),
          };

          setTasks([...tasks, newTask]);
          resetForm();
          setAddTaskLoading(false);

        } catch (error) {
          console.log("Error:", error);
          setAddTaskLoading(false);
        }
      }}
    >
      {({
        errors,
        touched,
        handleChange,
        handleBlur,
        values,
        setFieldValue,
        setFieldTouched,
      }) => (
        <Form>
          <Paper elevation={2} className="sectionLayout">
            <Stack direction="column" spacing={2}>
              <Box sx={{ textAlign: "left" }}>
                <h2>Add New Task</h2>
              </Box>
              <Stack direction="row" spacing={1}>
                <Box sx={{ flex: 1 }}>
                  <TextField
                    name="taskName"
                    fullWidth
                    placeholder="What needs to be done"
                    value={values.taskName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.taskName && Boolean(errors.taskName)}
                    helperText={touched.taskName && errors.taskName}
                    label="Title"
                  ></TextField>
                </Box>

                <IconButton
                  sx={{
                    width: 56,
                    height: 56,
                    border: "1px solid #b6b6b6",
                    borderRadius: "8px",
                  }}
                >
                  <KeyboardVoiceIcon />
                </IconButton>
              </Stack>
              <Box>
                <Container className="delStyle">
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm sx={{ flex: 1 }}>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                          sx={{ width: "100%" }}
                          name="due_date"
                          label="Pick a Day"
                          value={values.due_date}
                          //   value={values.dueDate}
                          //   onChange={handleChange}
                          //   onBlur={handleBlur}
                          onChange={(value) => setFieldValue("due_date", value)}
                          onBlur={() => setFieldTouched("due_date", true)}
                          renderInput={(params) => <TextField {...params} />}
                          //   inputFormat="dd/MM/yyyy" // فرمت نمایش داخل TextField
                          // mask="__/__/____"
                        />
                      </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12} sm sx={{ flex: 1 }}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Priority
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={values.priority}
                          label="Priority"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name="priority"
                        >
                          <MenuItem value={"High"}>🔴 High</MenuItem>
                          <MenuItem value={"Medium"}>🟠 Mediun</MenuItem>
                          <MenuItem value={"Low"}>🔵 Low</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Container>
              </Box>
              <Button
                disabled={addTaskLoading}
                loadingIndicator="Adding the Task..."
                loading={addTaskLoading}
                variant="contained"
                type="submit"
                startIcon={<AddIcon />}
              >
                Add Task
              </Button>
            </Stack>
          </Paper>
        </Form>
      )}
    </Formik>
  );
};

export default AddTask;
