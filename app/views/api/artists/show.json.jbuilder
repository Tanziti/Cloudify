# json.artist do
#   json.extract! @artist, :id, :name, :bio, :album_ids
#     json.set! :albums, @artist.albums do |album|
#       json.extract! album, :id, :name, :year, :artist_id
#       json.set! :image, album.image.url
#   # @artist.album_ids.each { |album_id| albums << album_id }
# end


albums = []

songs = []

json.artist do
  json.extract! @artist, :id, :name, :bio, :album_ids
  json.set! :image_url, @artist.image.url
  json.set! :albums, @artist.albums do |album|
    json.extract! album, :id, :name, :year, :song_ids, :artist_id
    json.set! :image, album.image.url
    end
#   @artist.album_ids.each { |album_id| albums << album_id }
#   albums.each do |album_id|
#     json.set! album_id do
#         album = Album.find(album_id)
#         json.extract! album, :id, :name, :year, :song_ids, :artist_id
#         json.image_url album.image.url
#         album.song_ids.each { |song_id| songs << song_id }
#     end
#  end
end

# json.albums do
#   albums.each do |album_id|
#       json.set! album_id do
#           album = Album.find(album_id)
#           json.extract! album, :id, :name, :year, :song_ids, :artist_id
#           json.image_url album.image.url
#           album.song_ids.each { |song_id| songs << song_id }
#       end
#   end
# end

