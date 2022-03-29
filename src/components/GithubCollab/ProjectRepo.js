import React, { useState } from 'react';
import supabase from '../../client';
import { Octokit } from '@octokit/core';
import { useDispatch } from 'react-redux';
import { updateRepo } from '../../store/project';

function ProjectRepo(props) {
  const user = supabase.auth.user();
  const userSession = supabase.auth.session();
  const octokit = new Octokit({
    auth: userSession.provider_token,
  });
  const [repoName, setRepoName] = useState('');
  const dispatch = useDispatch();
  console.log(props);
  console.log(user);

  const verifyRepo = async (evt) => {
    try {
      let repository = repoName.split('/');
      let newreponame = repository[repository.length - 1];
      await octokit.request(`GET /repos/{owner}/{repo}`, {
        owner: userSession.user.user_metadata.user_name,
        repo: newreponame,
      });
      dispatch(updateRepo(newreponame));
      await supabase
        .from('projects')
        .update({ repoLink: evt.target.value })
        .eq('id', props.project.id);
    } catch (err) {
      alert('You can not provide a repository you are not the owner of.');
    }
  };

  if (props.project.repoLink) {
    return (
      <a
        id="github-link"
        href={props.project.repoLink}
        className="github-button"
        target={'_blank'}
      >
        <i className="fa fa-github"></i>
        <h2 className="github-link">Github</h2>
      </a>
    );
  } else if (
    props.project.id &&
    user.id === props.project.projectUser[0].user.id
  ) {
    return (
      <div
        id="no-repo"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <button
          className="create-repo-button"
          style={{ fontSize: '17px', width: 'fit-content' }}
          onClick={(e) => props.setShowRepoCreation(true)}
        >
          Create Repo
        </button>
        <div>
          <input
            name="name"
            type="text"
            className="repo-form-input"
            required
            maxLength={100}
            onChange={(e) => setRepoName(e.target.value)}
          ></input>
          <button className="create-repo-button" onClick={(e) => verifyRepo(e)}>
            Add Repo
          </button>
        </div>
      </div>
    );
  } else {
    return <div>This project has no repo yet.</div>;
  }
}

export default ProjectRepo;
