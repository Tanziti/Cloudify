
    @playlists.each do |playlist|
        json.set! playlist.id do
            json.extract! playlist, :id, :title, :color, :user_id, :song_ids
            user = User.find(playlist.user_id)
            json.set! :user_name, user.username
        end
    end