ThemeParkList.Collections.Parks = Backbone.Collection.extend({
  url: "/api/parks",
  model: ThemeParkList.Models.Park,

  parse: function (response) {
    this.page = response.page;
    this.total_pages = response.total_pages;
    return response.parks;
  },


  filtered: function(initialCriteria) {
    var criteria = initialCriteria;
    var sourceCollection = this;
    var filteredCollection = new this.constructor;

    var addToFiltered = function(model, collection) {
      if (criteria(model)) {
        filteredCollection.add(model, collection);
      }
    };

    var removeFromFiltered = function(model, collection) {
      filteredCollection.remove(model, collection);
    };

    var changeFiltered = function(model, collection) {
      if (criteria(model)) {
        if (filteredCollection.contains(model)) {
          filteredCollection.trigger('change', model);
        } else {
          addToFiltered(model, collection);
        }
      } else {
        removeFromFiltered(model, collection);
      }
    };

    this.bind("change", changeFiltered);
    this.bind("add",    addToFiltered);
    this.bind("remove", removeFromFiltered);

    filteredCollection.teardown = function() {
      sourceCollection.unbind('change', changeFiltered);
      sourceCollection.unbind('add',    addToFiltered);
      sourceCollection.unbind('remove', removeFromFiltered);
    };

    filteredCollection.refilter = function(newCriteria) {
      // TODO: It would be more efficient to iterate
      // over sourceCollection and selectively add or remove
      criteria = newCriteria;
      filteredCollection.reset(sourceCollection.select(criteria));
    };

    filteredCollection.reset(sourceCollection.select(criteria));

    return filteredCollection;
  }
});