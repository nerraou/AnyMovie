import { ReactNode } from "react";
import NavBar from "../atoms/Navbar";

interface LayoutProps {
  children: ReactNode | ReactNode[];
  className?: string;
  contentClassName?: string;
}

export default function Layout(props: LayoutProps) {
  return (
    <main className={props.className}>
      <NavBar />

      <section className={props.contentClassName}>{props.children}</section>
    </main>
  );
}
