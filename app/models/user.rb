class User < ApplicationRecord
  validates :name, presence: true
  validates :uid, presence: true, uniqueness: true
end
