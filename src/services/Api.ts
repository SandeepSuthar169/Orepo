import { type SortConfig, type SortDirection } from '../types/Types';



export async function fetchRepositories(
  query: string,
  page: number,
  sort: SortConfig,
  order: SortDirection
) {
  const response = await fetch(
    `https://api.github.com/search/repositories?q=${encodeURIComponent(query)}
    &page=${page}
    &per_page=15
    &sort=${sort}
    &order=${order}`
  );

  const data = await response.json();

  return {
    items: data.items,
    totalCount: data.total_count,
  };
}

//"https://api.github.com/search/repositories?q=topic:typescript&sort=stars&order=desc&per_page=100&page=2"
