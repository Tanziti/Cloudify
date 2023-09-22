class Artist < ApplicationRecord
validates :name, presence: true, uniqueness: true 

  has_many :albums,
  dependent: :destroy

  has_many :songs,
  dependent: :destroy
  # which one or keep both?
  has_many :songs,
  through: :albums

end
