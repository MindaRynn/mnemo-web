module Api
  module V1
    class FriendsController < ApplicationController
      def index
        render json: all_user,
               current_user: current_user,
               each_serializer: UserSerializer,
               status: :ok
      end

      private

      # Remove this whem friend chat system enable
      def all_user
        User.where.not(id: find_user.id)
      end

      def friends
        find_user.friends
      end

      def find_user
        return current_user if params[:user_id].nil?

        User.find(params[:user_id])
      end
    end
  end
end
