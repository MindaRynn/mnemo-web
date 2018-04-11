class TimeCapsule < ApplicationRecord
  belongs_to :user
  has_many :users
  has_many :memory_boxes
end
