module Api
  module V1
    class TimeCapsulesController < ApplicationController
      def index
        render json: time_capsules_queried,
               current_user: current_user,
               status: :ok
      end

      def create

      end

      private

      def time_capsules_queried
        return User.find(params[:user_id]).time_capsules if params[:user_id].present?
        return TimeCapsule.all
      end
    end
  end
end
