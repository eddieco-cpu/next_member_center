"use client"
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import PopupFrame from "@components/ui/PopupFrame";


export default function ClientContainer({track_id, tracklist}) {
  //
	const router = useRouter();

	useEffect(() => {
		console.log("track_id: ", track_id);
		console.log("tracklist: ", tracklist);
	}
	, []);

	const onTogglePrev = () => {
		const prevTrackIndex = (tracklist.findIndex(el => el.track_id == track_id) - 1 + tracklist.length) % tracklist.length;
		const prevTrack = tracklist[prevTrackIndex];
		router.replace(`/track/author/1005/${prevTrack.track_id}`);
	};
	const onToggleNext = () => {
		const nextTrackIndex = (tracklist.findIndex(el => el.track_id == track_id) + 1) % tracklist.length;
		const nextTrack = tracklist[nextTrackIndex];
		router.replace(`/track/author/1005/${nextTrack.track_id}`)
	};

  return (
    <>
      <PopupFrame {...{onTogglePrev, onToggleNext, targetPath: "/track"}}>
        <h1>track_id: {track_id}</h1>
      </PopupFrame>
    </>
  )
}
