json.parks do
  json.array! @parks.each_with_index do |park, index|
    json.partial! "park", park: park
  end
end

json.page(@page)
json.total_pages(@total_pages)
json.total_items(@total_items)