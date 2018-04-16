module Api
  module V1
    class TimeCapsuleSerializer < ActiveModel::Serializer
      has_many :memory_boxes, serializer: MemoryBoxSerializer

      attributes :id, :subject, :user, :memory_boxes, :status, :wrap_date, :created_at, :open_date
    end
  end
end
