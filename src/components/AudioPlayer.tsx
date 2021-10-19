import React, { useState, useEffect, useRef } from 'react';

const AudioControls = ({ isPlaying, onPlayPauseClick }) => (
  <div className="audio-controls">
    {isPlaying ? (
      <button
        type="button"
        onClick={() => onPlayPauseClick(false)}
        aria-label="Pause"
        className="text-neon"
      >
        PAUSE
      </button>
    ) : (
      <button
        type="button"
        onClick={() => onPlayPauseClick(true)}
        aria-label="Play"
        className="text-neon"
      >
        PLAY
      </button>
    )}
  </div>
);

const AudioPlayer = ({ tracks }) => {
  const [trackProgress, setTrackProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const { audioSrc } = tracks;

  // Refs
  const audioRef = useRef<HTMLAudioElement | undefined>(
    typeof Audio !== 'undefined' ? new Audio(audioSrc) : undefined
  );
  const intervalRef: { current: NodeJS.Timeout | null } = useRef();
  const isReady = useRef(false);

  const duration = audioRef.current?.duration;

  const currentPercentage = duration
    ? `${(trackProgress / duration) * 100}%`
    : '0%';
  const trackStyling = `
    -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #fff), color-stop(${currentPercentage}, #777))
  `;

  const startTimer = () => {
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setTrackProgress(audioRef.current.currentTime);
    }, 1000);
  };

  const onScrub = (value) => {
    // Clear any timers already running
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
    console.log(audioRef);
    audioRef.current?.pause();

    audioRef.current = new Audio(audioSrc);
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
    <div className="audio-player">
      <div className="track-info">
        <AudioControls isPlaying={isPlaying} onPlayPauseClick={setIsPlaying} />
        <input
          type="range"
          value={trackProgress}
          step="1"
          min="0"
          max={duration || `${duration}`}
          className="progress"
          onChange={(e) => onScrub(e.target.value)}
          onMouseUp={onScrubEnd}
          onKeyUp={onScrubEnd}
          style={{ background: trackStyling }}
        />
      </div>
    </div>
  );
};

export default AudioPlayer;
