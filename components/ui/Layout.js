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

export const CheckboxInput = ({ children, className}) => (
  <div className={classes.checkbox_input + ` ${(className || "")}`}>
    {children}
  </div>
);

export const TextInput = ({ children, className }) => (
  <div className={classes.text_input + ` ${(className || "")}`}>
    {children}
  </div>
);

export const Btn = ({ children, className }) => (
  <button className={classes.btn + ` ${(className || "")}`}>
    {children}
  </button>
);
