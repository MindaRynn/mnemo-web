module Api
  module V1
    class TimeCapsulesController < ApplicationController
      skip_before_action :verify_authenticity_token

      def index
        render json: time_capsules_queried,
               current_user: current_user,
               status: :ok
      end

      def update
        time_capsule = TimeCapsule.find(params[:id])

        time_capsule.update!(
          wrap_date: time_capsule_params[:time_capsule_detail][:wrap_date],
          open_date: time_capsule_params[:time_capsule_detail][:open_date],
          direct_type: time_capsule_params[:time_capsule_detail][:direct_to].to_sym,
          subject: time_capsule_params[:time_capsule_detail][:capsule_name]
        )

        time_capsule.memory_boxes.first.update!(description: time_capsule_params[:time_capsule_detail][:capsule_detail])

        time_capsule.memory_boxes.first.medium.delete_all

        time_capsule_params[:time_capsule_detail][:medium].each do |mediaUrl|
          time_capsule.memory_boxes.first.medium << Medium.create(
            media_type: :image,
            media_url: mediaUrl,
            user_id: current_user.id
          )
        end

        render json: time_capsule,
               current_user: current_user,
               status: :ok
      end

      def create
        time_capsule = TimeCapsule.create(
          user_id: current_user.id,
          wrap_date: time_capsule_params[:time_capsule_detail][:wrap_date],
          open_date: time_capsule_params[:time_capsule_detail][:open_date],
          direct_type: time_capsule_params[:time_capsule_detail][:direct_to].to_sym,
          subject: time_capsule_params[:time_capsule_detail][:capsule_name]
        )

        memory_box = MemoryBox.create(description: time_capsule_params[:time_capsule_detail][:capsule_detail],
                                      user_id: current_user.id,
                                      time_capsule_id: time_capsule.id)
        time_capsule_params[:time_capsule_detail][:medium].each do |mediaUrl|
          memory_box.medium << Medium.create(
            media_type: :image,
            media_url: mediaUrl,
            user_id: current_user.id
          )
        end

        time_capsule.memory_boxes << memory_box

        render json: time_capsule,
               current_user: current_user,
               status: :ok
      end

      private

      def time_capsules_queried
        return User.find(params[:user_id]).time_capsules if params[:user_id].present?
        return TimeCapsule.find(params[:time_capsule_id]) if params[:time_capsule_id].present?
        return TimeCapsule.where(id: Participation.where(user: current_user).pluck(:time_capsule_id)) if params[:participated].present?
        return TimeCapsule.all
      end

      def time_capsule_params
        ActiveModelSerializers::Deserialization
          .jsonapi_parse(params, only: permitted_attributes)
      end

      def permitted_attributes
        [:user_id, :time_capsule_detail, :participated]
      end
    end
  end
end
