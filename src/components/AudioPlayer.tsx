import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const convertSecondsToTime = (seconds) =>
  new Date(seconds * 1000).toISOString().substring(14, 19);

const AudioControls = ({ isPlaying, onPlayPauseClick }) => (
  <div className="h-12 w-12 flex justify-center items-center bg-blue-100">
    {isPlaying ? (
      <button
        type="button"
        onClick={() => onPlayPauseClick(false)}
        aria-label="Pause"
        className="text-neon flex justify-center items-center"
      >
        <Image src="/icons/pause.svg" height="16" width="16" />
      </button>
    ) : (
      <button
        type="button"
        onClick={() => onPlayPauseClick(true)}
        aria-label="Play"
        className="text-neon flex justify-center items-center"
      >
        <Image src="/icons/play.svg" height="16" width="16" />
      </button>
    )}
  </div>
);

const AudioPlayer = ({ track }) => {
  const [trackProgress, setTrackProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | undefined>(
    typeof Audio !== 'undefined' ? new Audio(track) : undefined
  );
  const intervalRef: { current: NodeJS.Timeout | null } = useRef();
  const isReady = useRef(false);
  const duration = audioRef.current?.duration;
  const currentProgress = duration
    ? `${convertSecondsToTime(trackProgress)} / ${convertSecondsToTime(
        duration
      )}`
    : '00:00 / 00:00';

  const startTimer = () => {
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setTrackProgress(audioRef.current.currentTime);
    }, 1000);
  };

  const onScrub = (value) => {
    clearInterval(intervalRef.current);
    audioRef.current.currentTime = value;
    setTrackProgress(audioRef.current.currentTime);
  };

  const onScrubEnd = () => {
    // If not already playing, start
    if (!isPlaying) {
      setIsPlaying(true);
    }
    startTimer();
  };

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
      startTimer();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  // Handles cleanup and setup when changing tracks
  useEffect(() => {
    audioRef.current?.pause();

    audioRef.current = new Audio(track);
    setTrackProgress(audioRef.current?.currentTime);

    if (isReady.current) {
      audioRef.current?.play();
      setIsPlaying(true);
      startTimer();
    } else {
      // Set the isReady ref as true for the next pass
      isReady.current = true;
    }
  }, []);

  useEffect(
    () =>
      // Pause and clean up on unmount
      () => {
        audioRef.current.pause();
        clearInterval(intervalRef.current);
      },
    []
  );

  return (
    <div className="pb-12">
      <div className="font-inter text-neon-light pb-4">
        Listen to this module
      </div>
      <div className="flex flex-row items-center max-w-max bg-blue pr-8">
        <AudioControls isPlaying={isPlaying} onPlayPauseClick={setIsPlaying} />
        <div className="w-24 px-2 text-center">
          <span className="font-inter text-xs text-neon-light">
            {currentProgress}
          </span>
        </div>
        <input
          type="range"
          value={trackProgress}
          step="1"
          min="0"
          max={duration || `${duration}`}
          className="audio-slider"
          onChange={(e) => onScrub(e.target.value)}
          onMouseUp={onScrubEnd}
          onKeyUp={onScrubEnd}
        />
      </div>
    </div>
  );
};

export default AudioPlayer;
