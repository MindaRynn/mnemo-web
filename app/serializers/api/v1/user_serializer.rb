module Api
  module V1
    class UserSerializer < ActiveModel::Serializer
      attributes :id, :name, :image
    end
  end
end
