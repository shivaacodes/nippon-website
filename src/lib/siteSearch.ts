export type SearchResult = {
  href: string;
  title: string;
  type: 'model' | 'service' | 'offer' | 'page';
  description: string;
  keywords: string[];
};

export function searchDocuments(documents: SearchResult[], query: string) {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return documents.slice(0, 8);

  return documents
    .map((document) => {
      const title = document.title.toLowerCase();
      const keywords = document.keywords.join(' ').toLowerCase();
      const description = document.description.toLowerCase();
      const exactTitle = title === normalizedQuery;
      const titleMatch = title.includes(normalizedQuery);
      const keywordMatch = keywords.includes(normalizedQuery);
      const descriptionMatch = description.includes(normalizedQuery);

      return {
        document,
        score: exactTitle ? 4 : titleMatch ? 3 : keywordMatch ? 2 : descriptionMatch ? 1 : 0,
      };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || a.document.title.localeCompare(b.document.title))
    .map(({ document }) => document)
    .slice(0, 12);
}

