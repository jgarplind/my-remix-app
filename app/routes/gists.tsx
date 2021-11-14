import { json, useLoaderData } from "remix";
import type { LoaderFunction } from "remix";

interface Gist {}

export let loader: LoaderFunction = async () => {
  let res = await fetch("https://api.github.com/gists");
  let gists = await res.json();
  return json(gists, {
    headers: {
      "Cache-Control": "max-age=300",
    },
  });
};

// The title and meta tags for the document's <head>
export function meta({ data }: { data: Gist[] }) {
  return {
    title: "Public Gists",
    description: `View the latest ${data.length} public gists`,
  };
}

// The HTTP headers for the server rendered request, just
// use the cache control from the loader.
export function headers({ loaderHeaders }: { loaderHeaders: any }) {
  return {
    "Cache-Control": loaderHeaders.get("Cache-Control"),
  };
}

export default function Gists() {
  let data = useLoaderData();
  return (
    <div>
      <h2>Public Gists</h2>
      <ul>
        {data.map((gist: any) => (
          <li key={gist.id}>
            <a href={gist.html_url}>{Object.keys(gist.files)[0]}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
