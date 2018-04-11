module Api
  module V1
    class TimeCapsulesController < ApplicationController
      def index
        render json: TimeCapsule.all,
               current_user: current_user,
               status: :ok
      end

      def create

      end
    end
  end
end
