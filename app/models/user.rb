class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  attribute :opened_time_capsule_ids
  attribute :participation_ids

  devise :database_authenticatable,
         :registerable,
         :recoverable,
         :rememberable,
         :trackable,
         :validatable,
         :omniauthable,
         omniauth_providers: [:facebook, :google_oauth2]

  has_and_belongs_to_many :rooms, dependent: :destroy

  has_many :friendships, dependent: :destroy
  has_many :friends, through: :friendships

  has_many :participations, dependent: :destroy

  has_many :time_capsules, dependent: :destroy
  has_many :medium, dependent: :destroy
  has_many :memory_boxes, dependent: :destroy

  def self.new_with_session(params, session)
    super.tap do |user|
      if data = session["devise.facebook_data"] && session["devise.facebook_data"]["extra"]["raw_info"]
        user.email = data["email"] if user.email.blank?
      end
    end
  end

  def opened_time_capsule_ids
    SeenRelationship.where(user_id: id).pluck(:time_capsule_id)
  end

  def participation_ids
    Participation.where(user_id: id).pluck(:time_capsule_id)
  end

  def clean_up_passwords
    self.password = self.password_confirmation = nil
  end

  def update_without_password(params, *options)
    if params[:password].nil?
      params.delete(:password)
      params.delete(:password_confirmation)
    end

    result = update_attributes(params, *options)
    clean_up_passwords
    result
  end

  def self.from_omniauth(auth)
    firebase_url    = 'https://mnemo-194409.firebaseio.com/'
    firebase_secret = 'WT9D9VscWz2Y7kXEei78SwlZ6YSAiW5fmNX5zU2R'
    @firebase = Firebase::Client.new(firebase_url, firebase_secret)

    notification_key = @firebase.push("notification",{facebook: 1}).body.to_h["name"]

    where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
      user.email = auth.info.email
      user.password = Devise.friendly_token[0,20]
      user.name = auth.info.name   # assuming the user model has a name
      user.image = auth.info.image # assuming the user model has an image
      user.notification_key = notification_key
      @firebase.delete("notification/#{notification_key}")
    end
  end

  def self.find_for_google_oauth2(access_token, signed_in_resource=nil)
    data = access_token.info
    user = User.where(:provider => access_token.provider, :uid => access_token.uid ).first
    if user
      return user
    else
      registered_user = User.where(:email => access_token.info.email).first
      if registered_user
        return registered_user
      else
        user = User.create(name: data["name"],
                           provider:access_token.provider,
                           email: data["email"],
                           uid: access_token.uid ,
                           password: Devise.friendly_token[0,20],
        )
      end
    end
  end
end
