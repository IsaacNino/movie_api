

const express = require('express'),
    morgan = require('morgan'),
    app = express(),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    uuid = require('uuid');

app.use(express.static('public'));
app.use(morgan('common'));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(methodOverride());

let users = [
  {
    id: 1,
    name: "Brian",
    favoriteMovies: []
  },
  {
    id: 2,
    name: "Victoria",
    favoriteMovies: ["Perfect Blue"]
  },
  {
    id: 3,
    name: "Cody",
    favoriteMovies: []
  },
];

let topMovies = [
  {
    "Title": 'The Iron Giant',
    "Description":'In this animated adaptation of Ted Hughes\' Cold War fable, a giant alien robot (Vin Diesel) crash-lands near the small town of Rockwell, Maine, in 1957. Exploring the area, a local 9-year-old boy, Hogarth, discovers the robot, and soon forms an unlikely friendship with him. When a paranoid government agent, Kent Mansley, becomes determined to destroy the robot, Hogarth and beatnik Dean McCoppin (Harry Connick Jr.) must do what they can to save the misunderstood machine.',
    "Genre": {
      "Name": 'Adventure',
      "Description": "Embark on a journey or quest, often in search of treasure, knowledge, or self-discovery. Get transported to exotic locations, witness action-packed sequences, and feel a sense of danger and excitement."
    },
    "Rating": 'PG',
    "Director": {
      "Name": "Brad Bird",
      "Bio": "Phillip Bradley \"Brad\" Bird is an American director, screenwriter, animator, producer and occasional voice actor, known for both animated and live-action films. On a tour of the Walt Disney Studios at age 11, he announced that someday he would become part of its animation team, and soon afterward began work on his own 15-minute animated short. Within two years, Bird had completed his animation, which impressed the cartoon company. By age 14, barely in high school, Bird was mentored by the animator Milt Kahl, one of Disney's legendary Nine Old Men. ",
      "Birth": "1957",
    },
    "ImageUrl":'https://en.wikipedia.org/wiki/File:The_Iron_Giant_poster.JPG',
    "Year": '1999',
  },
  {
    "Title": 'Hereditary',
    "Description":'When the matriarch of the Graham family passes away, her daughter and grandchildren begin to unravel cryptic and increasingly terrifying secrets about their ancestry, trying to outrun the sinister fate they have inherited.',
    "Genre": {
      "Name": 'Horror',
      "Description": "Evoking feelings of fear, dread, and terror in the audience. It typically includes themes such as the supernatural, the unknown, and the macabre, and often features suspenseful and terrifying elements, such as jump scares, gore, and graphic violence."
    },
    "Rating": 'R',
    "Director": {
      "Name": "Ari Aster",
      "Bio": "Ari Aster is an American film director, screenwriter, and producer. He is known for writing and directing the A24 horror films Hereditary (2018) and Midsommar (2019). Aster was born into a Jewish family in New York City on July 15, 1986, the son of a poet mother and musician father. He has a younger brother. He recalled going to see his first movie, Dick Tracy, when he was four years old. The film featured a scene where a character fired a Tommy gun in front of a wall of fire. Aster reportedly jumped from his seat and ran six New York City blocks while his mother tried to catch him. In his early childhood, Aster's family briefly lived in England, where his father opened a jazz nightclub in Chester. Aster enjoyed living there, but the family returned to the U.S. and settled in New Mexico when he was 10 years old.",
      "Birth": "1986",
    },
    "ImageUrl":'https://upload.wikimedia.org/wikipedia/en/d/d9/Hereditary.png',
    "Year": '2018',
  },
  {
    "Title": 'Jeepers Creepers',
    "Description":'A brother and sister driving home through isolated countryside for spring break encounter a flesh-eating creature which is in the midst of its ritualistic eating spree.',
    "Genre": {
      "Name": 'Horror',
      "Description": "Evoking feelings of fear, dread, and terror in the audience. It typically includes themes such as the supernatural, the unknown, and the macabre, and often features suspenseful and terrifying elements, such as jump scares, gore, and graphic violence."
    },
    "Rating": 'R',
    "Director": {
      "Name": "Victor Salva",
      "Bio": "Born in Martinez, California, 20 miles outside San Francisco, Victor Salva had written and directed over 20 short and feature-length films before graduating from high school. In the mid-'80s his 37-minute short Something in the Basement (1986) took first place in the fiction category at the Sony/AFI Home Video Competition. A horror allegory about a young boy awaiting his brother's return from a bloody war, this highly acclaimed short went on to win several national awards (including a Bronze Plaque at the Chicago International Film festival) and brought Salva to the attention of Francis Ford Coppola. Coppola then produced Salva's first theatrical feature, Clownhouse (1989), which Salva again wrote and directed. Using the talented cast of his award-winning short, Salva called the film \"a campfire story.\"",
      "Birth": "1958",
    },
    "ImageUrl":'https://en.wikipedia.org/wiki/File:Jeepers_Creepers_(2001_film)_poster.jpg',
    "Year": '2001',
  },
  {
    "Title": 'Demon Slayer: Mugen Train',
    "Description":'Tanjiro Kamado, his younger sister Nezuko, and his friends Zenitsu Agatsuma and Inosuke Hashibira board the Mugen Train to assist the Flame Hashira Kyojuro Rengoku in his mission to hunt for a demon that has caused forty people to go missing.',
    "Genre":
      { "Name": 'Anime',
        "Description": "Originating in Japan, Anime is characterized by colorful graphics, vibrant characters, and fantastic themes. Anime is often associated with manga, a Japanese comic book or graphic novel."
      },
    "Rating": 'R',
    "Director": {
      "Name": "Haruo Sotozaki",
      "Bio": "Haruo Sotozaki is known for Demon Slayer the Movie: Mugen Train (2020), Demon Slayer: Kimetsu no Yaiba (2019) and Cowboy Bebop: The Movie (2001).",
      "Birth": "Unknown",
    },
    "ImageUrl":'https://en.wikipedia.org/wiki/File:Kimetsu_no_Yaiba_Mugen_Ressha_Hen_Poster.jpg',
    year: '2021',
  },
  {
    "Title": 'Jay and Silent Bob Strike Back',
    "Description":'When Jay and Silent Bob learn that a "Bluntman and Chronic" movie is being made featuring their comic book counterparts, they drool at the thought of fat movie checks rolling in. But when the pair find that there won\'t be any royalties coming their way, they set out to sabotage the flick at all costs.',
    "Genre": {
        "Name": "Comedy",
        "Description": "A fun and enjoyable escape from everyday life. Often including themes such as humor, parody, and satire, and often features slapstick, physical comedy, and/or witty dialogue."
      },
    "Rating": 'R',
    "Director": {
      "Name": "Kevin Smith",
      "Bio": "Kevin Patrick Smith is an American filmmaker, actor, comedian, comic book writer, author, YouTuber, and podcaster. He came to prominence with the low-budget comedy buddy film Clerks (1994), which he wrote, directed, co-produced, and acted in as the character Silent Bob of stoner duo Jay and Silent Bob, characters who also appeared in Smith's later films Mallrats (1995), Chasing Amy (1997), Dogma (1999), Jay and Silent Bob Strike Back (2001), Clerks II (2006), Jay and Silent Bob Reboot (2019), and Clerks III (2022) which are set primarily in his home state of New Jersey. ",
      "Birth": "1970",
    },
    "ImageUrl":'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFGihbc36pR09tluBIB16bCYkIXPGzlhBpVhF9iOiLMqQYfS4h',
    "Year": '2001',
  },
  {
    "Title": 'Puss in Boots: The Last Wish',
    "Description":'Puss in Boots discovers that his passion for adventure has taken its toll when he learns that he has burnt through eight of his nine lives. Puss sets out on an epic journey to find the mythical Last Wish and restore his nine lives.',
    "Genre": {
      "Name": 'Adventure',
      "Description": "Embark on a journey or quest, often in search of treasure, knowledge, or self-discovery. Get transported to exotic locations, witness action-packed sequences, and feel a sense of danger and excitement."
    },
    "Rating": 'PG',
    "Director": {
      "Name": "Joel Crawford",
      "Bio": "In 2006, Joel Crawford joined DreamWorks Animation, where he served as a story artist on Shrek Forever After, Rise of the Guardians, the Kung Fu Panda trilogy, and Bee Movie.[1] In October 2017, Crawford signed on to direct The Croods: A New Age, replacing both Kirk DeMicco and Chris Sanders as director. In November 2017, Crawford directed Trolls Holiday, a half-hour Christmas-themed spinoff of the 2016 film Trolls. In March 2021, Crawford replaced Bob Persichetti as director of the 2022 film Puss in Boots: The Last Wish.",
      "Birth": "Unknown",
    },
    "ImageUrl":'https://en.wikipedia.org/wiki/File:Puss_in_Boots_The_Last_Wish_poster.jpg',
    "Year": '2022',
  },
  {
    "Title": '3000 Miles to Graceland',
    "Description":'It\'s International Elvis Week in Las Vegas, where the strip is flooded by a sea of King wannabes decked out in jumpsuits and sideburns. But five of the impersonators swaggering into the Riviera Hotel are toting heavy weaponry in their guitar cases. It\'s the heist of a lifetime, orchestrated by ex-con Michael (Kurt Russell) and his cunning former cellmate, Murphy (Kevin Costner). The crooked Elvises steal away with $3.2 million, leaving the hotel in ruins and a high body count in their wake.',
    "Genre": {
      "Name": "Action",
      "Description": "Strap in for high-speed chases, explosions, and fight scenes, that are both thrilling and intense. Oggle at strong and charismatic protagonists who are skilled in combat and able to overcome seemingly insurmountable obstacles."
    },
    "Rating": 'R',
    "Director": {
      "Name": "Damian Lichtenstein",
      "Bio": "Demian has amassed a vast body of work in the music video industry since receiving his BFA from New York University in 1988, leading to his current status as a major up-and-comer in Feature Film Direction. Some past projects include directing Music Videos for Sting & Eric Clapton, Grandmaster Caz, Shabba Ranks, Queen Latifah, West of Eden (Best Independent Video/MTV 1987), Cypress Hill, Gloria Estefan, Sony, Warner Bros, Columbia Pictures, MCA, Epic, Island, Atlantic, Tommy Boy, IRS Records, World Hunger Project, and the Multiple Sclerosis Society. Demian was Chairman of the New York Independent Film Coalition for two years, and has directed, produced, written, photographed, taped and/or recorded audio on over 225 features, short films, music videos, commercials and concerts.",
      "Birth": "Unknown",
    },
    "ImageUrl":'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRy5iFAq4PO8wwP8TCU9tSnROw8ItRZHiqQ3xMMke7JDkJqhq1v',
    "Year": '2001',
  },
  {
    "Title": 'Perfect Blue',
    "Description":'A singer quits her band to become an actress and sheds her "good girl" image to further her career.',
    "Genre": { 
      "Name": "Thriller",
      "Description": "Create tension and suspense, and get familiar with the edge of your seat. Enjoy suspenseful and exciting elements, such as a fast-paced plot, unexpected twists, and intense action sequences."
    },
    "Rating": 'R',
    "Director": {
      "Name": "Satoshi Kon",
      "Bio": "Satoshi Kon was born in 1963. He studied at the Musashino College of the Arts. He began his career as a Manga artist. He then moved to animation and worked as a background artist on many films (including Roujin Z (1991) by 'Katsuhiro Otomo'). Then, in 1995, he wrote an episode of the anthology film Memories (1995) (this Episode was \"Magnetic Rose\"). In 1997, he directed his first feature film: the excellent Perfect Blue (1997). In 2001, he finished work on his second feature film, Millennium Actress (2001) (aka Millennium Actress).",
      "Birth": "1963",
    },
    "ImageUrl":'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8c6mJdQLbkEWaAy4jM-Tx1aRWUJ8MhsyAV-f_hMsvDwguw2gF',
    "Year": '1997',
  },
  {
    "Title": 'Pearl',
    "Description":'In 1918 during the influenza pandemic, Pearl is a young woman living with her German immigrant parents on their Texas homestead while her husband, Howard, serves in World War I. Pearl\'s father is infirm and paralyzed, and her domineering mother, Ruth, insists that she help care for both him and the farm. Pearl, longing for a more exciting life, is captivated by the films she sees at the local cinema and aspires to become a chorus girl, much to Ruth\'s disapproval. However, Pearl also shows signs of being a disturbed individual.',
    "Genre": {
      "Name": 'Horror',
      "Description": "Evoking feelings of fear, dread, and terror in the audience. It typically includes themes such as the supernatural, the unknown, and the macabre, and often features suspenseful and terrifying elements, such as jump scares, gore, and graphic violence."
    },
    "Rating": 'R',
    "Director": {
      "Name": "Ti West",
      "Bio": "Ti West is most notable for directing horror films, as well as being an actor, writer, producer, and editor. Ti broke out, after directing various projects, in 2009, when he directed two feature films - 2009's The House Of The Devil and Cabin Fever 2: Spring Fever. Ti later directed, with his production company Glass Eye Pix, the widely popular 2011 horror film The Innkeepers, which starred actors Sara Paxton, Pat Healy and Kelly McGillis. Ti also starred as \"Tariq\" in Adam Wingard and Simon Barrett's horror film, You're Next (2011). More recently he has been a director for MTV's Scream and Fox's The Exorcist. His acting roles include him portraying \"Dave\" in Joe Swanberg's rom-com, Drinking Buddies (2013) and a cameo as \"Favorite Teacher\" in The House Of The Devil.",
      "Birth": "1980",
    },
    "ImageUrl":'https://upload.wikimedia.org/wikipedia/en/5/5b/Pearl_theatricalposter.jpg',
    "Year": '2022',
  },
  {
    "Title": 'Isle of Dogs',
    "Description":'When, by executive decree, all the canine pets of Megasaki City are exiled to a vast garbage-dump called Trash Island, 12-year-old Atari sets off alone in a miniature Junior-Turbo Prop and flies across the river in search of his bodyguard-dog, Spots. There, with the assistance of a pack of newly-found mongrel friends, he begins an epic journey that will decide the fate and future of the entire Prefecture.',
    "Genre": {
      "Name": 'Adventure',
      "Description": "Embark on a journey or quest, often in search of treasure, knowledge, or self-discovery. Get transported to exotic locations, witness action-packed sequences, and feel a sense of danger and excitement."
    },
    "Rating": 'PG-13',
    "Director": {
      "Name": "Wes Anderson",
      "Bio": "Wesley Wales Anderson was born in Houston, Texas. His mother, Texas Ann (Burroughs), is an archaeologist turned real estate agent, and his father, Melver Leonard Anderson, worked in advertising and PR. He has two brothers, Eric and Mel. Anderson's parents divorced when he was a young child, an event that he described as the most crucial event of his brothers and his growing up. During childhood, Anderson also began writing plays and making super-8 movies. ",
      "Birth": "1969",
    },
    "ImageUrl":'https://upload.wikimedia.org/wikipedia/en/2/23/IsleOfDogsFirstLook.jpg',
    "Year": '2018',
  }
];

