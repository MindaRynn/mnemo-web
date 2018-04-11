module Api
  module V1
    class MediumController < ApplicationController
      def index
        render json: medium_queried,
               current_user: current_user,
               status: :ok
      end

      def create

      end

      private

      def medium_queried
        return User.find(params[:user_id]).medium if params[:user_id].present?
        return Media.all
      end
    end
  end
end
