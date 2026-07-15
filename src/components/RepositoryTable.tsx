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
      <div className="flex-1 p-8 text-center text-sm text-gray-500 animate-pulse bg-gray-50/50 rounded-lg border  shadow-sm">
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

  const languageStyles: Record<string, string> = {
    TypeScript: 'border border-blue-200 bg-blue-50 px-2 py-1 text-blue-700',
    JavaScript: 'border border-yellow-500 bg-yellow-50 px-2 py-1 text-yellow-500',
    Ruby: 'border border-red-200 bg-red-50 px-2 py-1 text-red-700',
    Go: 'border border-[#00ADD8] bg-[#effcff] px-2 py-1 text-[#00ADD8]',
    Java: 'border border-[#f89820] bg-[#fdedd7] px-2 py-1 text-[#f89820]',
    Python: 'border border-pink-300 bg-pink-50 px-2 py-1 text-pink-700',
    C: 'border border-gray-300 bg-gray-100 px-2 py-1 text-gray-700',
    Rust: 'border border-orange-300 bg-orange-50 px-2 py-1 text-orange-700',
    PHP: 'border border-emerald-300 bg-emerald-50 px-2 py-1 text-emerald-700',
    Haskell: 'border border-lime-700 bg-lime-50 px-2 py-1 text-lime-700',
    Elixir: 'border border-mauve-700 bg-mauve-100 px-2 py-1 text-mauve-700',
    HTML: 'border border-olive-700 bg-olive-100 px-2 py-1 text-olive-700',
    Shell: 'border border-amber-700 bg-amber-50 px-2 py-1 text-amber-700',
    Svelte: 'border border-cyan-700 bg-cyan-50 px-2 py-1 text-cyan-700',
    Pascal: 'border border-fuchsia-700 bg-fuchsia-50 px-2 py-1 text-fuchsia-700',
    Clojure: 'border border-[#d2b48c] bg-[#f7f0e7] px-2 py-1 text-[#d2b48c]',
  };  

  const fallbackStyles = 'bg-gray-100 px-2 py-1 text-gray-700 border border-gray-400 border-transparent';
  const baseStyles = 'inline-flex items-center rounded-md text-xs font-medium whitespace-nowrap';

  return (
    <div className="flex-1 mt-11 mb-4 w-full h-full rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden flex flex-col">
      <div className="overflow-x-auto  mb-4 h-full">
        <table className="w-full min-w-250 lg:min-w-full text-sm text-gray-900 text-left">
          <thead className="sticky top-0 z-20 border-b border-gray-200 bg-gray-50 text-gray-600 shadow-sm">
            <tr>
              <th className="sticky left-0 top-0 z-30 w-20 min-w-20 bg-gray-50 px-4 py-3 font-medium whitespace-nowrap">
                Owner
              </th>
              <th className="sticky left-20 top-0 z-30 bg-gray-50 px-4 py-3 font-medium whitespace-nowrap border-r border-gray-300">
                Repository
              </th>
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
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.03, duration: 0.2, ease: 'easeOut' }}
                className="group hover:bg-gray-50/80 transition-colors" 
              >
                <td className="sticky left-0 z-10 w-20 min-w-20 bg-white group-hover:bg-gray-50 px-4 py-3 align-top transition-colors">
                  <img
                    src={repo.owner.avatar_url}
                    alt={`${repo.owner.login} avatar`}
                    className="h-8 w-8 rounded-full border border-gray-200"
                  />
                </td>
                <td className="sticky left-20 z-10 bg-white group-hover:bg-gray-50 px-4 py-3 align-top border-r border-gray-200 transition-colors">
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
                    className={`${baseStyles} ${
                      repo.language && languageStyles[repo.language] 
                        ? languageStyles[repo.language] 
                        : fallbackStyles
                    }`}
                  >
                    {repo.language || 'N/A'}
                  </span>
                </td>

                <td className="px-3 py-2 flex align-top max-w-62.5">
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
                      <span className="mt-0.5 text-xs flex text-gray-400 font-medium">
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