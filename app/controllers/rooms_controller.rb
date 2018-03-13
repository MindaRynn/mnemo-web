class RoomsController < ApplicationController
  before_action :authenticate_user!

  def index
    @friends = User.find(current_user.id).friends.to_json
  end
end
