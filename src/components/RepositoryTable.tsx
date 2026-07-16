import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useRepoStore } from '../store/useRepositoryStore';
import ErrorRateLimit from './ErrorRateLimit';
import LoadingRepositories from './Loading';
import { Search, X } from 'lucide-react';

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
  Haskell: 'border border-lime-300 bg-lime-50 px-2 py-1 text-lime-700',
  Elixir: 'border border-mauve-300 bg-mauve-100 px-2 py-1 text-mauve-700',
  HTML: 'border border-olive-300 bg-olive-100 px-2 py-1 text-olive-700',
  Shell: 'border border-amber-300 bg-amber-50 px-2 py-1 text-amber-700',
  Svelte: 'border border-cyan-300 bg-cyan-50 px-2 py-1 text-cyan-700',
  Pascal: 'border border-fuchsia-700 bg-fuchsia-50 px-2 py-1 text-fuchsia-700',
  Clojure: 'border border-[#d2b48c] bg-[#f7f0e7] px-2 py-1 text-[#d2b48c]',
  "C++": 'border border-[#d2b48c] bg-[#f7f0e7] px-2 py-1 text-[#d2b48c]',
  "C#": 'border border-[#d2b48c] bg-[#f7f0e7] px-2 py-1 text-[#d2b48c]',
  Scala: 'border border-[#d2b48c] bg-[#f7f0e7] px-2 py-1 text-[#d2b48c]',
  "Jupyter Notebook": 'border border-cyan-300 bg-cyan-50 px-2 py-1 text-cyan-700',
  Vue: 'border border-emerald-300 bg-emerald-50 px-2 py-1 text-emerald-700',
  Dart: 'border border-fuchsia-300 bg-fuchsia-50 px-2 py-1 text-fuchsia-700',
  Astro: 'border border-green-300 bg-green-50 px-2 py-1 text-green-700',
  MDX: 'border border-indigo-300 bg-indigo-50 px-2 py-1 text-indigo-700',
  Kotlin: 'border border-lime-300 bg-lime-50 px-2 py-1 text-lime-700',
  Swift: 'border border-mauve-300 bg-mauve-50 px-2 py-1 text-mauve-700',
  "Objective-C": 'border border-olive-300 bg-olive-50 px-2 py-1 text-olive-700',
  "Assembly": 'border border-orange-300 bg-orange-50 px-2 py-1 text-orange-700',
  "CSS": 'border border-fuchsia-300 bg-fuchsia-50 px-2 py-1 text-fuchsia-700',
};

const fallbackStyles = 'bg-gray-100 px-2 py-1 text-gray-700 border border-gray-400 border-transparent';
const baseStyles = 'inline-flex items-center rounded-md text-xs font-medium whitespace-nowrap';

const formatStatExact = (num: number) => {
  if (num > 1000) {
    return (Math.trunc(num / 100) / 10).toFixed(1) + 'K';
  }
  return num.toString();
};


