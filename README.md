# Theme Park List

[Live link][live]

[live]: http://www.themeparklist.info

## Description

Theme Park List is a single page app inspired by [Nomad List][nomad] that helps you find the best theme parks for you. It contains data on over 100 theme parks throughout the United States, including
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

[nomad]: https://nomadlist.com/

## Technologies

Theme Park List was built with Rails and Backbone.

The following jQuery plugins are used:
  * [Typeahead][typeahead]
  * [Raty][raty]
  * [jQuery-ui slider][slider]

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
