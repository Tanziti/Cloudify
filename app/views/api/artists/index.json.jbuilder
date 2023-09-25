json.artists do
  @artists.each do |artist|
    json.set! artist.id do
        json.extract! artist, :id, :name, :bio, :album_ids
        json.set! :image_url, artist.image.url
        # json.set! :banner_url, artist.banner_image.url
        # artist.album_ids.each { |album_id| albums << album_id }
    end
  end
end