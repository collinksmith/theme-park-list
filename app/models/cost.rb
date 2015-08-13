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
  COST_TYPES = %w{ adult_ticket child_ticket senior_ticket season_pass }
  validates :park_id, :amount, :cost_type, presence: true
  validates :cost_type, inclusion: { in: COST_TYPES }

  belongs_to :park
end
