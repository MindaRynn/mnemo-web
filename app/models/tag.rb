class Tag < ApplicationRecord
  has_many :sub_tags, class_name: 'Tag'
  has_many :time_capsules
end
