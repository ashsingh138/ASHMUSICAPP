import React, { useRef, useEffect } from 'react';

const MusicPlayer = ({ currentSong, isPlaying, onPlayPause, onNext, onPrevious }) => {
  const audioRef = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentSong]);

  return (
    <div className="music-player">
      <h3>{currentSong ? currentSong.title : 'No song selected'}</h3>
      <h4>{currentSong ? currentSong.artist.name : ''}</h4>
      <audio ref={audioRef} src={currentSong ? currentSong.preview : ''} />
      <div className="controls">
        <button onClick={onPrevious}>Previous</button>
        <button onClick={onPlayPause}>{isPlaying ? 'Pause' : 'Play'}</button>
        <button onClick={onNext}>Next</button>
      </div>
    </div>
  );
};

export default MusicPlayer;
