class Medium < ApplicationRecord
  enum media_type: [:image, :video]

  belongs_to :memory_box
  belongs_to :user
end
