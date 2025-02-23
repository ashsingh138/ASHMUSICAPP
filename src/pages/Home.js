import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import SongList from '../components/SongList';
import MusicPlayer from '../components/MusicPlayer';
import Playlist from '../components/Playlist';
import Footer from '../components/Footer';
import '../styles.css';

const Home = () => {
  const [songs, setSongs] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  const [currentPlaylist, setCurrentPlaylist] = useState(null);
  const [showPlaylist, setShowPlaylist] = useState(false);

  useEffect(() => {
    fetchSongs();
  }, []);

  const fetchSongs = async () => {
    try {
      const response = await axios.get('https://itunes.apple.com/us/rss/topsongs/limit=25/json');
      const fetchedSongs = response.data.feed.entry.map((song, index) => ({
        id: index,
        title: song['im:name'].label,
        artist: song['im:artist'].label,
        preview: song.link[1].attributes.href,
        image: song['im:image'][2].label,
      }));
      setSongs(fetchedSongs);
    } catch (error) {
      console.error('Error fetching songs:', error);
    }
  };

  const handleSearch = async (query) => {
    try {
      const response = await axios.get(`https://itunes.apple.com/search?term=${query}&entity=song`);
      const searchResults = response.data.results.map((song, index) => ({
        id: index,
        title: song.trackName,
        artist: song.artistName,
        preview: song.previewUrl,
        image: song.artworkUrl100,
      }));
      setSearchResults(searchResults);
    } catch (error) {
      console.error('Error searching songs:', error);
    }
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    const currentIndex = songs.indexOf(currentSong);
    const nextIndex = (currentIndex + 1) % songs.length;
    setCurrentSong(songs[nextIndex]);
    setIsPlaying(true);
  };

  const handlePrevious = () => {
    const currentIndex = songs.indexOf(currentSong);
    const previousIndex = (currentIndex - 1 + songs.length) % songs.length;
    setCurrentSong(songs[previousIndex]);
    setIsPlaying(true);
  };

  const handleSongClick = (song) => {
    if (currentSong && currentSong.id === song.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentSong(song);
      setIsPlaying(true);
    }
  };

  const handleAddToPlaylist = (song) => {
    if (currentPlaylist) {
      const playlist = playlists.find(p => p.name === currentPlaylist);
      if (playlist && !playlist.songs.find(s => s.id === song.id)) {
        playlist.songs.push(song);
        setPlaylists([...playlists]);
      }
    }
  };

  const handleRemoveFromPlaylist = (song) => {
    if (currentPlaylist) {
      const playlist = playlists.find(p => p.name === currentPlaylist);
      if (playlist) {
        playlist.songs = playlist.songs.filter(s => s.id !== song.id);
        setPlaylists([...playlists]);
      }
    }
  };

  const handleCreatePlaylist = (name) => {
    if (!playlists.find(p => p.name === name)) {
      setPlaylists([...playlists, { name, songs: [] }]);
    }
  };

  const handleEditPlaylist = (name, updatedSongs) => {
    setPlaylists(playlists.map((playlist) => (playlist.name === name ? { ...playlist, songs: updatedSongs } : playlist)));
  };

  const handleDeletePlaylist = (name) => {
    setPlaylists(playlists.filter((playlist) => playlist.name !== name));
    if (currentPlaylist === name) setCurrentPlaylist(null);
  };

  const handleShowPlaylist = () => {
    setShowPlaylist(!showPlaylist);
  };

  return (
    <div className="container">
      <Header onShowPlaylist={handleShowPlaylist} />
      <SearchBar onSearch={handleSearch} />
      <div className="main-content">
        <SongList
          songs={searchResults.length > 0 ? searchResults : songs}
          onSongClick={handleSongClick}
          onAddToPlaylist={handleAddToPlaylist}
         /* onPlayPause={handlePlayPause}*/
          onNext={handleNext}
          onPrevious={handlePrevious}
        />
        <MusicPlayer
          currentSong={currentSong}
          isPlaying={isPlaying}
          onPlayPause={handlePlayPause}
          onNext={handleNext}
          onPrevious={handlePrevious}
        />
      </div>
      {showPlaylist && (
        <Playlist
          playlists={playlists}
          currentPlaylist={currentPlaylist}
          onAddToPlaylist={handleAddToPlaylist}
          onRemoveFromPlaylist={handleRemoveFromPlaylist}
          onCreatePlaylist={handleCreatePlaylist}
          onEditPlaylist={handleEditPlaylist}
          onDeletePlaylist={handleDeletePlaylist}
          onSelectPlaylist={setCurrentPlaylist}
          currentSong={currentSong}
          isPlaying={isPlaying}
          onPlayPause={handlePlayPause}
          onSongClick={handleSongClick}
        />
      )}
      <Footer />
    </div>
  );
};

export default Home;
