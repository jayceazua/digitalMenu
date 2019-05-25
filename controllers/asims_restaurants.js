
const Restaurant = require("../models/restaurant");
const User = require("../models/user");

function createRestaurant(user, restaurantData) {
    return new Promise(async (resolve, reject) => {
        const restaurant = new Restaurant(restaurantData);
        user.restaurants ? user.restaurants.push(restaurant) : user.restaurants = [restaurant];
        await restaurant.save();
        await user.save();
        // SendGrid.sendWebsiteRequestEmail(user);
        resolve(restaurant);
    });
};

function getRestaurants(userId) {
    return new Promise(async (resolve, reject) => {
        const restaurants = await User.findById(userId).populate('restaurants')
        restaurants ? 
        resolve(restaurants.restaurants)
        :
        reject('No Restaurants Found.');
    });
};

module.exports = {
    createRestaurant: createRestaurant,
    getRestaurants: getRestaurants 
};