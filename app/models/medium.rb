class Medium < ApplicationRecord
  enum media_type: [:image, :video]

  belongs_to :memory_box
end
