# db/seeds.rb

ApplicationRecord.transaction do 
  puts "Destroying tables..."
  # Unnecessary if using `rails db:seed:replant`
  User.destroy_all

  puts "Resetting primary keys..."
  # For easy testing, so that after seeding, the first `User` has `id` of 1
  ApplicationRecord.connection.reset_pk_sequence!('users')

  puts "Creating users..."
  # Create one user with an easy to remember username, email, and password:
  User.create!(
    username: 'Demo-lition', 
    email: 'demo@user.io', 
    password: 'password'
  )
  require "open-uri"

  puts "Creating artists..."

    rick_astley = Artist.create!({
      name: 'Rick Astley',
      bio: 'Richard Paul Astley (born 6 February 1966) is an English singer who has been active in music for several decades. He gained worldwide fame in the 1980s, having multiple hits, including his signature songs "Never Gonna Give You Up", "Together Forever" and "Whenever You Need Somebody".'
    })
    rick_pic = URI.open("https://cloudify-seeds.s3.amazonaws.com/Rick_astley_profile_pic.webp")
    rick_astley.image.attach(io: rick_pic, filename: 'Rick_astley_profile_pic.webp')
     
    kanye = Artist.create!({
      name: 'Kanye West',
      bio: 'Ye (born Kanye Omari West,June 8, 1977),is an American rapper, singer, songwriter, record producer, and fashion designer. Born in Atlanta and raised in Chicago, West gained recognition as a producer for Roc-A-Fella Records in the early 2000s, producing singles for several prominent artists and developing a production style that heavily sampled old-school soul music.'
    })
    kanye_pic = URI.open("https://cloudify-seeds.s3.amazonaws.com/Kanye_west/Kanye_west_profile_pic.jpg")
    kanye.image.attach(io: kanye_pic, filename: 'Kanye_west_profile_pic.jpg')

  puts "Creating albums and songs..."
    
    dark_twisted_fantasy = Album.create!({
      name: 'Dark Twisted Fantasy',
      artist_id: kanye.id,
      year: 2010
    })
    dtf_image = URI.open("https://cloudify-seeds.s3.amazonaws.com/Kanye_west/dark_twisted_fantasy/Dark_twisted_fantasy_album_cover.jpg")
    dark_twisted_fantasy.image.attach(io: dtf_image, filename: 'Dark_twisted_fantasy_album_cover.jpg')
    dark_twisted_fantasy_tracklist = [
      ["Dark Fantasy",440, 'https://cloudify-seeds.s3.amazonaws.com/Kanye_west/dark_twisted_fantasy/Dark+Fantasy.mp3' ],
      ["Gorgeous (feat. Kid Cudi, Raekwon)", 557, 'https://cloudify-seeds.s3.amazonaws.com/Kanye_west/dark_twisted_fantasy/Gorgeous.mp3'],
      ["POWER",452, 'https://cloudify-seeds.s3.amazonaws.com/Kanye_west/dark_twisted_fantasy/POWER.mp3' ],
      ["All Of The Lights(Interlude)",102, 'https://cloudify-seeds.s3.amazonaws.com/Kanye_west/dark_twisted_fantasy/All+Of+The+Lights(Interlude).mp3'],
      ["All Of The Lights", 459, 'https://cloudify-seeds.s3.amazonaws.com/Kanye_west/dark_twisted_fantasy/All+Of+The+Lights.mp3'],
      ["Monster (feat. JAY-Z, Rick Ross, Nicki Minaj, Bon Iver)", 618, 'https://cloudify-seeds.s3.amazonaws.com/Kanye_west/dark_twisted_fantasy/Monster.mp3'],
      ["So Appalled (feat.JAY-Z, Pusha T, CyHi, Swizz Beats, RZA)", 637, 'https://cloudify-seeds.s3.amazonaws.com/Kanye_west/dark_twisted_fantasy/So+Appalled.mp3'],
      ["Devil In A New Dress (feat. Rick Ross)", 551,'https://cloudify-seeds.s3.amazonaws.com/Kanye_west/dark_twisted_fantasy/Devil+In+A+New+Dress.mp3'],
      ["Runaway (feat. Pusha T)", 907, 'https://cloudify-seeds.s3.amazonaws.com/Kanye_west/dark_twisted_fantasy/Runaway.mp3'],
      ["Hell Of A Life", 527, 'https://cloudify-seeds.s3.amazonaws.com/Kanye_west/dark_twisted_fantasy/Hell+Of+A+Life.mp3'],
      ["Blame Game (feat. John Legend)", 749, 'https://cloudify-seeds.s3.amazonaws.com/Kanye_west/dark_twisted_fantasy/Blame+Game.mp3'],
      ["Lost In The World (feat. Bon Iver)", 416, 'https://cloudify-seeds.s3.amazonaws.com/Kanye_west/dark_twisted_fantasy/Lost+In+The+World.mp3'],
      ["Who Will Survive In America", 138, 'https://cloudify-seeds.s3.amazonaws.com/Kanye_west/dark_twisted_fantasy/Who+Will+Survive+In+America.mp3']
    ]
    dark_twisted_fantasy_tracklist.each_with_index do |song, i|
      dark_twisted_fantasy_song = Song.create!({
        title: song[0],
        album_id: dark_twisted_fantasy.id,
        artist_id: kanye.id,
        # number: i + 1,
        # length: song[1],
        year: dark_twisted_fantasy.year
        })
        dtf_song_file = URI.open(song[2])
        dark_twisted_fantasy_song.file.attach(io: dtf_song_file, filename:'#{i+1}.mp3')
      end
      puts "DTF created"
      
      never_gonna_give_you_up = Song.create!({
      title: "Never Gonna Give You Up",
      artist_id: rick_astley.id,
      year: 1987
    })
    never_gonna_give_you_up.file.attach(
      io: URI.parse("https://cloudify-seeds.s3.amazonaws.com/Never_gonna_give_you_up_rick_astley.mp3").open,
      filename: "Never_gonna_give_you_up_rick_astley.mp3"
    )
  # More users
  # 10.times do 
  #   User.create!({
  #     username: Faker::Internet.unique.username(specifier: 3),
  #     email: Faker::Internet.unique.email,
  #     password: 'password'
  #   }) 
  # end

  puts "Done!"
end