const RepositoryTable: React.FC = () => {
  const { repositories, loading, error, fetchRepositories, topic } = useRepoStore();

  const [inputValue, setInputValue] = useState<string>('');

  const [activeSearch, setActiveSearch] = useState<string>('');

  useEffect(() => {
    fetchRepositories();
  }, [topic, fetchRepositories]);

  const filteredRepo = useMemo(() => {
    if (!activeSearch) return repositories;

    return repositories.filter((repo) =>
      repo.full_name.toLowerCase().includes(activeSearch.toLowerCase()) ||
      repo.topics.some((t) => t.toLowerCase().includes(activeSearch.toLowerCase()))
    );
  }, [repositories, activeSearch]);

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim() !== '') {
      setActiveSearch(inputValue.trim());
      setInputValue('');
    }
  };

  const clearActiveFilter = () => {
    setActiveSearch('');
  };

  if (loading)
    return (
      <>
        <LoadingRepositories />;
      </>
    )
  if (error)
    return (
      <>
        <ErrorRateLimit />;
      </>
    )

  return (
    <>
      <div className="flex-1 mt-11 w-full h-9.8/10 pb-2.5 min-h-125 rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden flex flex-col">

        <div className="px-3 pt-4">
          <form onSubmit={handleSearchSubmit} className="relative group inline-block w-8/10 sm:w-100">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 transition-colors duration-300 group-focus-within:text-gray-600" />

            <input
              type="text"
              placeholder="Search by Repository or topic...."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              aria-label="Search repositories"
              className="w-full py-2 pl-10 pr-2 text-sm text-gray-700 bg-gray-50/50 border border-gray-200 rounded-lg outline-none transition-all duration-300 focus:bg-white focus:border-gray-300 focus:ring-4 focus:ring-gray-50 placeholder:text-gray-400"
            />

            <button
              type="submit"
              className="absolute right-1 top-2/20 translate-y-1/10 px-3 py-1 bg-gray-900 text-white text-xs font-medium rounded-md hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Search
            </button>
          </form>

          {activeSearch && (
            <div className="mt-3 flex items-center gap-2">
              <span className="text-sm text-gray-500">Filtered by:</span>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-50 border border-blue-200 text-blue-700 text-xs font-medium">
                "{activeSearch}"
                <button
                  onClick={clearActiveFilter}
                  className="hover:bg-blue-200 p-0.5 rounded-full transition-colors"
                  aria-label="Clear filter"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="overflow-x-auto mt-4 border-t border-gray-200 flex-1">
          <table className="w-full min-w-200 text-[14px] text-gray-900 text-left">
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

            <tbody className="divide-y text-[11px] divide-gray-100">
              {filteredRepo.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-4 py-20 text-center bg-gray-50/30">
                    <div className="flex flex-col items-center justify-center">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 text-gray-400 border border-gray-200 mb-4 shadow-sm">
                        <Search className="w-5 h-5 stroke-[1.5]" />
                      </div>

                      <h3 className="text-[14px] font-medium text-gray-900 mb-1">
                        No repositories found
                      </h3>
                      <p className="text-[13px] text-gray-500 max-w-sm mx-auto">
                        We couldn't find anything matching <span className="font-medium text-gray-700">"{activeSearch}"</span>. Try adjusting your search term or browsing a different topic.
                      </p>

                      <button
                        onClick={clearActiveFilter}
                        className="mt-4 px-4 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:text-gray-900 transition-colors shadow-sm"
                      >
                        Clear search
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredRepo.map((repo, index) => (
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
                    <td className="sticky left-20 z-10 bg-white max-w-62.5 group-hover:bg-gray-50 px-4 py-3 align-top border-r border-gray-200 transition-colors">
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noreferrer"
                        className="font-medium text-gray-900 hover:text-blue-600 hover:underline transition-colors wrap-break-word"
                      >
                        {repo.full_name}
                      </a>
                      {repo.homepage && (
                        <div className="mt-1 text-xs">
                          <a
                            href={repo.homepage}
                            target="_blank"
                            rel="noreferrer"
                            className="text-gray-400 transition-colors hover:text-blue-600"
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
                    <td className="px-4 py-3 align-top font-medium text-gray-600">
                      {formatStatExact(repo.stargazers_count)}
                    </td>
                    <td className="px-4 py-3 align-top text-gray-600">
                      {formatStatExact(repo.forks_count)}
                    </td>
                    <td className="px-4 py-3 align-top text-gray-600">
                      {formatStatExact(repo.open_issues_count)}
                    </td>
                    <td className="px-4 py-3 align-top">
                      <span
                        className={`${baseStyles} ${repo.language && languageStyles[repo.language]
                            ? languageStyles[repo.language]
                            : fallbackStyles
                          }`}
                      >
                        {repo.language || 'N/A'}
                      </span>
                    </td>
                    <td className="px-3 py-2 flex items-center justify-between align-top max-w-62.5">
                      <div className="flex flex-wrap gap-1">
                        {repo.topics.slice(0, 3).map((topic) => (
                          <span
                            key={topic}
                            className="inline-flex items-center rounded-md border border-gray-200 bg-gray-50 px-2 py-1 text-xs font-medium text-gray-700"
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
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default RepositoryTable;