

json.album do
  json.extract! @album, :id, :name, :year, :artist_id
  json.set! :image_url, @album.image.url
  json.set! :songs, @album.songs do |song|
    json.extract! song, :id, :title, :artist_id, :album_id
    json.set! :file, song.file.url
    json.set! :image_url, @album.image.url
  end
end