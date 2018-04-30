class TimeCapsule < ApplicationRecord
  enum direct_type: [:everyone, :me, :friend]

  belongs_to :user
  belongs_to :tag

  has_many :users, dependent: :destroy
  has_many :participations, dependent: :destroy

  has_many :memory_boxes, dependent: :destroy

  def ready?
    Date.current <= open_date_format
  end

  def open_date_format
    DateTime.strptime(open_date, '%Y-%m-%dT%H:%M:%S.%L')
  end
end
