'use client';
import React, { useEffect, useState, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { RotateCw } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
const GITHUB_USERNAME = 'nishuR31';
const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USERNAME}`;

interface UserType {
  username?: string;
  name?: string;
  url?: string;
  htmlUrl?: string;
  company?: string;
  profileUrl?: string;
  avatarUrl?: string;
  bio?: string;
  publicRepos?: number;
  publicGists?: number;
  location?: string;
  followers?: number;
  following?: number;
  blog?: string;
  twitter?: string;
  email?: string;
  createdAt?: any;
}

const Loader = () => (
  <div className="flex flex-col items-center justify-center min-h-screen p-8 text-white bg-gray-950">
    <svg
      className="w-10 h-10 mb-4 animate-spin text-violet-500"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
    </svg>
    <span className="text-lg">Loading GitHub profile...</span>
  </div>
);

function GithubProfile() {
  const [showProfile, setShowProfile] = useState(false);
  const [githubUser, setGithubUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  //

  // Reload handler
  const handleReload = () => {
    setLoading(true);
    setError(null);
    fetch(GITHUB_API_URL)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch GitHub user');
        return res.json();
      })
      .then((data) => {
        const user: UserType = {
          username: data.login,
          name: data.name,
          url: data.url,
          htmlUrl: data.html_url,
          company: data.company,
          profileUrl: data.html_url,
          avatarUrl: data.avatar_url,
          bio: data.bio,
          publicRepos: data.public_repos,
          publicGists: data.public_gists,
          location: data.location,
          followers: data.followers,
          following: data.following,
          blog: data.blog,
          twitter: data.twitter_username,
          email: data.email,
          createdAt: data.created_at,
        };
        setGithubUser(user);
        localStorage.setItem('githubUser', JSON.stringify(user));
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    const cached = localStorage.getItem('githubUser');
    if (cached) {
      setGithubUser(JSON.parse(cached));
      setLoading(false);
    } else {
      fetch(GITHUB_API_URL)
        .then((res) => {
          if (!res.ok) throw new Error('Failed to fetch GitHub user');
          return res.json();
        })
        .then((data) => {
          const user: UserType = {
            username: data?.login,
            name: data?.name,
            url: data?.url,
            htmlUrl: data?.html_url,
            company: data?.company,
            profileUrl: data?.html_url,
            avatarUrl: data?.avatar_url,
            bio: data?.bio,
            publicRepos: data?.public_repos,
            publicGists: data.public_gists,
            location: data?.location,
            followers: data?.followers,
            following: data?.following,
            blog: data?.blog,
            twitter: data?.twitter_username,
            email: data?.email,
            createdAt: data?.created_at,
          };
          setGithubUser(user);
          localStorage.setItem('githubUser', JSON.stringify(user));
        })
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    }
  }, []);

  if (loading) return <Loader />;
  if (error || !githubUser) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8 text-white bg-gray-950">
        <span className="text-lg text-red-400">Failed to load GitHub profile.</span>
      </div>
    );
  }

  return (
    <main className="relative bg-[#0B0F19] min-h-screen">
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen p-8 text-white bg-gray-950">
        <h1 className="pt-10 mb-4 text-3xl font-bold">GitHub Profile</h1>
        <img
          src={githubUser.avatarUrl}
          alt="Profile"
          className="w-32 h-32 mb-4 border-4 rounded-full shadow-lg border-violet-500"
        />
        <div className="text-xl font-semibold">{githubUser.name}</div>
        <div className="text-gray-400">@{githubUser.username}</div>
        <div className="mt-2 text-sm text-gray-400">{githubUser.bio}</div>
        <div className="mt-2 text-sm text-gray-400">{githubUser.location}</div>
        <div className="mt-2 text-sm text-gray-400">
          {githubUser.company && <>🏢 {githubUser.company}</>}
        </div>
        <div className="mt-2 text-sm text-gray-400">
          {githubUser.blog && (
            <a
              href={githubUser.blog}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-violet-400"
            >
              {githubUser.blog}
            </a>
          )}
        </div>
        <div className="mt-2 text-sm text-gray-400">
          {githubUser.twitter && (
            <a
              href={`https://twitter.com/${githubUser.twitter}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-violet-400"
            >
              @{githubUser.twitter}
            </a>
          )}
        </div>
        <div className="mt-2 text-sm text-gray-400">
          {githubUser.email && (
            <a href={`mailto:${githubUser.email}`} className="underline hover:text-violet-400">
              {githubUser.email}
            </a>
          )}
        </div>
        <div className="flex gap-6 mt-4 mb-2 text-sm">
          <span>Followers: {githubUser.followers}</span>
          <span>Following: {githubUser.following}</span>
          <span>Repos: {githubUser.publicRepos}</span>
        </div>
        <div className="mt-2 text-xs text-gray-400">
          Joined: {(githubUser?.createdAt && new Date(githubUser.createdAt).toLocaleString()) || 9}
        </div>
        <button
          className="px-6 py-2 mt-6 text-lg font-medium transition rounded-lg bg-violet-600 hover:bg-violet-700"
          onClick={() => setShowProfile(true)}
        >
          Profile Card
        </button>
        <button
          className="flex flex-row flex-wrap justify-center px-6 py-2 mt-6 text-lg font-medium transition rounded-lg group bg-violet-600 hover:bg-violet-700"
          title="refresh"
          onClick={handleReload}
        >
          <span>Reload</span>
          <span className="flex items-center">
            <RotateCw className="w-5 h-5 pl-1 transition-transform duration-300 group-hover:animate-spin" />
          </span>
        </button>

        {showProfile && (
          <div className="w-full max-w-md p-6 mt-8 bg-gray-900 border shadow-xl rounded-xl border-violet-700">
            <div className="flex items-center gap-4 mb-4">
              <img src={githubUser.avatarUrl} alt="Profile" className="w-16 h-16 rounded-full" />
              <div>
                <div className="text-lg font-bold">{githubUser.name}</div>
                <div className="text-gray-400">@{githubUser.username}</div>
              </div>
            </div>
            <div className="mb-2">{githubUser.bio}</div>
            <div className="mb-2 text-sm text-gray-400">{githubUser.location}</div>
            <div className="flex gap-6 mb-2 text-sm">
              <span>Followers: {githubUser.followers}</span>
              <span>Following: {githubUser.following}</span>
              <span>Repos: {githubUser.publicRepos}</span>
            </div>
            <a
              href={githubUser.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 mt-4 font-semibold text-white transition rounded bg-violet-700 hover:bg-violet-800"
            >
              Open on GitHub ↗
            </a>
            <br />
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}

const DynamicGithubProfile = dynamic(() => Promise.resolve(GithubProfile), {
  ssr: false,
  loading: Loader,
});

export default function GithubPage() {
  return (
    <Suspense fallback={<Loader />}>
      <DynamicGithubProfile />
    </Suspense>
  );
}
