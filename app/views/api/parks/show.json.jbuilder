json.partial! "park", park: @park
json.reviews @park.reviews do |review|
  json.partial! "api/reviews/review", review: review, parks: false
end

favorite = current_user.favorites.where(park_id: @park.id)[0] if current_user
if favorite
  json.favorite favorite.id
end
