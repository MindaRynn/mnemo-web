module Api
  module V1
    class TimeCapsuleSerializer < ActiveModel::Serializer
      attributes :id, :memory_boxes, :status, :wrap_date, :created_at, :open_date
    end
  end
end
