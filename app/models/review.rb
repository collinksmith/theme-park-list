class Review < ActiveRecord::Base
  validates :user_id, :park_id, :overall, presence: true
  validates :title, length: { maximum: 50 }
  validates :user_id, uniqueness: { scope: :park_id,
    message: "cannot review the same park twice" }

  belongs_to :park
  belongs_to :user
end
