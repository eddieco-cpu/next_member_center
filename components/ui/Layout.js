import classes from "./layout.module.scss";

export function PageDevName({ children, className, ...keys }) {
  return (
    <p className={"page_title " + (className || "")} {...keys}>
      {children}
    </p>
  );
}

export const Container = ({ children, className, ...keys }) => {
  return (
    <section
      className={
        classes.container +
        ` ${className.split(" ").includes("small") && classes.small}` +
        ` ${className || ""}`
      }
      {...keys}
    >
      {children}
    </section>
  );
};

export const PageTitle = ({ children, className, ...keys }) => (
  <h1 className={classes.page_title + ` ${className || ""}`} {...keys}>
    {children}
  </h1>
);

export const CheckboxInput = ({ children, className, ...keys }) => (
  <div className={classes.checkbox_input + ` ${className || ""}`} {...keys}>
    {children}
  </div>
);

export const TextInput = ({ children, className, ...keys }) => (
  <div className={classes.text_input + ` ${className || ""}`} {...keys}>
    {children}
  </div>
);

export const Btn = ({ children, className, ...keys }) => (
  <button className={classes.btn + ` ${className || ""}`} {...keys}>
    {children}
  </button>
);

export const ThemeTitle = ({ children, className, ...keys }) => {
  return (
    <div
      className={classes["title__wrapper--shared"] + ` ${className || ""}`}
      {...keys}
    >
      <h3 className={classes["container__title--shared"]}>{children}</h3>
    </div>
  );
};
