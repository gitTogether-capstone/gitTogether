import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './ProjectModal.css';

const Modal = (props) => {
  useEffect(() => {
    document.addEventListener('keydown', closeProject, false);
    return function cleanup() {
      document.removeEventListener('keydown', closeProject, false);
    };
  }, []);

  function closeProject(e) {
    if (e.key === 'Escape') {
      props.onClose();
    }
  }

  if (!props.show.display) {
    return null;
  }

  return (
    <div className="project-modal" onClick={props.onClose}>
      <div className="modal-footer">
        <button
          style={{ cursor: 'pointer' }}
          onClick={props.onClose}
          className="button"
        >
          X
        </button>
      </div>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h4 className="modal-title">{props.show.project.name}</h4>
        <div className="modal-body">{props.show.project.description}</div>
        <div className="project-date">
          <div>
            Created{' '}
            {`${props.show.project.created_at.slice(
              5,
              7
            )}/${props.show.project.created_at.slice(
              8,
              10
            )}/${props.show.project.created_at.slice(0, 4)}`}
          </div>
          <NavLink
            className="modal-links"
            to={`/projects/${props.show.project.id}`}
          >
            Project
          </NavLink>
          <a href={props.show.project.repoLink} className="modal-links">
            <i className="fa fa-github" style={{ fontSize: '30px' }}></i>
            Repo
          </a>
        </div>
      </div>
    </div>
  );
};

export default Modal;
