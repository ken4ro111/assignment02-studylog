import { supabase } from "./supabase";

export const getAllStudyRecord = async () => {
  const { data, error } = await supabase
  .from("study-record")
  .select("*");

  if (error) throw new Error(error.message);

  return data;
};

export const insertStudyRecord = async (data) => {
  const { error } = await supabase
    .from("study-record")
    .insert({ ...data });

    if (error) throw new Error(error.message);
}

export const deleteStudyRecord = async (id) => {
  const { error } = await supabase
    .from("study-record")
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);
}
