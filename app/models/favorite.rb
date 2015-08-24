class Favorite < ActiveRecord::Base
  validates :user_id, :park_id, presence: true

  belongs_to :user
  belongs_to :park
end
