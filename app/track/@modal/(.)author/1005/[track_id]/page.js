"use client";
import { useRouter } from "next/navigation";

export default function TrackModal({ params: { track_id } }) {
  const router = useRouter();

  function onDismiss() {
    router.back();
  }

  return (
    <div className="modal-backdrop" onClick={onDismiss}>
      <dialog className="modal" onClose={onDismiss}>
        {track_id}
        <button onClick={onDismiss} className="close-button" />
      </dialog>
    </div>
  );
}
