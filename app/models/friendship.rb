class Friendship < ApplicationRecord
  after_create :create_inverse_relationship, unless: proc { |friendship| friendship.friend.friends.include?(friendship.user) }
  after_destroy :destroy_inverse_relationship, if: proc { |friendship| friendship.friend.friends.include?(friendship.user) }

  belongs_to :user
  belongs_to :friend, class_name: 'User'

  private

  def create_inverse_relationship
    friend.friendships.create(friend: user)
  end

  def destroy_inverse_relationship
    friendship = friend.friendships.find_by(friend: user)
    friendship.destroy if friendship
  end
end
