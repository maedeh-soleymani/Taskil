import { supabase } from "../lib/supabase";

export const getTasks = async () => {

  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    console.log("Supabase Err on Getting Tasks:", error);
    throw error;
  }
  // console.log("Supabase Data on Getting Tasks:", data);

  return data;
};

export const addTask = async (task‌: {
  title: string;
  description: string;
  priority: string;
  due_date: Date;
}) => {
  const { data, error } = await supabase
    .from("tasks")
    .insert([task‌])
    .select("*");
  if (error) {
    // console.log("Supabase Err on Adding a Task:", error);
    throw error;
  }
  // console.log("Supabase Data on Adding a Taks:", data);

  return data;
};

export const editTask = async (taskId: string, updates: any) => {
  const { data, error } = await supabase
    .from("tasks")
    .update(updates) // 👈 فقط فیلدهایی که میخوای تغییر بدی
    .eq("id", taskId).select(); // 👈 مشخص کردن کدوم تسک
  // console.log("editTask data:", data);

  if (error) {
    // console.log("Update Error:", error);
    throw error;
  }

  return data;
};
