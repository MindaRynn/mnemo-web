class SeenRelationship < ApplicationRecord
  belongs_to :user
  belongs_to :time_capsule
end
