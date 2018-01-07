if (Products.find().count() === 0) {
  Products.insert({
    name: '111',
    price: '12',
    description: '444'
  });

  Products.insert({
    name: '222',
    price: '20',
    description: '555'
  });

  Products.insert({
    name: '333',
    price: '30',
    description: '666'
  });
} 