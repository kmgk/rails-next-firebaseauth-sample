class User < ApplicationRecord
  has_many :posts

  validates :name, presence: true
  validates :uid, presence: true, uniqueness: true
end
