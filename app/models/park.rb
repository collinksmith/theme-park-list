# == Schema Information
#
# Table name: parks
#
#  id                  :integer          not null, primary key
#  name                :string           not null
#  latitude            :float            not null
#  longitude           :float            not null
#  image_url           :string
#  tripadv_rating      :integer
#  roller_coasters     :integer
#  water_rides         :integer
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#  rides               :integer
#  url                 :string
#  city_id             :integer
#  num_tripadv_ratings :integer
#

class Park < ActiveRecord::Base
  SEASONS = {
    winter: "('dec', 'jan', 'feb')",
    spring: "('mar', 'apr', 'may')",
    summer: "('jun', 'jul', 'aug')",
    fall: "('sep', 'oct', 'nov')",
    year: "('jan', 'feb', 'mar', 'apr', 'may', 'jun',
            'jul', 'aug', 'sep', 'oct', 'nov', 'dec')"
  }

  def self.with_weather_data_and_associations(season = :year)
    months = SEASONS[season]

    Park.
      select("parks.*, 
              AVG(avg_high) AS high, 
              AVG(avg_low) AS low, 
              AVG(avg_precip) AS precip,
              costs.amount AS ticket_price ").
      joins("INNER JOIN cities ON parks.city_id = cities.id").
      joins("LEFT JOIN weather_data ON weather_data.city_id = cities.id").
      joins("INNER JOIN costs ON costs.park_id = parks.id").
      where("weather_data.city_id IS NULL OR 
             weather_data.month IN #{months}").
      where("costs.cost_type = 'adult_ticket'").
      group("id").group("costs.amount").
      includes(:costs, :city)
  end

  validates :name, :latitude, :longitude, :city_id, presence: true

  belongs_to :city
  has_many :costs
  has_many :weather_data, through: :city

  attr_reader :avg_high, :avg_low, :avg_precip
  attr_accessor :ord

  def weather_score
    scores = []
    scores << high_score(self.high) unless self.high.nil?
    scores << low_score(self.low) unless self.low.nil?
    scores << precip_score(self.precip) unless self.precip.nil?

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
