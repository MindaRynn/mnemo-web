module Api
  module V1
    class MemoryBoxSerializer < ActiveModel::Serializer
      attributes :id, :description, :medium, :user, :created_at
    end
  end
end
