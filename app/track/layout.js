export default function TrackLayout(props) {
  console.log("props \n", props);
  return (
    <>
      {props.try}
      {props.children}
      {props.modal}
    </>
  );
}
