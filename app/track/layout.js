export default function TrackLayout(props) {
  console.log("@@@ layout @@@");
  console.log("props: ", props.modal);
  return (
    <>
      {props.modal}
      <p>------------</p>
      {props.children}
    </>
  );
}
