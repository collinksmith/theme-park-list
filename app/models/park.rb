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
end
