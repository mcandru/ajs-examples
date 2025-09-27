/**
 * Performs a regular fetch and waits for the full JSON body.
 *
 * This async function demonstrates the common pattern where you make
 * a request, optionally inspect headers (the fetch promise resolves
 * when response headers are available), then await `response.json()`
 * to parse the entire body as JSON before using it.
 *
 * This is useful when you need the complete parsed payload before
 * continuing. In contrast, `fetchStream` processes the
 * body incrementally as chunks arrive.
 */
const fetchJson = async () => {
  console.log("Making Fetch Request");

  const response = await fetch("https://hn.algolia.com/api/v1/search_by_date");

  console.log("Response headers received, now waiting for response body...");
  const data = await response.json();
  console.log(data);
};

/**
 * Demonstrates reading the response body as a stream.
 *
 * This async function performs a fetch to the provided URL and then
 * iterates over the ReadableStream from `res.body` using `for await`.
 * Each chunk is decoded from UTF-8 using a TextDecoder and logged.
 *
 * This reads the raw response bytes as they arrive and is useful
 * when you want to process or display partial data progressively.
 */
const fetchStream = async () => {
  const response = await fetch("https://hn.algolia.com/api/v1/search_by_date");
  const decoder = new TextDecoder("utf-8");
  for await (const value of response.body) {
    const chunk = decoder.decode(value);
    console.log(`Chunk: ${chunk}`);
  }
};

// Uncomment the following line to try streaming the response body in chunks:
fetchStream();

// By default we call fetchJson which waits for the full JSON payload.
// fetchJson();
