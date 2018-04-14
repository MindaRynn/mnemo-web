module Api
  module V1
    class TimeCapsuleSerializer < ActiveModel::Serializer
      attributes :id, :memory_boxes
    end
  end
end
