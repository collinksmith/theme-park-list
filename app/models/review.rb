class Review < ActiveRecord::Base
  validates :user_id, :park_id, :overall, presence: true
  validates :title, length: { maximum: 50 }

  belongs_to :park
  belongs_to :user
end
