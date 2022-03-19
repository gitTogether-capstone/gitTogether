import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import supabase from '../../client';
import './style.css';
import { Octokit } from '@octokit/core';
import gitkey from '../../gitauth';

function UserProfile(props) {
  const [loading, setLoading] = useState(true);
  const userStore = useSelector((state) => state.user);
  const [octokit, setOctokit] = useState(null);
  const [languages, setLanguages] = useState(null);

  useEffect(() => {
    async function fetchUserData() {
      const newOctokit = new Octokit({
        auth: gitkey,
      });
      setOctokit(newOctokit);
    }
    fetchUserData();
  }, []);

  useEffect(() => {
    if (octokit !== null) {
      async function fetchLanguages() {
        let languagequeries = [];
        let page = 1;
        let langquery = await octokit.request(
          `GET /user/repos?per_page=100&page=${page}`
        );
        languagequeries.push(...langquery.data);
        page = page + 1;
        while (langquery.headers.link.includes('next')) {
          langquery = await octokit.request(
            `GET /user/repos?per_page=100&page=${page}`
          );
          languagequeries.push(...langquery.data);
        }
        setLanguages(languagequeries);
      }
      fetchLanguages();
    }
  }, [octokit]);

  console.log(octokit);
  console.log(languages);
  console.log(props);

  return (
    <div id="user-profile">
      <div id="user-img-name">
        <img
          id="profile-img"
          src={userStore.identities[0]['identity_data'].avatar_url}
        />
      </div>
      <div id="user-bio-languages"></div>
      <div id="user-projects"></div>
    </div>
  );
}

export default UserProfile;
