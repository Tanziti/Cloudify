class Song < ApplicationRecord
validates :title, presence: true
validates :year, presence: true
# validates :album_id

validates :artist_id, presence: true

has_one_attached :file

belongs_to :album, optional: true
belongs_to :artist
end
