module Api
  module V1
    class TimeCapsuleSerializer < ActiveModel::Serializer
      has_many :memory_boxes, serializer: MemoryBoxSerializer

      attributes :id, :subject, :user, :memory_boxes, :wrap_date, :created_at, :open_date, :direct_type

      # def user_ids
      #   object.users.pluck(:id)
      # end
    end
  end
end
