import * as YUP from "yup";

export const taskSchema = YUP.object().shape({
    taskName : YUP.string().required("Give task a title!")
});