//Create (POST) Data
app.post('/users' , (req, res) => { //creates a new user
  const newUser = req.body; //gets the data from the request body

  if (newUser.name) { //if the user has a name
    newUser.id = uuid.v4(); //assign a unique ID to the user
    users.push(newUser); //add the user to the array
    res.status(201).json(newUser); //return the user as JSON

  } else {
    res.status(400).send('User must have a name!'); //return an error
  }
});

//Update (PUT) Data
app.put('/users/:id' , (req, res) => { //creates a new user
  const { id } = req.params; //object destructuring to get the id from the request
  const updatedUser = req.body; //gets the data from the request body

  let user = users.find( user => user.id == id ); //finds the user with the id that matches the request
  
  if (user) { //if the user exists
    user.name = updatedUser.name; //update the user's name
    res.status(200).json(user); //return the user as JSON
  } else { //if the user doesn't exist
    res.status(400).send('User not found!'); //return an error
  }
});

//Create (POST) Data
app.post('/users/:id/:movieTitle', (req, res) => { //adds a movie to a user's favorites
  const { id, movieTitle } = req.params; //object destructuring to get the id from the request

  let user = users.find( user => user.id == id ); //finds the user with the id that matches the request
  
  if (user) { //if the user exists
    user.favoriteMovies.push(movieTitle); //add the movie to the user's favorite movies
    res.status(200).send(`${movieTitle} added to user ${id}'s favorites!`); //return a success message
  } else { //if the user doesn't exist
    res.status(400).send('User not found!'); //return an error
  }
});

