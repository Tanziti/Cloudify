class CreatePlaylistSongs < ActiveRecord::Migration[7.0]
  def change
    create_table :playlist_songs do |t|
      t.bigint :playlist_id, null: false
      t.bigint :song_id, null: false
      t.integer :song_number, null: false
      t.timestamps
    end

    add_index :playlist_songs, [:playlist_id, :song_number], unique: true, name: "index_playlist_songs_on_playlist_id_and_song_number"
    add_index :playlist_songs, :playlist_id, name: "index_playlist_songs_on_playlist_id"
    add_index :playlist_songs, :song_id, name: "index_playlist_songs_on_song_id"
  end
 
end
