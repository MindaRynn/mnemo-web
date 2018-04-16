module Api
  module V1
    class MemoryBoxSerializer < ActiveModel::Serializer
      attributes :id, :description, :medium
    end
  end
end
