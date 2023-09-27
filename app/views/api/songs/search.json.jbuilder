json.songs({})

json.songs do
  @songs.each do |song|
    json.set! song.id do
      json.extract! song, :id, :title, :album_id, :artist_id

    end
  end
end

# json.songs do
#   @songs.each do |song|
#       json.set! song.id do
#           json.extract! song, :id, :title, :album_id
#           album = Album.find(song.album_id)
#           json.set! :album_title, album.title
#           json.set! :artist_id, album.artist_id
#           json.set! :image_url, album.image.url
#           artist = Artist.find(album.artist_id)
#           json.set! :artist_name, artist.name
#       end
#   end
# end

# json.albums do
#   @albums.each do |album|
#       json.set! album.id do
#           json.extract! album, :id, :name, :artist_id
#           json.set! :image_url, album.image.url
#           artist = Artist.find(album.artist_id)
#           json.set! :artist_name, artist.name
#       end
#   end
# end

# json.artists do
#   @artists.each do |artist|
#       json.set! artist.id do
#           json.extract! artist, :id, :name
#           json.set! :image_url, artist.image.url
#       end
#   end
# end