//Delete (DELETE) Data
app.delete('/users/:id/:movieTitle', (req, res) => { //adds a movie to a user's favorites
  const { id, movieTitle } = req.params; //object destructuring to get the id from the request

  let user = users.find( user => user.id == id ); //finds the user with the id that matches the request
  
  if (user) { //if the user exists
    user.favoriteMovies = user.favoriteMovies.filter( title => title !== movieTitle ); //remove the movie from the user's favorite movies
    res.status(200).send(`${movieTitle} has been removed from user ${id}'s favorites!`); //return a success message
  } else { //if the user doesn't exist
    res.status(400).send('User not found!'); //return an error
  }
});

//Delete (DELETE) Data
app.delete('/users/:id', (req, res) => { // deletes a user
  const { id } = req.params; // object destructuring to get the id from the request

  let user = users.find( user => user.id !== id ); // filters the user with the id that matches the request

  if (user) { // if the user exists
    user.favoriteMovies = user.favoriteMovies.filter( title => title != movieTitle ); // remove the movie from the user's favorite movies
    res.status(200).send(`User ${id} has been deleted!`); // return a success message
  } else { //  if the user doesn't exist
    res.status(400).send('User not found!'); // return an error
  }
});

//Read (GET) Request
app.get('/topMovies', (req, res) => { //reuests data for all movies
    res.status(200).json(topMovies); //returns data as JSON
});

