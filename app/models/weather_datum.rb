# == Schema Information
#
# Table name: weather_data
#
#  id         :integer          not null, primary key
#  city_id    :integer          not null
#  avg_high   :float
#  avg_low    :float
#  avg_precip :float
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  month      :string
#

class WeatherDatum < ActiveRecord::Base
  MONTHS = %w{jan feb mar apr may jun jul aug sep oct nov dec}
  validates :city_id, presence: true
  validates :month, inclusion: { in: MONTHS }

  belongs_to :city
end
