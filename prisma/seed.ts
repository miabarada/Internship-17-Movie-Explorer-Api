import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  const action = await prisma.genre.upsert({ where: { name: 'Action' }, update: {}, create: { name: 'Action' } });
  const drama = await prisma.genre.upsert({ where: { name: 'Drama' }, update: {}, create: { name: 'Drama' } });
  const comedy = await prisma.genre.upsert({ where: { name: 'Comedy' }, update: {}, create: { name: 'Comedy' } });
  const scifi = await prisma.genre.upsert({ where: { name: 'Sci-Fi' }, update: {}, create: { name: 'Sci-Fi' } });
  const horror = await prisma.genre.upsert({ where: { name: 'Horror' }, update: {}, create: { name: 'Horror' } });
  const romance = await prisma.genre.upsert({ where: { name: 'Romance' }, update: {}, create: { name: 'Romance' } });
  const thriller = await prisma.genre.upsert({ where: { name: 'Thriller' }, update: {}, create: { name: 'Thriller' } });
  const crime = await prisma.genre.upsert({ where: { name: 'Crime' }, update: {}, create: { name: 'Crime' } });
  const fantasy = await prisma.genre.upsert({ where: { name: 'Fantasy' }, update: {}, create: { name: 'Fantasy' } });

  const inception = await prisma.movie.upsert({
    where: { title: 'Inception' }, update: {}, create: {
      title: 'Inception', year: 2010, rating: 9.2,
      description: 'A thief who steals corporate secrets through dream-sharing technology.',
      posterUrl: 'https://www.imdb.com/title/tt1375666/',
      genres: { connect: { id: scifi.id } },
    }
  });

  const goodWill = await prisma.movie.upsert({
    where: { title: 'Good Will Hunting' }, update: {}, create: {
      title: 'Good Will Hunting', year: 1997, rating: 9.6,
      description: 'A boy with undiscovered talent finds his path.',
      posterUrl: 'https://m.media-amazon.com/images/I/71pngoad06L.jpg',
      genres: { connect: { id: drama.id } },
    }
  });

  const darkKnight = await prisma.movie.upsert({
    where: { title: 'The Dark Knight' }, update: {}, create: {
      title: 'The Dark Knight', year: 2008, rating: 8.7,
      description: "Batman faces the Joker in a battle for Gotham's soul.",
      posterUrl: 'https://m.media-amazon.com/images/I/5151N2hUPiL._AC_UF894,1000_QL80_.jpg',
      genres: { connect: { id: action.id } },
    }
  });

  const interstellar = await prisma.movie.upsert({
    where: { title: 'Interstellar' }, update: {}, create: {
      title: 'Interstellar', year: 2014, rating: 9.0,
      description: 'A team of explorers travel through a wormhole in space.',
      posterUrl: 'https://www.amazon.com/JIONK-Interstellar-Movie-Poster-24X36/dp/B01EXZCD4S',
      genres: { connect: { id: scifi.id } },
    }
  });

  const titanic = await prisma.movie.upsert({
    where: { title: 'Titanic' }, update: {}, create: {
      title: 'Titanic', year: 1997, rating: 8.7,
      description: 'A love story unfolds aboard the ill-fated Titanic.',
      posterUrl: 'https://www.amazon.co.uk/Poster-affiche-TITANIC-Classic-Movie/dp/B07ZHPDX3S',
      genres: { connect: { id: romance.id } },
    }
  });

  const matrix = await prisma.movie.upsert({
    where: { title: 'The Matrix' }, update: {}, create: {
      title: 'The Matrix', year: 1999, rating: 7.8,
      description: 'A hacker discovers reality is a simulation.',
      posterUrl: 'https://www.aliexpress.com/item/1005005024943243.html',
      genres: { connect: { id: scifi.id } },
    }
  });

  const forrestGump = await prisma.movie.upsert({
    where: { title: 'Forrest Gump' }, update: {}, create: {
      title: 'Forrest Gump', year: 1994, rating: 8.3,
      description: 'The story of a man who influences historical events.',
      posterUrl: 'https://www.europosters.eu/forrest-gump-1994-v188689',
      genres: { connect: { id: drama.id } },
    }
  });

  const pulpFiction = await prisma.movie.upsert({
    where: { title: 'Pulp Fiction' }, update: {}, create: {
      title: 'Pulp Fiction', year: 1994, rating: 7.4,
      description: 'Interwoven stories of crime in Los Angeles.',
      posterUrl: 'https://www.europosters.ie/posters/pulp-fiction-cover-v1289?srsltid=AfmBOoocms_39Hd6aaHSpMcrPihoNeQmA0KD8f5eFDVrLfwOscMCke5Z',
      genres: { connect: { id: crime.id } },
    }
  });

  const shawshank = await prisma.movie.upsert({
    where: { title: 'The Shawshank Redemption' }, update: {}, create: {
      title: 'The Shawshank Redemption', year: 1994, rating: 8.1,
      description: 'Two imprisoned men bond over years.',
      posterUrl: 'https://www.amazon.co.uk/Shawshank-Redemption-Classic-Poster-Various/dp/B0100F9TJW',
      genres: { connect: { id: drama.id } },
    }
  });

  const fightClub = await prisma.movie.upsert({
    where: { title: 'Fight Club' }, update: {}, create: {
      title: 'Fight Club', year: 1999, rating: 9.2,
      description: 'An insomniac and a soap salesman form an underground club.',
      posterUrl: 'https://www.imdb.com/title/tt0137523/',
      genres: { connect: { id: drama.id } },
    }
  });

  const gladiator = await prisma.movie.upsert({
    where: { title: 'Gladiator' }, update: {}, create: {
      title: 'Gladiator', year: 2000, rating: 6.4,
      description: 'A Roman general seeks revenge.',
      posterUrl: 'https://www.ebay.co.uk/itm/364830629016',
      genres: { connect: { id: action.id } },
    }
  });

  const godfather = await prisma.movie.upsert({
    where: { title: 'The Godfather' }, update: {}, create: {
      title: 'The Godfather', year: 1972, rating: 7.4,
      description: 'The aging patriarch of an organized crime dynasty transfers control.',
      posterUrl: 'https://www.posterlounge.com/p/707663.html',
      genres: { connect: { id: crime.id } },
    }
  });

  const avatar = await prisma.movie.upsert({
    where: { title: 'Avatar' }, update: {}, create: {
      title: 'Avatar', year: 2009, rating: 7.1,
      description: 'A marine on an alien planet becomes torn between worlds.',
      posterUrl: 'https://www.ebay.com/itm/225037436194',
      genres: { connect: { id: scifi.id } },
    }
  });

  const lotr = await prisma.movie.upsert({
    where: { title: 'The Lord of the Rings' }, update: {}, create: {
      title: 'The Lord of the Rings', year: 2001, rating: 8.2,
      description: 'A hobbit sets out to destroy a powerful ring.',
      posterUrl: 'https://www.amazon.ca/RINGS-FELLOWSHIP-MOVIE-POSTER-ORIGINAL/dp/B008KPE6K2',
      genres: { connect: { id: fantasy.id } },
    }
  });

  const joker = await prisma.movie.upsert({
    where: { title: 'Joker' }, update: {}, create: {
      title: 'Joker', year: 2019, rating: 6.9,
      description: 'A troubled man descends into madness.',
      posterUrl: 'https://www.europosteri.hr/joker/?srsltid=AfmBOooJjQTU7qXclz37JyQliRwloMjUpD5RlId7N0EHWt16SZ7lEyvC',
      genres: { connect: { id: drama.id } },
    }
  });

  const whiplash = await prisma.movie.upsert({
    where: { title: 'Whiplash' }, update: {}, create: {
      title: 'Whiplash', year: 2014, rating: 7.4,
      description: 'A young drummer pursues greatness.',
      posterUrl: 'https://www.imdb.com/title/tt2582802/',
      genres: { connect: { id: drama.id } },
    }
  });

  const socialNetwork = await prisma.movie.upsert({
    where: { title: 'The Social Network' }, update: {}, create: {
      title: 'The Social Network', year: 2010, rating: 5.8,
      description: 'The founding of Facebook.',
      posterUrl: 'https://en.wikipedia.org/wiki/The_Social_Network',
      genres: { connect: { id: drama.id } },
    }
  });

  const parasite = await prisma.movie.upsert({
    where: { title: 'Parasite' }, update: {}, create: {
      title: 'Parasite', year: 2019, rating: 7.9,
      description: 'A poor family schemes to become employed by a wealthy family.',
      posterUrl: 'https://www.imdb.com/title/tt6751668/',
      genres: { connect: { id: thriller.id } },
    }
  });

  const silence = await prisma.movie.upsert({
    where: { title: 'The Silence of the Lambs' }, update: {}, create: {
      title: 'The Silence of the Lambs', year: 1991, rating: 9.1,
      description: 'An FBI trainee seeks help from a cannibalistic serial killer.',
      posterUrl: 'https://www.imdb.com/title/tt0102926/',
      genres: { connect: { id: thriller.id } },
    }
  });

  const topGun = await prisma.movie.upsert({
    where: { title: 'Top Gun' }, update: {}, create: {
      title: 'Top Gun', year: 1986, rating: 6.8,
      description: 'A young naval aviator trains to be a top pilot.',
      posterUrl: 'https://www.arthipo.com/topgun-movie-poster.html',
      genres: { connect: { id: action.id } },
    }
  });

  console.log('Seed successful!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });