module Api
  module V1
    class MemoryBoxesController < ApplicationController
      def index
        render json: MemoryBox.all,
               current_user: current_user,
               status: :ok
      end

      def create

      end
    end
  end
end
