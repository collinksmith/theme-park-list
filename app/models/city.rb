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

  WINTER = %w{ dec jan feb }
  SPRING = %w{ mar apr may }
  SUMMER = %w{ jun jul aug }
  FALL = %w{ sep oct nov }
  YEAR = WINTER + SPRING + SUMMER + FALL

  def avg_high(season)
    return weather_data.where(month: season).average("avg_high").to_f
  end

  def avg_low(season)
    return weather_data.where(month: season).average("avg_low").to_f
  end

  def avg_precip(season)
    return weather_data.where(month: season).average("avg_precip").to_f
  end

  def weather_score(season)
    high, low, precip = avg_high(season), avg_low(season), avg_precip(season)

    return ((high_score(high) +
             low_score(low) +
             precip_score(precip)) / 3).round
  end

  private

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
