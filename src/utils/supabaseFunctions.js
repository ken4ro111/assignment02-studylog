import { supabase } from "./supabase";

export const getAllStudyRecord = async () => {
  const { data, error } = await supabase
  .from("study-record")
  .select("*");

  if (error) throw new Error(error.message);

  return data;
};