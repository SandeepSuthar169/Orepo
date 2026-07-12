import { useRepoStore } from "@/store/useRepositoryStore"


const useSearchBar: React.FC = () => {

  const {searchTerm, setSearchTerm}  = useRepoStore()

  return (
    <div>
      <div>
        <input 
          type="text" 
          value={searchTerm}
          placeholder="Search repositories..."
          className=""
          onChange={(e) => setSearchTerm(e.target.value)}  
        />
      </div>
    </div>
  )
}

export default useSearchBar