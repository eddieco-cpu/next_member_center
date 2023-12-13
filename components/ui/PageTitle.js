export default function PageTitle({ children, className }) {
  return <p className={"page_title " + className}>{children}</p>;
}
