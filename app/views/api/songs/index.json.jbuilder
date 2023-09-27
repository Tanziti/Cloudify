
  @songs.each do |song|
      json.set! song.id do
          curr_song = Song.find(song.id)
          json.extract! song, :id, :title, :artist_id, :album_id
      end
  end
