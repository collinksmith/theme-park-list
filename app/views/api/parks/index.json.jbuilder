json.array! @parks do |park|
  json.partial! "park", park: park
  my_park = @parks2.select { |park2| park2.id == park.id }[0]
  json.partial! "park2", park: my_park
end
