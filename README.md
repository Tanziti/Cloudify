# Cloudify

## [Cloudify Live](https://cloudify-web-service.onrender.com)

# Description
Cloudify is a Spotify clone where users can look up and play songs, albums, and artists via a fully-interactive playbar! Users will also be able to like a song so that they may keep it in a special "liked songs" playlist, or if they want something more personal, create, update and delete your own playlists!

# Technology
## React Redux
The Cloudify stack uses `React Redux` on the frontend to render components and receive data and interact with clients.

## Ruby on Rails
Cloudify stores its seed data and any updates from the frontend it wants to store via `Ruby on Rails`.

## PostgreSQL
A `PostgreSQL` database is utilized to store the user, artist, album, song, playlist, likes, follows, etc., data.

# Features
## User Authentication
Users can sign up and log into and log out of Cloudify with password encryption and frontend and backend error handling.

## Artists, Albums, and Songs
Cloudify displays and allows users to interact with artist, album, and song data.

## Playbar 
A fully interactive playbar allows users to play, pause, restart, drag into different times of, and—in the case of albums and playlists, queue up the entirety of the songs!

## Search
A searchbar and search index page allows users to get real-time updates of songs, albums, and artists!

## Playlists 
A user can create, update, delete and add/remove songs to/from (their own) playlists.

## Likes 
A user can like songs by simply clicking the heart icon, adding the song to a special built in playlist called "Liked Songs"


# Code Snippets
## How Playbar keeps a queue and holds song data that gets selected from another component
```javascript

   useEffect(() => {
    if (sessionUser?.queue?.[0]) {
   
      setCurrentSong(sessionUser.queue[0][0]);
      setAudioSrc(sessionUser?.queue?.[0]?.[0]?.file);
      setKnobStyle({ ...rangeStyle, left: 0 });
      setRangeStyle({ ...rangeStyle, width: 0 });
      setPaused(!paused);
     
    }
  }, [sessionUser?.queue?.[0]])

useEffect(() => {
    const goToNextSong = async () => {
      sessionUser.queue.shift();
      setAudioSrc(sessionUser?.queue?.[0]?.[0]?.file);
    }
    if (audioRef.current) {
      audioRef.current.addEventListener("ended", goToNextSong)
      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener("ended", goToNextSong)
        }
      }
    }
  })
```

## JSON: Preparing playlist info, by having to fetch all the data of a song, album, and artist.

```ruby
playlist_songs = []
songs = []

json.playlist do
    json.extract! @playlist, :id, :title, :user_id, :song_ids, :color
    user = User.find(@playlist.user_id)
    json.set! :user_name, user.username
    json.set! :image_url, @playlist.image.url
    @playlist.playlist_song_ids.each { |playlist_song_id| playlist_songs << playlist_song_id }
end

json.playlist_songs do
    playlist_songs.each do |playlist_song_id|
        json.set! playlist_song_id do
            playlist_song = PlaylistSong.find(playlist_song_id)
            json.extract! playlist_song, :id, :song_id, :song_number, :created_at
            song = Song.find(playlist_song.song_id)
            json.extract! song, :title, :album_id
            album = Album.find(song.album_id)
            json.set! :file, song.file.url
            json.set! :image_url, album.image.url
            json.set! :artist_id, album.artist_id
            json.set! :album_title, album.name
            artist = Artist.find(album.artist_id)
            json.set! :artist_name, artist.name
        end
    end
end
```