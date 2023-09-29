class Artist < ApplicationRecord
validates :name, presence: true, uniqueness: true 
validates :bio, presence: true

  has_one_attached :image
  
  has_many :albums,
  dependent: :destroy

 
  # which one or keep both?
  has_many :songs,
  through: :albums

end
