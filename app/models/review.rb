class Review < ActiveRecord::Base
  validates :user_id, :park_id, :overall, presence: true
end
