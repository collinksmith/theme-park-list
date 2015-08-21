json.reviews do
  json.array! @reviews do |review|
    json.partial! "review", review: review
  end
end