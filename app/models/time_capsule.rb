class TimeCapsule < ApplicationRecord
  enum direct_type: [:everyone, :me, :friend]

  belongs_to :user
  has_many :users, dependent: :destroy
  has_many :memory_boxes, dependent: :destroy
  has_many :receivers, class_name: 'User'
end