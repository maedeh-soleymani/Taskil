import { createContext, useContext, useEffect, useState } from "react";
import { getTasks } from "../api/tasks";

type Task = {
  id:string;
  title: string;
  // description: string;
  due_date: string;
  created: string;
  priority: string;
  state:number;
};

type TaskContextType = {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;

  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;

  AllTaskDoneFlag: boolean;
  setAllTaskDoneFlag: React.Dispatch<React.SetStateAction<boolean>>;
};

// const TaskContext = createContext < TaskContextType || null > (null);

export const TaskContext = createContext<TaskContextType>({
  loading: false,
  setLoading: () => {},
  setTasks: () => {},
  tasks: [],
  setAllTaskDoneFlag:()=>{},
  AllTaskDoneFlag:false
});
