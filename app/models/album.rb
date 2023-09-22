class Album < ApplicationRecord
  validates :name, presence: true

  validates :year, presence: true

  validates :artist_id, presence: true

  belongs_to :artist

  has_many :songs,
  dependent: :destroy
end
