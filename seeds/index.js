const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campgrounds')


main().catch(err => console.log(err));

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/yelp-camp");
    console.log("Connection open!");
};

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 15; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const random20=Math.floor(Math.random()*20)+5;
        const price=Math.floor(Math.random()*20)+10;
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            
            image:'https://source.unsplash.com/collection/483251',
            description:'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iusto cupiditate, aperiam, eius beatae impedit blanditiis aspernatur harum odio nemo fugiat corrupti delectus id eligendi tempore atque, quos illo optio temporibus.',
            price:price
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})