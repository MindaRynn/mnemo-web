require 'travelbook_api/application_controller'

module TravelbookApi
  module V1
    class FriendsController < ApplicationController
      before_action :doorkeeper_authorize!
      load_and_authorize_resource class: 'Friendship', except: [:index]

      def index
        render json: friends,
               current_user: current_user,
               each_serializer: UserSimpleSerializer,
               status: :ok
      end

      private

      def friends
        paginated_resources_for(find_user.friends)
      end

      def find_user
        return current_user if params[:user_id].nil?

        User.find(params[:user_id])
      end
    end
  end
end
