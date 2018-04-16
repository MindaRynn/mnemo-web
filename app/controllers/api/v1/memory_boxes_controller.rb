module Api
  module V1
    class MemoryBoxesController < ApplicationController
      def index
        render json: memory_boxes_queried,
               current_user: current_user,
               status: :ok
      end

      def create
        binding.pry
      end

      private

      def memory_boxes_queried
        return User.find(params[:user_id]).memory_boxes if params[:user_id].present?
        return MemoryBox.all
      end
    end
  end
end