//Read (GET) Request
app.get('/topMovies/:title', (req, res) => { //reuests data for a specific movies
  const { title } = req.params; //object destructuring to get the title from the request
  const topMovie = topMovies.find( topMovie => topMovie.title === title ); //finds the movie with the title that matches the request

  if (topMovie) { //if the movie exists
    res.status(200).json(topMovie); //return the movie as JSON
  } else { //if the movie doesn't exist
    res.status(400).send('Movie not found!'); //return an error
  }
});

//Read (GET) Request
app.get('/topMovies/genre/:genreName', (req, res) => { // requests data for a specific genre
  const { genreName } = req.params; // object destructuring to get the genre name from the request
  const genre = topMovies.find( topMovie => topMovie.Genre.Name === genreName ).Genre; // finds the genre with the name that matches the request

  if (genre) { // if the genre exists
    res.status(200).json(genre); // return the genre as JSON
  } else { // if the genre doesn't exist
    res.status(400).send('Genre not found!'); // return an error
  }
});

//Read (GET) Request
app.get('/topMovies/directors/:directorName', (req, res) => { // requests data for a specific director
  const { directorName } = req.params; // object destructuring to get the director name from the request
  const director = topMovies.find( topMovie => topMovie.Director.Name === directorName ).Director; // finds the director with the name that matches the request

  if (director) { // if the director exists
    res.status(200).json(director); // return the director as JSON
  } else { // if the director doesn't exist
    res.status(400).send('Director not found!'); // return an error
  }
});

//Read (GET) Request
app.get('/documentation', (req, res) => {                  
  res.sendFile('public/documentation.html', { root: __dirname });
});

app.get('/movies', (req, res) => {
  res.json(topMovies);
});

//error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something\'s not quite right!');
});

// listen for requests
app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});