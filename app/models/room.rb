class Room < ApplicationRecord
  has_and_belongs_to_many :users, before_add: :inc_users_count, before_remove: :dec_users_count

  private
  def inc_users_count(model)
    Room.increment_counter(:users_count, self.id)
  end

  def dec_users_count(model)
    Room.decrement_counter(:users_count, self.id)
  end
end
