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
  SEASONS = {
    winter: %w{ dec jan feb },
    spring: %w{ mar apr may },
    summer: %w{ jun jul aug },
    fall: %w{ sep oct nov }
  }

  def self.with_weather_data(season)
    months = SEASONS[season]
    # debugger
    results = self.
      select("parks.*, 
              AVG(weather_data.avg_high) AS high, 
              AVG(weather_data.avg_low) AS low,
              AVG(weather_data.avg_precip) AS precip").
      references(:weather_data).
      includes(:costs, :city, :weather_data).
      group("parks.id").group("weather_data.city_id").group("costs.id").group("cities.id").
      group("weather_data.id")

    self.find_by_sql(<<-SQL)
      SELECT
        parks.*, AVG(avg_high) AS high, AVG(avg_low) AS low, AVG(avg_precip) AS precip
      FROM
        parks INNER JOIN cities ON parks.city_id = cities.id
        LEFT OUTER JOIN weather_data ON cities.id = weather_data.city_id
      GROUP BY
        parks.id
    SQL

    if months
      results = results.where(weather_data: {month: months})
    end

    results
  end

  validates :name, :latitude, :longitude, :city_id, presence: true

  belongs_to :city
  has_many :costs
  has_many :weather_data, through: :city

  attr_reader :avg_high, :avg_low, :avg_precip, :weather_score

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

  private
  attr_writer :avg_high, :avg_low, :avg_precip, :weather_score

  def average_values(values)
    values.inject(:+) / values.length
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
