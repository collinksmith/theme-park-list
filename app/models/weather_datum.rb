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
  WINTER = %w{ dec jan feb }
  SPRING = %w{ mar apr may }
  SUMMER = %w{ jun jul aug }
  FALL = %w{ sep oct nov }
  YEAR = WINTER + SPRING + SUMMER + FALL

  validates :city_id, presence: true
  validates :month, inclusion: { in: MONTHS }

  scope :summer, -> { where(month: SUMMER) }

  belongs_to :city
end
