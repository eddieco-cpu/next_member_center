import PopupFrame from "@components/ui/PopupFrame";

export default function TrackModal({ params: { track_id } }) {
  return (
    <PopupFrame>
      <h1>track_id: {track_id}</h1>
    </PopupFrame>
  );
}
