json.partial! "park", park: @park
json.reviews @park.reviews do |review|
  json.partial! "api/reviews/review", review: review,
                                      parks: false,
                                      user: @current_user
end
