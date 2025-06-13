// program to generate random strings

// declare all characters
const characters = '0123456789';

const randomStr = (length) => {
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

const randomInt = ({ min = 0, max = 100 }) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

const randomAddress = () => {
    const data = [
        "International Commerce Centre, 1 Austin Road West, Kowloon",
        "The Center, 99 Queen's Road Central, Central",
        "Two International Finance Centre, 8 Finance Street, Central",
        "The Lee Garden One, 33 Hysan Avenue, Causeway Bay",
        "Cyberport 3, 100 Cyberport Road, Cyberport",
        "Lippo Centre Tower 1, 89 Queensway, Admiralty",
        "The Landmark, 15 Queen's Road Central, Central",
        "Cheung Kong Center, 2 Queen's Road Central, Central",
        "The Gateway, 25 Canton Road, Tsim Sha Tsui",
        "Times Square, 1 Matheson Street, Causeway Bay",
        "Hopewell Centre, 183 Queen's Road East, Wan Chai",
        "Pacific Place, 88 Queensway, Admiralty",
        "Bank of America Tower, 12 Harcourt Road, Central",
        "The Center, 99 Queen's Road Central, Central",
        "Exchange Square, 8 Connaught Place, Central",
        "The Hong Kong Club Building, 3A Chater Road, Central",
        "One Island East, 18 Westlands Road, Quarry Bay",
        "Jardine House, 1 Connaught Place, Central",
        "Lee Garden Two, 28 Yun Ping Road, Causeway Bay",
        "The Hong Kong Jockey Club Building, 1 Sports Road, Happy Valley"
    ]
    return data[Math.floor(Math.random() * (data.length - 1))]
}

const randomDescription = () => {
    let data = [
        "Our latest innovation is designed to keep up with your busy lifestyle.It is a smart device that combines sleek design with advanced features to make your life easier and more convenient than ever before.With its intuitive interface, you can stay connected, track your fitness, and never miss an important notification again.Whether you're running errands or working out, this device is the perfect companion for your active life.",
        "Say goodbye to bad hair days with our latest technology.Our hair care product is a game - changer that will revolutionize the way you style your hair.Designed to be the ultimate tool for achieving salon - quality results at home, it uses a powerful motor and advanced technology to dry your hair faster and with less heat damage than ever before.With its sleek design and easy - to - use interface, you'll be amazed at how quickly you can achieve the perfect look.",
        "Your skin deserves the best care possible, and that's why we've developed a line of products that are made with only the finest natural ingredients.Our latest line of organic skincare products is designed to nourish your skin and protect it from environmental stressors with our gentle, effective formulas.From cleansers to serums to moisturizers, each product is carefully crafted to work together to give you radiant, healthy - looking skin.",
        "The SuperCharge power bank is the ultimate solution to all your charging needs.With its high capacity and fast charging technology, you can keep your devices powered up on - the - go, no matter where life takes you.Whether you're traveling or just running errands, this power bank is the perfect companion for your mobile lifestyle.",
        "Good time in the kitchen with our latest powerful kitchen tool.The KitchenMate food processor is designed to help you prepare meals in no time, making cooking less time - consuming and exhausting.With its versatile attachments and powerful motor, you'll be able to create delicious meals in a snap. From chopping to pureeing to blending, this kitchen tool is a game-changer for busy home cooks.",
        "We believe that cleaning products should be tough on dirt and gentle on the environment.That's why we've developed a line of eco - friendly cleaning products that are not only effective but also safe for the environment.Our latest line of eco - friendly cleaning products is designed to leave your home cleaner and greener without compromising on effectiveness.",
        "Breathe easier with our latest innovation.The AirPurify air purifier is the perfect addition to any home or office.With its advanced filtration system, you can remove dust, allergens, and pollutants from the air, leaving you with clean, fresh air.Whether you're concerned about allergies or just want to improve the air quality in your home, this air purifier is a must-have.",
        "Our latest technology makes grooming easy and comfortable.Designed to provide a smooth, comfortable shave every time, our grooming product is the ultimate tool for men who want the best.With its advanced blade technology and ergonomic design, you'll enjoy a shave that is both precise and comfortable.",
        "We understand that pets are part of the family, and that's why we've developed a line of products that are specially designed to keep your furry friends healthy and happy.From food to toys to grooming supplies, we've got everything you need to give your pets the best care possible. Our latest line of pet products is made with only the highest quality ingredients to ensure your pets are happy and healthy.",
        "Improve your posture and productivity with our latest innovation.Sitting for long hours at a desk can have a negative impact on your posture and productivity.That's why our ConvertiDesk standing desk is the perfect solution for anyone who spends long hours sitting at a desk. With its adjustable height and easy-to-use design, you can easily switch between sitting and standing positions, so you can work comfortably and efficiently.",
        "Our latest line of travel accessories is designed to make your next trip more comfortable and convenient.From neck pillows to luggage organizers, we've got everything you need to stay comfortable and organized on the go. Whether you're traveling for business or pleasure, our travel accessories are the perfect companions for your journey.",
        "Outdoor cleaning can be a daunting task, but our latest technology makes it easy and efficient.The PowerClean pressure washer is the ultimate tool for outdoor cleaning.With its powerful motor and advanced spray technology, you can blast away dirt, grime, and stains from your driveway, patio, and more, leaving them looking new again.",
        "Take your yoga practice to the next level with our latest line of yoga gear.From mats to blocks to straps, we've got everything you need to support your body and mind during your practice. Our latest line of yoga gear is designed to help you take your practice to the next level, whether you're a beginner or an experienced practitioner.",
        "Our latest innovation is designed to help you swim with ease.The AquaFit swim goggles are the perfect accessory for any swimmer.With their comfortable fit and anti - fog lenses, you can swim with crystal - clear vision and no distractions.Whether you're swimming laps or just enjoying a day at the beach, these goggles are the perfect companion for your aquatic adventures.",
        "Our latest line of baby products is made with only the gentlest, most natural ingredients.From diapers to lotions to baby food, we've got everything you need to keep your little one happy and healthy. Our latest line of baby products is designed to provide the best care possible for your baby, so you can enjoy every moment with your little one.",
        "Our latest innovation is designed to help you enjoy movies, TV shows, and games in stunning detail.Home entertainment can be a great way to unwind after a long day, but it's important to have the right equipment. With its high-resolution display and built-in speakers, our latest innovation will make you feel like you're right in the action.",
        "Our latest line of outdoor gear is designed to help you get out and explore.From tents to backpacks to hiking boots, we've got everything you need for your next adventure. Whether you're camping, hiking, or just enjoying the great outdoors, our outdoor gear is the perfect companion for your adventures.",
        "Achieving a brighter, healthier smile doesn't have to be difficult. Our latest technology makes it easy and efficient. With its advanced sonic technology and gentle bristles, you'll be able to remove plaque and whiten your teeth in just a few minutes a day.Our latest technology is designed to help you achieve the perfect smile without any hassle.",
        "Your home should be a reflection of your personality and style.That's why we've developed a line of home decor that is designed to help you create a beautiful and inviting space.From rugs to curtains to wall art, we've got everything you need to transform your home. Our latest line of home decor is designed to help you create a space that is uniquely you.",
        "A good night's sleep is essential for your health and wellbeing. Our latest innovation is designed to help you sleep soundly and wake up feeling refreshed. With its advanced memory foam technology and breathable design, you'll be able to enjoy a good night's sleep every night. Our latest innovation is designed to provide you with the support and comfort you need for a restful night's sleep.",]
    return data[Math.floor(Math.random() * (data.length - 1))]

}

const randomName = () => {
    let data = [
        "BrightLife",
        "ClearView",
        "EliteChoice",
        "FreshStart",
        "HappyHome",
        "HealthyHabits",
        "LuxeLife",
        "PureChoice",
        "RadiantYou",
        "RefreshNow",
        "SerenityNow",
        "SimplyBetter",
        "SmartFit",
        "SparkleClean",
        "StrongBody",
        "SunnyDays",
        "ThriveWell",
        "TrueBalance",
        "VitalityNow",
        "ZenLife",]
    return data[Math.floor(Math.random() * (data.length - 1))]
}

const randomTitle = () => {
    let data = ["Golden Hour Highlighter",
        "Sweet Dreams Pillow Spray",
        "Ocean Breeze Room Diffuser",
        "Starry Night Eye Cream",
        "Forest Walk Body Scrub",
        "Morning Dew Facial Toner",
        "Sunset Serenade Lip Balm",
        "Sun-Kissed Bronzing Powder",
        "Blooming Flower Bath Bomb",
        "Desert Oasis Hand Cream",
        "Mountain Peak Body Lotion",
        "Lavender Dreams Sleep Spray",
        "Moonlit Meadow Body Butter",
        "Enchanted Garden Body Mist",
        "Oceanic Depths Body Wash",
        "Midnight Forest Candle",
        "Sunflower Fields Hair Mask",
        "Dewy Morning Moisturizer",
        "Cherry Blossom Bubble Bath",
        "Mountain Air Room Spray",
        "Rose Petal Lip Scrub",
        "Vanilla Bean Body Oil",
        "Berry Blast Lip Gloss",
        "Caramel Latte Hand Soap",
        "Coconut Milk Bath Soak",
        "Jasmine Tea Eye Serum",
        "Lemon Zest Body Scrub",
        "Peppermint Foot Cream",
        "Raspberry Sorbet Body Lotion",
        "Watermelon Lip Balm",]
    return data[Math.floor(Math.random() * (data.length - 1))]

}

const randomPeople = () => {
    const data = ["Elizabeth Johnson",
        "William Thompson",
        "Victoria Lee",
        "Benjamin Davis",
        "Katherine Brown",
        "Christopher Clark",
        "Olivia Wright",
        "Daniel Rodriguez",
        "Emily Martinez",
        "Matthew Wilson",
        "Sophia Anderson",
        "Michael Baker",
        "Isabella Lewis",
        "Alexander King",
        "Grace Garcia",
        "David Green",
        "Charlotte Adams",
        "James Carter",
        "Amelia Parker",
        "Joseph Flores",
        "Lucy Cooper",
        "Samuel Morris",
        "Lily Reed",
        "John Richardson",
        "Ava Bailey",
        "Henry Phillips",
        "Harper Campbell",
        "Andrew Rivera",
        "Chloe Flores",
        "Ethan Cooper",]
    return data[Math.floor(Math.random() * (data.length - 1))]

}
export { randomStr, randomInt, randomAddress, randomName, randomDescription, randomTitle, randomPeople }