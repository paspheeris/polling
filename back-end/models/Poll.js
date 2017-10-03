const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
// const slug = require('slugs');

const pollSchema = new mongoose.Schema({
  key: {
    type: String,
    required: 'Must have a key!'
  },
  author_id: String,
  question: {
    type: String,
    trim: true
  },
  allChoices: [String],
  votesByChoice: [{
    choiceName: String,
    count: Number
  }],
  participantsByIp: {
    type: [String],
    required: false
    // default: 'An IP must be provided!'
  },
  participantsById: [String],
});

//Define out indexes
// storeSchema.index({
//   name: 'text',
//   description: 'text'
// });

// storeSchema.index({ location: '2dsphere'});

// storeSchema.pre('save', async function(next) {
//   if (!this.isModified('name')) {
//     next(); //skip it
//     return; //stop this function from running
//   }
  
//   this.slug = slug(this.name);
//   //find other stores that have a slug of wes, wes-1, wes-2 etc
//   const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, 'i')
//   //this.constructor will be equal to store when the function runs; can't just use 'store' because it doesn't exist yet
//   const storesWithSlug = await this.constructor.find({ slug: slugRegEx });
//   if(storesWithSlug.length) {
//     this.slug = `${this.slug}-${storesWithSlug.length + 1}`;
//   }
  
//   next();
// });

// storeSchema.statics.getTagsList = function() {
//   //need a proper function here so that 'this' is bound to the store
//   return this.aggregate([
//     { $unwind: '$tags'},
//     { $group: {_id: '$tags', count: {$sum: 1}}},
//     { $sort: { count: -1} }
//   ]);
// }

// storeSchema.statics.getTopStores = function() {
//   //returning a promise here that will be used in the store controller
//   return this.aggregate([
//     //Lookup stores and populate their reviews
//     { $lookup: {
//       from: 'reviews', localField: '_id',
//       foreignField: 'store', as: 'reviews'}
//     },
//     //Filter for only items that have 2 or more reviews
//     { $match: { 'reviews.1': { $exists: true }}},
//     //Add the average reviews field
//     { $project: {
//       photo: '$$ROOT.photo',
//       name: '$$ROOT.name',
//       reviews: '$$ROOT.reviews',
//       slug: '$$ROOT.slug',
//       averageRating: { $avg: '$reviews.rating' }
//     }},
//     //Sort it by our new field, highest reviews first
//     { $sort: {averageRating: -1}},
//     //Limit to at most 10
//     { $limit: 10 }
//   ]);
// }

//find reviews where the store's _id property === review's store property
// storeSchema.virtual('reviews', {
//   ref: 'Review', //what model to link to Store
//   localField: '_id', //which field on the store?
//   foreignField: 'store' //which field on the review
// });

// function autopopulate(next) {
//   this.populate('reviews');
//   next();
// }

// storeSchema.pre('find', autopopulate);
// storeSchema.pre('findOne', autopopulate);

module.exports = mongoose.model('Poll', pollSchema);