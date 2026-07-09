export function buildSearchResultsPath(location: string): string {
  return `/search-results?location=${encodeURIComponent(location)}`;
}

export function isSearchButtonDisabledClass(className: string | null): boolean {
  return (className ?? '').includes('cursor-not-allowed');
}

