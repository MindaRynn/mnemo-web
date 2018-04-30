module Api
  module V1
    class UserSerializer < ActiveModel::Serializer
      attributes :id, :name, :image, :notification_key
    end
  end
end
