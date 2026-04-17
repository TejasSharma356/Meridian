
export interface TavilySearchResult {
  title: string;
  url: string;
  content: string;
  score: number;
}

export interface TavilyResponse {
  results: TavilySearchResult[];
}

export async function tavilySearch(query: string): Promise<string> {
  const apiKey = process.env.TAVILY_API_KEY;
  if (!apiKey) {
    console.error("TAVILY_API_KEY is missing");
    return "";
  }

  try {
    const response = await fetch('https://api.tavily.com/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_key: apiKey,
        query: query,
        search_depth: "basic",
        include_images: false,
        include_answer: false,
        max_results: 5
      })
    });

    const data: TavilyResponse = await response.json();
    
    // Flatten search results into a single context string to save tokens in prompt
    return data.results
      .map(r => `Source: ${r.title}\nContent: ${r.content}`)
      .join('\n\n');
  } catch (error) {
    console.error("Tavily search failed:", error);
    return "";
  }
}
