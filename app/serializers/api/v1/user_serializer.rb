module Api
  module V1
    class UserSerializer < ActiveModel::Serializer
      attributes :name
    end
  end
end
