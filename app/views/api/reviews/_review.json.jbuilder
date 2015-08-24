json.(review, :title, :body, :user_id, :park_id, :overall, :atmosphere,
               :family_friendliness, :intensity, :wait_times, :cost, :id)
json.written_on review.created_at.strftime("Written on %b %d, %Y")
json.author review.user.username

if parks
  json.park_name review.park.name
end