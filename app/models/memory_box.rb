class MemoryBox < ApplicationRecord
  belongs_to :time_capsule
  belongs_to :user
  has_many :medium, dependent: :destroy
end
