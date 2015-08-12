# Theme Park List

[Heroku link][heroku]

[heroku]: https://theme-park-list.herokuapp.com/

## Minimum Viable Product
Theme Park List inspired by of Nomadlist and is built on Rails and Backbone. Users can:

<!-- This is a Markdown checklist. Use it to keep track of your progress! -->

- [ ] View a list of theme parks with their basic info
- [ ] Filter the list based on predetermined options
- [ ] Sort the list by any attribute
- [ ] Search for theme parks by name
- [ ] View a map of theme parks
- [ ] View calculated scores for each theme park
- [ ] View specific data and information for each theme park
- [X] Create accounts
- [X] Create sessions (log in)
- [ ] Write reviews
- [ ] Save/favorite theme parks

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

### Bonus Features (TBD)
- [ ] See and filter by cost of flights from user's current location
- [ ] Places to sleep near each theme park
- [ ] Users can submit information to be edited and/or aggregated
- [ ] Forum, with a link to relevant threads on each park's show view
- [ ] Infinite scroll
- [ ] Typeahead search bar
- [ ] Nav bar appears on scroll up
- [ ] Button to bring up a relevant youtube video on each park's show view
- [ ] Activity history (previously viewed theme parks)

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md

