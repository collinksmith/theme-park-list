# == Schema Information
#
# Table name: parks
#
#  id              :integer          not null, primary key
#  name            :string           not null
#  latitude        :float            not null
#  longitude       :float            not null
#  image_url       :string
#  tripadv_rating  :integer
#  roller_coasters :integer
#  water_rides     :integer
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  rides           :integer
#  url             :string
#  city_id         :integer
#

class Park < ActiveRecord::Base
  validates :name, :latitude, :longitude, :city_id, presence: true

  belongs_to :city
  has_many :costs

  WINTER = %w{ dec jan feb }
  SPRING = %w{ mar apr may }
  SUMMER = %w{ jun jul aug }
  FALL = %w{ sep oct nov }
  YEAR = WINTER + SPRING + SUMMER + FALL

  def set_weather(season)
    
    city.set_weather(seasons[season])
  end

  def avg_high
    return city.avg_high
  end

  def avg_low
    return city.avg_low
  end

  def avg_precip
    return city.avg_precip
  end

  def weather_score
    return city.weather_score
  end

  private

  def seasons
    {"winter" => WINTER,
     "spring" => SPRING,
     "summer" => SUMMER,
     "winter" => WINTER,
     "year" => YEAR}
  end
end
