class Song < ApplicationRecord
validates :title, presence: true
validates :year, presence: true
# validates :album_id

validates :artist_id, presence: true

has_one_attached :file

has_many :playlist_songs,
dependent: :destroy

has_many :playlists,
through: :playlist_songs

belongs_to :album, optional: true
belongs_to :artist
end
