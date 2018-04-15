class TimeCapsule < ApplicationRecord
  enum direct_type: [:everyone, :me, :friend]

  belongs_to :user
  has_many :users
  has_many :memory_boxes
  has_many :receivers, class_name: 'User'
end