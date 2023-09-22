class Song < ApplicationRecord
validates :title, presence: true
validates :year, presence: true
validates :album_id

validates :artist_id, presence: true


belongs_to :album
belongs_to :artist
end
