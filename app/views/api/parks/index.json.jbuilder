json.parks do
  json.array! @parks do |park|
    json.partial! "park", park: park
  end
end

json.page(@page)
json.total_pages(@total_pages)