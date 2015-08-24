json.(@user, :id, :username, :email, :password_digest, :session_token)
json.reviews @reviews do |review|
  json.partial! "/api/reviews/review", review: review, parks: true
end