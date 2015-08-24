json.(@user, :id, :username, :email, :password_digest, :session_token)
json.reviews @user.reviews do |review|
  json.partial! "/api/reviews/review", review: review
end