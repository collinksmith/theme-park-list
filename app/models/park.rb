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
  has_many :weather_data, through: :city

  WINTER = %w{ dec jan feb }
  SPRING = %w{ mar apr may }
  SUMMER = %w{ jun jul aug }
  FALL = %w{ sep oct nov }
  YEAR = WINTER + SPRING + SUMMER + FALL

  scope :summer, -> { includes(:weather_data).where(weather_data: {month: SUMMER}) }

  attr_reader :avg_high, :avg_low, :avg_precip, :weather_score

  # def self.season_relation
  #   City.find_by_sql(<<-SQL
  #     SELECT AVG(avg_high) AS high, AVG(avg_low) AS low, AVG(avg_precip) AS precip
  #     FROM cities
  #     LEFT OUTER JOIN weather_data ON weather_data.id = cities.id
  #     WHERE weather_data.month IN ('jun, jul, aug')
  #     SQL
  #     )
  # end

  def set_weather
    self.avg_high = (weather_data.inject(0) { |sum, n| sum + n.avg_high }) / 
                     weather_data.length
    self.avg_low = (weather_data.inject(0) { |sum, n| sum + n.avg_low }) / 
                     weather_data.length
    self.avg_precip = (weather_data.inject(0) { |sum, n| sum + n.avg_precip }) / 
                     weather_data.length

    scores = []
    scores << high_score(self.avg_high) unless self.avg_high.nil?
    scores << low_score(self.avg_low) unless self.avg_low.nil?
    scores << precip_score(self.avg_precip) unless self.avg_precip.nil?

    self.weather_score =  scores.empty? ? nil : average_values(scores)
  end


  # def set_weather(season)
  #   debugger
  #   season_avg = get_season_avg(seasons[season])
  #   self.avg_high = season_avg.high
  #   self.avg_low = season_avg.low
  #   self.avg_precip = season_avg.precip

  #   scores = []
  #   scores << high_score(season_avg.high) unless season_avg.high.nil?
  #   scores << low_score(season_avg.low) unless season_avg.low.nil?
  #   scores << precip_score(season_avg.precip) unless season_avg.precip.nil?

  #   self.weather_score =  scores.empty? ? nil : average_values(scores)
  # end

  private
  attr_writer :avg_high, :avg_low, :avg_precip, :weather_score

  def average_values(values)
    values.inject(:+) / values.length
  end

  def get_season_avg(season)
    return weather_data.select("AVG(avg_high) AS high,
                                AVG(avg_low) AS low,
                                AVG(avg_precip) AS precip").
                                where(month: season).to_a[0]
  end

  def seasons
    {"winter" => WINTER,
     "spring" => SPRING,
     "summer" => SUMMER,
     "winter" => WINTER,
     "year" => YEAR}
  end

  def high_score(high)
    case high
    when (95..Float::INFINITY)
      return 35
    when (85...95)
      return 75
    when (70...85)
      return 100
    when (60...70)
      return 75
    when (50...60)
      return 50
    when (40...50)
      return 35
    when (-Float::INFINITY...40)
      return 15
    end
  end

  def low_score(low)
    case low
    when (95..Float::INFINITY)
      return 25
    when (85...95)
      return 45
    when (70...85)
      return 75
    when (60...70)
      return 100
    when (50...60)
      return 75
    when (35...50)
      return 50
    when (20...35)
      return 35
    when (-Float::INFINITY...20)
      return 15
    end
  end

  def precip_score(precip)
    case precip
    when (0...0.5)
      return 100
    when (0.5...1)
      return 90
    when (1...1.5)
      return 80
    when (1.5...2)
      return 70
    when (2...2.5)
      return 60
    when (2.5...3)
      return 50
    when (3...3.5)
      return 40
    when (3.5...4)
      return 30
    when (4...5)
      return 25
    when (5...6)
      return 20
    when (6...Float::INFINITY)
      return 10
    end
  end
end
