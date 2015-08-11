class Park < ActiveRecord::Base
  validates :name, :latitude, :longitude, :city, presence: true
end
