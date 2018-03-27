module Api
  module V1
    class RoomsController < ApplicationController
      skip_before_action :verify_authenticity_token

      def index
        render json: rooms,
               current_user: current_user,
               status: :ok
      end

      def show
        render json: room,
               current_user: current_user,
               status: :ok
      end

      def create
        room = Room.create(room_key: room_params[:room_key])
        room.users << current_user
        room.users << User.find(room_params[:user_ids].first)

        render json: room,
               current_user: current_user,
               status: :ok
      end

      private

      def rooms
        find_user.rooms
      end

      def room
        current_user.rooms.joins(:users).where(users: {id: params[:id]}).where("users_count = '2'")
      end

      def find_user
        return current_user if params[:user_id].nil?

        User.find(params[:user_id])
      end

      def room_params
        ActiveModelSerializers::Deserialization
          .jsonapi_parse(params, only: permitted_attributes)
      end

      def permitted_attributes
        [:user_ids, :room_key]
      end
    end
  end
end
