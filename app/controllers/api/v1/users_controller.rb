module Api
  module V1
    class UsersController < ApplicationController
      def index
        render json: find_user,
               current_user: current_user,
               each_serializer: UserSerializer,
               status: :ok
      end

      private

      # Remove this whem friend chat system enable
      def find_user
        return current_user if params[:user_id].nil?

        User.find(params[:user_id])
      end
    end
  end
end
