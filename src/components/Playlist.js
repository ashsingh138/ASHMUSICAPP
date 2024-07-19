// Playlist.js
import React from 'react';

const Playlist = ({
  playlists,
  currentPlaylist,
  onAddToPlaylist,
  onRemoveFromPlaylist,
  onCreatePlaylist,
  onEditPlaylist,
  onDeletePlaylist,
  onSelectPlaylist,
  currentSong,
  isPlaying,
  onPlayPause,
  onSongClick
}) => {
  const [newPlaylistName, setNewPlaylistName] = React.useState('');

  const handleCreatePlaylist = () => {
    if (newPlaylistName.trim() !== '') {
      onCreatePlaylist(newPlaylistName);
      setNewPlaylistName('');
    }
  };

  const handleDeleteClick = (name) => {
    onDeletePlaylist(name);
  };

  return (
    <div className="playlist-container">
      <div className="playlist-header">
        <input
          type="text"
          placeholder="New Playlist Name"
          value={newPlaylistName}
          onChange={(e) => setNewPlaylistName(e.target.value)}
        />
        <button onClick={handleCreatePlaylist}>Create Playlist</button>
      </div>
      <div className="playlist-list">
        {playlists.map((playlist) => (
          <div
            key={playlist.name}
            className={`playlist-item ${playlist.name === currentPlaylist ? 'selected' : ''}`}
            onClick={() => onSelectPlaylist(playlist.name)}
          >
            {playlist.name}
            <button onClick={() => handleDeleteClick(playlist.name)}>Delete</button>
          </div>
        ))}
      </div>
      {currentPlaylist && (
        <div className="playlist-details">
          <h3>{currentPlaylist}</h3>
          <ul>
            {playlists
              .find((p) => p.name === currentPlaylist)
              ?.songs.map((song) => (
                <li key={song.id}>
                  <span>{song.title} - {song.artist}</span>
                  <button onClick={() => onRemoveFromPlaylist(song)}>Remove</button>
                  <button onClick={() => onSongClick(song)}>
                    {currentSong && currentSong.id === song.id && isPlaying ? 'Pause' : 'Play'}
                  </button>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Playlist;
