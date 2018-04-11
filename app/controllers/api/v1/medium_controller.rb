module Api
  module V1
    class MediumController < ApplicationController
      def index
        render json: Medium.all,
               current_user: current_user,
               status: :ok
      end

      def create

      end
    end
  end
end
