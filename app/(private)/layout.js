import { Fragment } from "react";

export default function PrivateLayout({ children }) {
  return (
    <Fragment>
      <header>Admin header</header>
      <main>{children}</main>
      <footer>Admin footer</footer>
    </Fragment>
  );
}
