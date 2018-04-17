class TimeCapsule < ApplicationRecord
  enum direct_type: [:everyone, :me, :friend]

  belongs_to :user

  has_many :participations, dependent: :destroy

  has_many :memory_boxes, dependent: :destroy
end