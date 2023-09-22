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
  puts "Creating artists..."

    rick_astley = Artist.create!({
      name: 'Rick Astley',
      bio: 'Richard Paul Astley (born 6 February 1966) is an English singer who has been active in music for several decades. He gained worldwide fame in the 1980s, having multiple hits, including his signature songs "Never Gonna Give You Up", "Together Forever" and "Whenever You Need Somebody".'
    })

    kanye = Artist.create!({
      name: 'Kanye West',
      bio: 'Ye (born Kanye Omari West,June 8, 1977),is an American rapper, singer, songwriter, record producer, and fashion designer. Born in Atlanta and raised in Chicago, West gained recognition as a producer for Roc-A-Fella Records in the early 2000s, producing singles for several prominent artists and developing a production style that heavily sampled old-school soul music.'
    })

  puts "Creating albums and songs..."

    never_gonna_give_you_up = Song.create!({
      title: "Never Gonna Give You Up",
      artist_id: rick_astley.id,
      year: 1987
    })
    
    dark_twisted_fantasy = Album.create!({
      title: 'Dark Twisted Fantasy',
      artist_id: kanye.id,
      year: 2010
    })

    dark_twisted_fantasy_tracklist = [
      ["Dark Fantasy",440 ]
      ["Gorgeous (feat. Kid Cudi, Raekwon)",557]
      ["POWER",452]
      ["All Of The Lights(Interlude)",102]
      ["All Of The Lights", 459]
      ["Monster (feat. JAY-Z, Rick Ross, Nicki Minaj, Bon Iver)", 618]
      ["So Appalled (feat.JAY-Z, Pusha T, CyHi, Swizz Beats, RZA)", 637]
      ["Devil In A New Dress (feat. Rick Ross)", 551]
      ["Runaway (feat. Pusha T)", 907]
      ["Hell Of A Life", 527]
      ["Blame Game (feat. John Legend)", 749]
      ["Lost In The World (feat. Bon Iver)", 416]
      ["Who Will Survive In America", 138]
    ]
    dark_twisted_fantasy_tracklist.each_with_index do |song, i|
      dark_twisted_fantasy_song = Song.create!({
        title: song[0],
        album_id: dark_twisted_fantasy.id,
        number: i + 1,
        length: song[1],
        year: dark_twisted_fantasy.year
      })
    end
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