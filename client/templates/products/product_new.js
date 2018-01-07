Template.productNew.onCreated(function() {
  Session.set('productNewErrors', {});
});

Template.productNew.helpers({
  errorMessage: function(field) {
    return Session.get('productNewErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('productNewErrors')[field] ? 'has-error' : '';
  }
});

Template.productNew.events({
  'submit form': function(e) {
    e.preventDefault();
    
    var product = {
      name: $(e.target).find('[name=name]').val(),
      price: $(e.target).find('[name=price]').val(),
      discription: $(e.target).find('[name=discription]').val()
    };
    
    var errors = validateProduct(product);
    if (errors.name || errors.price)
      return Session.set('productNewErrors', errors);
    
    Meteor.call('productInsert', product, function(error, result) {
      // display the error to the user and abort
      if (error)
        return throwError(error.reason);
      
      // show this result but route anyway
      if (result.productExists)
        throwError('This link has already been producted');
      
      Router.go('productPage', {_id: result._id});  
    });
  }
});