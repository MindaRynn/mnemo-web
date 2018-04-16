module Api
  module V1
    class MemoryBoxesController < ApplicationController
      skip_before_action :verify_authenticity_token

      def index
        render json: memory_boxes_queried,
               current_user: current_user,
               status: :ok
      end

      def create
        time_capsule = TimeCapsule.find(time_capsule_params[:time_capsule_id])

        memory_box = time_capsule.memory_boxes.create(
          description: time_capsule_params[:memory_box_detail][:memory_box_detail],
          user_id: current_user.id
        )

        time_capsule_params[:memory_box_detail][:medium].each do |mediaUrl|
          memory_box.medium << Medium.create(
            media_type: :image,
            media_url: mediaUrl,
            user_id: current_user.id
          )
        end

        render json: memory_box,
               current_user: current_user,
               status: :ok
      end

      private

      def memory_boxes_queried
        return User.find(params[:user_id]).memory_boxes if params[:user_id].present?
        return MemoryBox.all
      end

      def time_capsule_params
        ActiveModelSerializers::Deserialization
          .jsonapi_parse(params, only: permitted_attributes)
      end

      def permitted_attributes
        [:time_capsule_id, :memory_box_detail]
      end
    end
  end
end
