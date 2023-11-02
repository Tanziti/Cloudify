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