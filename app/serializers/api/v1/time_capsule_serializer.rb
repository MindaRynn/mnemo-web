module Api
  module V1
    class TimeCapsuleSerializer < ActiveModel::Serializer
      has_many :memory_boxes, serializer: MemoryBoxSerializer

      attributes :id, :subject, :user, :memory_boxes, :wrap_date, :created_at, :open_date, :direct_type, :participations

      def participations
        Participation.where(time_capsule_id: object.id).pluck(:user_id)
      end
    end
  end
end
