
json.album do
  json.extract! @album, :id, :name, :year, :song_ids, :artist_id
  json.set! :image_url, @album.image.url
  # @album.song_ids.each { |song_id| songs << song_id }
end
