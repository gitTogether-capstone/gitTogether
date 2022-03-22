import supabase from "../client";
const SET_PROJECTS = "SET_PROJECTS";

export const setProjects = (projects) => ({ type: SET_PROJECTS, projects });

export const fetchProjects = () => {
  return async (dispatch) => {
    let { data: projects, error } = await supabase
      .from("projects")
      .select(
        `
    *,
    languages (id, name),
    categories (id, name),
    projectUser(*, user(id, username, imageUrl))
    `
      )
      .eq("projectUser.isOwner", true);

    console.log("new project fetch", projects);
    if (error) {
      console.log(error);
    }
    dispatch(setProjects(projects));
  };
};

const initState = [];

export default (state = initState, action) => {
  switch (action.type) {
    case SET_PROJECTS:
      return action.projects;
    default:
      return state;
  }
};
