# Theme Park List

[Live link][live]

[live]: http://www.themeparklist.info

## Description

Theme Park List helps you find the best theme parks for you. It contains data on over 100 theme parks throughout the United States, including
  * Location
  * Weather
  * Number of rides, roller coasters, and water rides
  * Trip Advisor rating
  * Costs

The site offers many ways to organize the parks in order to find the ones that you're looking for. You can:
  * Filter by cost of entrance, weather, number of roller coasters, or number of water rides
  * Select a time of year for which to get weather data
  * Sort by various attributes
  * Search by park name
  * View the filtered parks on a map

In addition filtering, sorting, and seaching parks, you can write reviews and read reviews written by other users. You can also favorite parks. Going to your user page will allow you to see all the reviews you've written and parks you've favorited.

## Technologies

Theme Park List was built with Rails and Backbone.

The following jQuery plugins are used:
  * Typeahead [typeahead]
  * Raty [raty]
  * jQuery-ui slider [slider]

[typeahead]: https://github.com/twitter/typeahead.js/
[raty]: https://github.com/wbotelhos/raty
[slider]: https://jqueryui.com/slider/

Google maps API powers the map.

CSS tools used include Bootstrap and SASS.

## Technical Details

Efficiently retrieving the weather data for a particular season posed a technical challenge. It required a somewhat complication SQL query, which I wrote as a method on my Park model in Rails using the Active Record query interface.

Each city has average high, low, and precipitation data stored for every month of the year. All the work for selecting the correct city and months, and then getting the average of all those months, was done in the SQL query.

Additional filtering and sorting is handled in the Parks Controller. This is where the bulk of the back end logic takes place. The front end passes any filters etc as params, and the controller uses that info to perform the appropriate operations on the parks Active Record Relation returned by the SQL query mentioned above.

These operations are done via the Active Record query interface where possible to maximize speed, although in some cases it was necessary to convert the relation into an array first.

## TODOS

### Minor Improvements
- [ ] Improve design of user page
- [ ] Add tooltips to explain filters
- [ ] Improve "Favorite Park" button
- [ ] Button to bring up a relevant youtube video on each park's show view

### Major Features
- [ ] "Parks Nearby" tab
- [ ] "Places to Stay" tab
- [ ] See and filter by cost of flights from user's current location
- [ ] Users can submit information to be edited and/or aggregated
- [ ] Forum, with a link to relevant threads on each park's show view
- [ ] Activity history (previously viewed theme parks)

<!-- # Development Road Map

## Minimum Viable Product
Theme Park List inspired by of Nomadlist and is built on Rails and Backbone. Users can: -->

<!-- This is a Markdown checklist. Use it to keep track of your progress! -->

<!-- - [X] View a list of theme parks with their basic info
- [X] Filter the list based on predetermined options
- [X] Sort the list by any attribute
- [X] Search for theme parks by name
- [X] View a map of theme parks
- [X] View calculated scores for each theme park
- [X] View specific data and information for each theme park
- [X] Create accounts
- [X] Create sessions (log in)
- [X] Write reviews
- [X] Save/favorite theme parks

## Design Docs
* [View Wireframes][views]
* [DB schema][schema]

[views]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: Viewing Parks (~2 days)
I will provide seed data for a few parks to facilitate testing. I will make the rails model, controller and jbuilder views for the parks. Then I'll set up the Backbone views related to parks. By the end of this phase, users should be able to navigate between the parks index view and park show view, and between the different tabs within a park show view.

[Details][phase-one]

### Phase 2: Derived Attributes (~1 day)
I will write code in the Rails Park model to provide access to a park's costs and weather. A park's costs will be broken down into different parts, and the data will live in the costs table. The Rails Park model will provide access to these costs, as well as a calculated total cost. A park's weather will be derived from its location. I will need to use an API to convert location into average temp and rainfall. I'll then write methods in the Rails Park model to get the average temp and rainfall for each season, as well as to return an abstracted weather score based on this information.

[Details][phase-two]

### Phase 3: Filtering and Searching for Parks (~1-2 days)
I will make a Backbone view to provide a user interface for filtering parks. When the user clicks the "filter parks" button, the ParksIndex view will be updated to only contain parks that meet the selected criteria. I'll also provide a search bar that will update the results of the ParksIndex view as the user types.

[Details][phase-three]

### Phase 4: Users, Follows, and Reviews (~2 days)
I'll allow users to sign in using OmniAuth. They will be able to follow parks, see a list of their followed parks, and write reviews. I'll update the Rails Park model to automatically update its ratings based on the reviews that users leave.

[Details][phase-four]

### Phase 5: Map of Parks, Nearby Parks (~1 day)
I'll allow users to view a map of parks on the main page. I'll also add a "nearby parks" tab on the park show page.

[Details][phase-five]

### Bonus Features
- [ ] See and filter by cost of flights from user's current location
- [ ] Places to sleep near each theme park
- [ ] Users can submit information to be edited and/or aggregated
- [ ] Forum, with a link to relevant threads on each park's show view
- [X] Infinite scroll
- [X] Typeahead search bar
- [X] Nav bar appears on scroll up
- [ ] Button to bring up a relevant youtube video on each park's show view
- [ ] Activity history (previously viewed theme parks) -->

<!-- [phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md -->
