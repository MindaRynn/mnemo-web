module Api
  module V1
    class TagsController < ApplicationController
      def index
        render json: all_tags,
               status: :ok
      end

      def all_tags
        Tag.all()
      end
    end
  end
end
