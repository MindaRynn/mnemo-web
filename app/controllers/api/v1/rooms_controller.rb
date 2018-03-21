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
    end
  end
end
