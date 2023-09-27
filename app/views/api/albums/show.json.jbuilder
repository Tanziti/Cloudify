
# json.album do
#   json.extract! @album, :id, :name, :year, :song_ids, :artist_id
#   json.set! :image_url, @album.image.url
 
# end

# json.set! "songs" do
#   @songs.each do |song| 
#     json.set! song.id do
#       json.extract! song, :id, :title, :artist_id, :album_id, :file
#     end
#   end
# end
 debugger
json.album do
  json.extract! @album, :id, :name, :year, :artist_id
  json.set! :image_url, @album.image.url
  json.set! :songs, @album.songs do |song|
    json.extract! song, :id, :title, :artist_id, :album_id, :file
  end
end