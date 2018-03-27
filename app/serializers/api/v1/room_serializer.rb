module Api
  module V1
    class RoomSerializer < ActiveModel::Serializer
      attributes :id, :name, :users, :room_key
    end
  end
end
