import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRepoStore } from '../store/useRepositoryStore';

const RepositoryTable: React.FC = () => {
  const { repositories, loading, error, fetchRepositories, topic } = useRepoStore();

  useEffect(() => {
    fetchRepositories();
  }, [topic, fetchRepositories]);

  if (loading) {
    return (
      <div className="flex-1 p-8 text-center text-sm text-gray-500 animate-pulse bg-white rounded-lg border border-gray-200 shadow-sm">
        Loading repositories...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 p-8 text-center text-sm font-medium text-red-500 bg-white rounded-lg border border-gray-200 shadow-sm">
        Error: {error}
      </div>
    );
  }



  return (
    <div className="flex-1 mt-11 w-full h-full rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden flex flex-col">

      <div className="overflow-x-auto h-full">

        <table className="w-full min-w-250 lg:min-w-full text-sm text-gray-900 text-left">
          <thead className="sticky top-0 z-10 border-b border-gray-200 bg-gray-50 text-gray-600 shadow-sm">
            <tr>
              <th className="px-4 py-3 font-medium whitespace-nowrap">Owner</th>
              <th className="px-4 py-3 font-medium whitespace-nowrap">Repository</th>
              <th className="px-4 py-3 font-medium">Description</th>
              <th className="px-4 py-3 font-medium whitespace-nowrap">
                <div className="flex items-center gap-1">
                  <span className="text-gray-400">⭐</span> Stars
                </div>
              </th>
              <th className="px-4 py-3 font-medium whitespace-nowrap">Forks</th>
              <th className="px-4 py-3 font-medium whitespace-nowrap">Issues</th>
              <th className="px-4 py-3 font-medium whitespace-nowrap">Language</th>
              <th className="px-4 py-3 font-medium">Topics</th>
              <th className="px-4 py-3 font-medium whitespace-nowrap">Updated</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {repositories.map((repo, index) => (
              <motion.tr
                key={repo.full_name}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03, duration: 0.2, ease: 'easeOut' }}
                className="hover:bg-gray-50/80 transition-colors"
              >
                <td className="px-4 py-3 align-top">
                  <img
                    src={repo.owner.avatar_url}
                    alt={`${repo.owner.login} avatar`}
                    className="h-8 w-8 rounded-full border border-gray-200"
                  />
                </td>

                <td className="px-4 py-3 align-top">
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium text-gray-900 hover:text-mist-800 hover:underline transition-colors wrap-break-word"
                  >
                    {repo.full_name}
                  </a>
                  {repo.homepage && (
                    <div className="mt-1 text-xs">
                      <a
                        href={repo.homepage}
                        target="_blank"
                        rel="noreferrer"
                        className="text-gray-400 transition-colors hover:text-mist-800"
                      >
                        Homepage ↗
                      </a>
                    </div>
                  )}
                </td>
                <td className="px-4 py-3 align-top max-w-62.5">
                  <p className="line-clamp-2 text-gray-500 text-sm">
                    {repo.description || 'No description provided.'}
                  </p>
                </td>
                <td className="px-4 py-3 align-top text-gray-600">
                  {repo.stargazers_count.toLocaleString()}
                </td>
                <td className="px-4 py-3 align-top text-gray-600">
                  {repo.forks_count.toLocaleString()}
                </td>
                <td className="px-4 py-3 align-top text-gray-600">
                  {repo.open_issues_count.toLocaleString()}
                </td>
                <td className="px-4 py-3 align-top">
                  <span 
                    className={`inline-flex items-center rounded-md text-xs font-medium whitespace-nowrap ${
                      repo.language === 'TypeScript'
                        ? 'border border-blue-200 bg-blue-50 px-2 py-1 text-blue-700'
                        : repo.language === 'JavaScript'
                        ? 'border border-yellow-200 bg-yellow-50 px-2 py-1 text-yellow-700'
                        : 'bg-gray-100 px-2.5 py-0.5 border border-gray-200  text-gray-700' 
                    }`}
                  >
                    {repo.language || 'N/A'}
                  </span>
                </td>

                <td className="px-3 py-2 align-top max-w-62.5">
                  <div className="flex flex-wrap gap-1">
                    {repo.topics.slice(0, 3).map((topic) => (
                      <span
                        key={topic}
                        className="inline-flex items-center rounded-md border border-blue-200 bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700"
                      >
                        {topic}
                      </span>
                    ))}
                    {repo.topics.length > 3 && (
                      <span className="mt-0.5 text-xs text-gray-400 font-medium">
                        +{repo.topics.length - 3}
                      </span>
                    )}
                  </div>
                </td>

                <td className="px-4 py-3 align-top text-xs text-gray-500 whitespace-nowrap">
                  {new Date(repo.updated_at).toLocaleDateString()}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RepositoryTable;