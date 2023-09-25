class Album < ApplicationRecord
  validates :name, presence: true
  validates :year, presence: true
  validates :artist_id, presence: true

  has_one_attached :image
  
  belongs_to :artist

  has_many :songs,
  dependent: :destroy
end
