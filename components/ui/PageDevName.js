export default function PageDevName({ children, className }) {
  return <p className={"page_title " + (className || "")}>{children}</p>;
}
