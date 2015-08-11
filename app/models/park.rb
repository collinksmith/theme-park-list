# == Schema Information
#
# Table name: parks
#
#  id              :integer          not null, primary key
#  name            :string           not null
#  latitude        :float            not null
#  longitude       :float            not null
#  city            :string           not null
#  state           :string
#  country         :string
#  image_url       :string
#  tripadv_rating  :integer
#  roller_coasters :integer
#  water_rides     :integer
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  rides           :integer
#

class Park < ActiveRecord::Base
  validates :name, :latitude, :longitude, :city, presence: true
end
