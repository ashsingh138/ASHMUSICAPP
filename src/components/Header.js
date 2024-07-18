import React from 'react';

const Header = ({ onShowPlaylist }) => {
  return (
    <header className="header">
      <div className="logo">Ash Music App</div>
      <nav className="nav">
        <a href="#home">Home</a>
        <a href="#playlist" onClick={onShowPlaylist}>Playlists</a>
      </nav>
    </header>
  );
};

export default Header;
