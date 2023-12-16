import classes from "./layout.module.scss";

export function PageDevName({ children, className }) {
  return <p className={"page_title " + (className || "")}>{children}</p>;
}

export const Container = ({ children, className }) => {
  return (
    <section className={classes.container +
    ` ${className.split(" ").includes("small") && classes.small}` +
    ` ${(className || "")}`}>{children}</section>
  )
};


export const PageTitle = ({ children, className }) => (
  <h1 className={classes.page_title + ` ${(className || "")}`}>{children}</h1>
);
