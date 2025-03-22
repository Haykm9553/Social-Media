import { useDispatch, useSelector } from "react-redux";
import {
  selectProjectContent,
  setProjectSection,
} from "../../store/slices/ProjectSlices/ProjectSlice"
import "./ProjectPage.css";

const ProjectPage = () => {
  const dispatch = useDispatch();
  const projectContent = useSelector(selectProjectContent);
  return (
    <div className="ProjectPage">
      <aside className="AsideBar">
        <div className="MyProject">
          <p onClick={() => dispatch(setProjectSection("ToDo"))}>To Do List</p>
          <p onClick={() => dispatch(setProjectSection("UserTable"))}>
            User Table
          </p>
        </div>
      </aside>
      <div className="Projects">{projectContent}</div>
    </div>
  );
};

export default ProjectPage;
