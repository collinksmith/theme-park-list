# == Schema Information
#
# Table name: costs
#
#  id         :integer          not null, primary key
#  park_id    :integer          not null
#  amount     :decimal(, )      not null
#  cost_type  :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Cost < ActiveRecord::Base
  validates :park_id, :amount, :cost_type, presence: true

  belongs_to :park
end
