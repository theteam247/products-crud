Template.productEdit.onCreated(function() {
  Session.set('productEditErrors', {});
});

Template.productEdit.helpers({
  errorMessage: function(field) {
    return Session.get('productEditErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('productEditErrors')[field] ? 'has-error' : '';
  }
});

Template.productEdit.events({
  'submit form': function(e) {
    e.preventDefault();
    var currentProductId = this._id;
    
    var productProperties = {
      name: $(e.target).find('[name=name]').val(),
      price: $(e.target).find('[name=price]').val(),
      discription: $(e.target).find('[name=discription]').val()
    }

    var errors = validateProduct(productProperties);
    if (errors.name || errors.price)
      return Session.set('productEditErrors', errors);
    
    Products.update(currentProductId, {$set: productProperties}, function(error) {
      if (error) {
        // display the error to the user
        alert(error.reason);
        throwError(error.reason);
      } else {
        Router.go('productPage', {_id: currentProductId});
      }
    });
  },
  
  'click .delete': function(e) {
    e.preventDefault();
    
    if (confirm("Delete this product?")) {
      var currentProductId = this._id;
      Products.remove(currentProductId);
      Router.go('/');
    }
  }
});
