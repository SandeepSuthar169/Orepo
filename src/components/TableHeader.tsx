import { useRepoStore, type SortKey } from "../store/useRepositoryStore"

const TableHeader = () => {

    const { setSort } = useRepoStore()
    const handleSort = (key: SortKey) => setSort(key);

  return (
    <thead className="bg-amber-50">
        <tr>
            <th
            >Owner</th>
            <th
                className="cursor-pointer text-center p-3.5"
                >
                Repo Name
            </th>
            <th
                className="cursor-pointer text-center p-3.5"
                >
                Repository
            </th>
            <th
                className="cursor-pointer text-center p-3.5"
                >
                Description 
            </th>
            <th
                className="cursor-pointer text-center p-3.5"
                >
                Language 
            </th>
            <th
                className="cursor-pointer text-center p-3.5"
                onClick={() => handleSort("stargazers_count")}
            >
                Stars ↕
            </th>
            <th
                className="cursor-pointer text-center p-3.5"
                onClick={() => handleSort("open_issues_count")}
            >
                Issues ↕
            </th>
            <th
                className="cursor-pointer text-center p-3.5"
                onClick={() => handleSort("forks_count")}
            >
                Forks ↕
            </th>  
            <th
                className="cursor-pointer text-center p-3.5"
                >
                Topics 
            </th>  
            <th
                className="cursor-pointer text-center p-3.5"
                >
                License 
            </th>  
        </tr>
    </thead >
  )
}

export default TableHeader