json.song do
  json.extract! @song, :id, :title, :artist_id, :album_id

end