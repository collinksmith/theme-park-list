json.city park.city.name
json.state park.city.state
json.country park.city.country

json.costs park.costs do |cost|
  json.(cost, :id, :cost_type, :amount)
end