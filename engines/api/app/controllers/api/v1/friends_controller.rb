require 'api/application_controller'

module Api
  module V1
    class FriendsController < ApplicationController
      def index
        render json: friends,
               current_user: current_user,
               status: :ok
      end

      private

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
