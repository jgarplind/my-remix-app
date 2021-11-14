import { Link, Outlet, useLoaderData } from "remix";
import type { LoaderFunction } from "remix";
import type { LinksFunction } from "remix";
import styles from "../styles/team.css";

export let links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};

interface Member {
  id: string;
  login: string;
}

export let loader: LoaderFunction = () => {
  // you can point to whatever org you want, ofc
  return fetch("https://api.github.com/orgs/reacttraining/members");
};

export function meta() {
  return {
    title: "Team page",
  };
}

export default function Team() {
  let data = useLoaderData<Member[]>();

  return (
    <div>
      <h2>Team</h2>
      <ul>
        {data.map((member) => (
          <li key={member.id}>
            <Link to={member.login}>{member.login}</Link>
          </li>
        ))}
      </ul>
      <hr />
      <Outlet />
    </div>
  );
}
