# Phase 4: User Feeds

## Rails
### Models
* User
* Review
* Following

### Controllers
* UsersController (create, new)
* SessionsController (create, new)
* ReviewsController (create, update, destroy, show, index)

### Views
* users/show.json.jbuilder
* reviews/index.json.jbuilder
* reviews/show.json.jbuilder
* reviews/_review.json.jbuilder

## Backbone
### Models
* Review
* User

### Collections
* Reviews

### Views
* ReviewsIndex
* ReviewsIndexItem
* UserShow

## Gems/Libraries
* BCrypt