class MemoryBox < ApplicationRecord
  belongs_to :time_capsule
  has_many :medium
end
