import React from 'react';

const SongList = ({ songs, onSongClick, onAddToPlaylist }) => {
  return (
    <div className="song-list">
      {songs.map((song) => (
        <div key={song.id} className="song-item">
          <img src={song.image} alt={song.title} />
          <div>
            <h4>{song.title}</h4>
            <p>{song.artist}</p>
            <button onClick={() => onSongClick(song)}>Play</button>
            <button onClick={() => onAddToPlaylist(song)}>Add to Playlist</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SongList;
