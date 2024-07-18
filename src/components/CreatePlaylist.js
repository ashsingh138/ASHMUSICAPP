import React from 'react';

const CreatePlaylist = ({ newPlaylistName, setNewPlaylistName, createPlaylist }) => {
  const handleChange = (event) => {
    setNewPlaylistName(event.target.value);
  };

  return (
    <div className="create-playlist">
      <input
        type="text"
        placeholder="Enter playlist name"
        value={newPlaylistName}
        onChange={handleChange}
      />
      <button onClick={createPlaylist}>Create Playlist</button>
    </div>
  );
};

export default CreatePlaylist;
