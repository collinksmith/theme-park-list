# == Schema Information
#
# Table name: cities
#
#  id         :integer          not null, primary key
#  name       :string           not null
#  state      :string
#  country    :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class City < ActiveRecord::Base
  validates :name, :country, presence: true

  has_many :parks
  has_many :weather_data
end
