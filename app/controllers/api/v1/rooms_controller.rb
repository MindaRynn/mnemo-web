module Api
  module V1
    class RoomsController < ApplicationController
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
        [:user_ids]
      end
    end
  end
end
