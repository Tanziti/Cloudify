# db/seeds.rb
  require "open-uri"
ApplicationRecord.transaction do 
  puts "Destroying tables..."
  # Unnecessary if using `rails db:seed:replant`
  User.destroy_all
  Artist.destroy_all
  Album.destroy_all
  Song.destroy_all
  puts "Resetting primary keys..."
  # For easy testing, so that after seeding, the first `User` has `id` of 1
  ApplicationRecord.connection.reset_pk_sequence!('users')
  ApplicationRecord.connection.reset_pk_sequence!('artists')
  ApplicationRecord.connection.reset_pk_sequence!('albums')
  ApplicationRecord.connection.reset_pk_sequence!('songs')
end
  puts "Creating users..."
  # Create one user with an easy to remember username, email, and password:
  User.create!(
    username: 'Demo-lition', 
    email: 'demo@user.io', 
    password: 'password'
  )


  puts "Creating artists..."

    # rick_astley = Artist.create!({
    #   name: 'Rick Astley',
    #   bio: 'Richard Paul Astley (born 6 February 1966) is an English singer who has been active in music for several decades. He gained worldwide fame in the 1980s, having multiple hits, including his signature songs "Never Gonna Give You Up", "Together Forever" and "Whenever You Need Somebody".'
    # })
    # rick_pic = URI.open("https://cloudify-seeds.s3.amazonaws.com/Rick_astley_profile_pic.webp")
    # rick_astley.image.attach(io: rick_pic, filename: 'Rick_astley_profile_pic.webp')
     
    kanye = Artist.create!({
      name: 'Kanye West',
      bio: 'Ye (born Kanye Omari West,June 8, 1977),is an American rapper, singer, songwriter, record producer, and fashion designer. Born in Atlanta and raised in Chicago, West gained recognition as a producer for Roc-A-Fella Records in the early 2000s, producing singles for several prominent artists and developing a production style that heavily sampled old-school soul music.'
    })
    kanye_pic = URI.open("https://cloudify-seeds.s3.amazonaws.com/Kanye_west/Kanye_west_profile_pic.jpg")
    kanye.image.attach(io: kanye_pic, filename: 'Kanye_west_profile_pic.jpg')
      
    flatbush_zombies = Artist.create!({
      name: 'Flatbush Zombies',
      bio: 'The Glorius Dead. Zombies, in Flatbush.'
    })
    zombie_pic = URI.open("https://cloudify-seeds.s3.amazonaws.com/Flatbush_zombies/flatbush_zombies_pic.webp")
    flatbush_zombies.image.attach(io: zombie_pic, filename: 'flatbush_zombies_pic.webp')

    injury_reserve = Artist.create!({
      name:"Injury Reserve",
      bio: "Best Group out of Arizona, RIP Groggs"
    })

    injury_reserve_pic = URI.open("https://cloudify-seeds.s3.amazonaws.com/Injury_reserve/Injury_reserve.webp")
    injury_reserve.image.attach(io: injury_reserve_pic, filename: 'Injury_reserve.webp')

  puts "Creating albums and songs..."

  live_from_the_dentist_office = Album.create!({
    name: 'Live from the Dentist Office',
    artist_id: injury_reserve.id, # Replace 'artist' with the actual artist object
    year: 2015 # Replace with the actual year
  })
  live_from_the_dentist_office_image = URI.open("https://cloudify-seeds.s3.amazonaws.com/Injury_reserve/Live_from_the_dentist_office/Live_from_the_dentist_office_cover.jpg")
  live_from_the_dentist_office.image.attach(io:  live_from_the_dentist_office_image, filename: 'Live_from_the_dentist_office_cover.jpg')
  # Define the tracklist for "Live from the Dentist Office" with data from the provided link
  live_from_the_dentist_office_tracklist = [
    ["Yo", 158, 'https://cloudify-seeds.s3.amazonaws.com/Injury_reserve/Live_from_the_dentist_office/Yo.mp3'],
    ["Whatever Dude", 164, 'https://cloudify-seeds.s3.amazonaws.com/Injury_reserve/Live_from_the_dentist_office/Whatever+Dude.mp3'],
    ["Snowmen (feat. Glasspopcorn)", 192, 'https://cloudify-seeds.s3.amazonaws.com/Injury_reserve/Live_from_the_dentist_office/Snowmen+feat.+Glasspopcorn.mp3'],
    ["Wow", 131, 'https://cloudify-seeds.s3.amazonaws.com/Injury_reserve/Live_from_the_dentist_office/Wow.mp3'],
    ["Everybody Knows", 215, 'https://cloudify-seeds.s3.amazonaws.com/Injury_reserve/Live_from_the_dentist_office/Everybody+Knows.mp3'],
    ["Friday (feat.Curtis Williams)", 219, 'https://cloudify-seeds.s3.amazonaws.com/Injury_reserve/Live_from_the_dentist_office/Friday+feat.+Curtis+Williams.mp3'],
    ["45 (feat. Demi Hughes)", 191, 'https://cloudify-seeds.s3.amazonaws.com/Injury_reserve/Live_from_the_dentist_office/45+feat.+Demi+Hughes.mp3'],
    ["Washed Up", 164, 'https://cloudify-seeds.s3.amazonaws.com/Injury_reserve/Live_from_the_dentist_office/Washed+Up.mp3'],
    ["Whiplash (feat.Chuck Inglish)", 216, 'https://cloudify-seeds.s3.amazonaws.com/Injury_reserve/Live_from_the_dentist_office/Whiplash+feat.+Chuck+Inglish.mp3'],
    ["ttktv", 173, 'https://cloudify-seeds.s3.amazonaws.com/Injury_reserve/Live_from_the_dentist_office/ttktv.mp3'],
    ["Falling", 194, 'https://cloudify-seeds.s3.amazonaws.com/Injury_reserve/Live_from_the_dentist_office/Falling.mp3']
  ]
  
  live_from_the_dentist_office_tracklist.each_with_index do |song, i|
    live_from_the_dentist_office_song = Song.create!({
      title: song[0],
      album_id: live_from_the_dentist_office.id,
      artist_id:  injury_reserve.id, # Replace 'artist' with the actual artist object
      year: live_from_the_dentist_office.year, # Replace with the actual year
    
    })
  
    live_from_the_dentist_office_song_file = URI.open(song[2])
    live_from_the_dentist_office_song.file.attach(io: live_from_the_dentist_office_song_file, filename: "#{i+1}.mp3")
  end

  floss = Album.create!({
    name: 'Floss',
    artist_id:  injury_reserve.id, # Replace 'artist' with the actual artist object
    year: 2016 # Replace with the actual year
  })
  floss_image = URI.open("https://cloudify-seeds.s3.amazonaws.com/Injury_reserve/Floss/Floss_cover.jpg")
   floss.image.attach(io: floss_image, filename: 'Floss_cover.jpg')
  # Define the tracklist for "Live from the Dentist Office" with data from the provided link
  floss_tracklist = [
    ["Oh Shit!!!", 191, 'https://cloudify-seeds.s3.amazonaws.com/Injury_reserve/Floss/Oh+Shit.mp3'],
    ["Bad Boys 3", 194, 'https://cloudify-seeds.s3.amazonaws.com/Injury_reserve/Floss/Bad+Boys+3.mp3'],
    ["ALL THIS MONEY", 164, 'https://cloudify-seeds.s3.amazonaws.com/Injury_reserve/Floss/ALL+THIS+MONEY.mp3'],
    ["What's Goodie (feat. Cakes da Killa)", 229, 'https://cloudify-seeds.s3.amazonaws.com/Injury_reserve/Floss/What+s+Goodie+feat.+Cakes+da+Killa.mp3'],
    ["2016 Interlude", 192, 'https://cloudify-seeds.s3.amazonaws.com/Injury_reserve/Floss/2016+Interlude.mp3'],
    ["S on Ya Chest", 219, 'https://cloudify-seeds.s3.amazonaws.com/Injury_reserve/Floss/S+on+Ya+Chest.mp3'],
    ["All Quiet on the West Side", 131, 'https://genius.com/Injury-reserve-all-quiet-on-the-west-side-lyrics'],
    ["Girl With the Gold Wrist", 216, 'https://cloudify-seeds.s3.amazonaws.com/Injury_reserve/Floss/Girl+With+the+Gold+Wrist.mp3'],
    ["Eeny Meeny Miny Moe", 158, 'https://cloudify-seeds.s3.amazonaws.com/Injury_reserve/Floss/Eeny+Meeny+Miny+Moe.mp3'],
    ["Keep on Slippin (feat. Vic Mensa)", 164, 'https://cloudify-seeds.s3.amazonaws.com/Injury_reserve/Floss/Keep+on+Slippin+feat.+Vic+Mensa.mp3'],
    ["Back Then", 215, 'https://cloudify-seeds.s3.amazonaws.com/Injury_reserve/Floss/Back+Then.mp3'],
    ["Look Mama I Did It", 129, 'https://cloudify-seeds.s3.amazonaws.com/Injury_reserve/Floss/Look+Mama+I+Did+It.mp3']
  ]
  
  floss_tracklist.each_with_index do |song, i|
   floss_song = Song.create!({
      title: song[0],
      album_id: floss.id,
      artist_id: injury_reserve.id, # Replace 'artist' with the actual artist object
      year: floss.year, # Replace with the actual year
     
    })
  
    # Attach the song URL as additional information
    # floss_song.image.attach(io: floss_image, filename: 'Floss_cover.jpg')
   floss_song_file = URI.open(song[2])
    floss_song.file.attach(io: floss_song_file, filename: "#{i+1}.mp3")
  end

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
        # dark_twisted_fantasy_song.image.attach(io: dtf_image, filename: 'Dark_twisted_fantasy_album_cover.jpg')
        dtf_song_file = URI.open(song[2])
        dark_twisted_fantasy_song.file.attach(io: dtf_song_file, filename: "#{i+1}.mp3")
      end
      puts "DTF created"
      better_off_dead = Album.create!({
        name: 'BetterOffDEAD',
        artist_id: flatbush_zombies.id, # Assuming flatbush_zombies is the artist.
        year: 2013
      })
      
      # Attach the album cover image
      bof_image = URI.open("https://cloudify-seeds.s3.amazonaws.com/Flatbush_zombies/Betteroffdead/flatbush-zombies-betteroffdead-Cover-Art.jpg")
      better_off_dead.image.attach(io: bof_image, filename: 'BetterOffDEAD_album_cover.jpg')
      puts "better off dead image attached"
      # Define the tracklist for BetterOffDEAD
      better_off_dead_tracklist = [
        ["Amerikkkan Pie", 440, 'https://cloudify-seeds.s3.amazonaws.com/Flatbush_zombies/Betteroffdead/Amerikkkan+Pie.mp3'],
        ["Nephilim", 557, 'https://cloudify-seeds.s3.amazonaws.com/Flatbush_zombies/Betteroffdead/Nephilim.mp3'],
        ["Bliss", 452, 'https://cloudify-seeds.s3.amazonaws.com/Flatbush_zombies/Betteroffdead/Bliss.mp3'],
        ["Minephuck", 102, 'https://cloudify-seeds.s3.amazonaws.com/Flatbush_zombies/Betteroffdead/Minephuck.mp3'],
        ["MRAZ", 618, 'https://cloudify-seeds.s3.amazonaws.com/Flatbush_zombies/Betteroffdead/MRAZ.mp3'],
        ["Death", 637, 'https://cloudify-seeds.s3.amazonaws.com/Flatbush_zombies/Betteroffdead/Death.mp3'],
        ["Death 2", 206, 'https://cloudify-seeds.s3.amazonaws.com/Flatbush_zombies/Betteroffdead/Death+2.mp3'],
        ["Regular and Complex (GNB)", 551, 'https://cloudify-seeds.s3.amazonaws.com/Flatbush_zombies/Betteroffdead/Regular+and+Complex+GNB.mp3'],
        ['Drug Parade', 420, 'https://cloudify-seeds.s3.amazonaws.com/Flatbush_zombies/Betteroffdead/Drug+Parade+Feat.+Danny+Brown.mp3'],
        ["Thugnificense", 907, 'https://cloudify-seeds.s3.amazonaws.com/Flatbush_zombies/Betteroffdead/Thugnificense.mp3'],
        ["Club Soda (feat. Action Bronson)", 527, 'https://cloudify-seeds.s3.amazonaws.com/Flatbush_zombies/Betteroffdead/Club+Soda+ft.+Action+Bronson.mp3'],
        ["222", 320, 'https://cloudify-seeds.s3.amazonaws.com/Flatbush_zombies/Betteroffdead/Flatbush+Zombies+222.mp3'],
        ["GOD Blessed the DEAD", 201, 'https://cloudify-seeds.s3.amazonaws.com/Flatbush_zombies/Betteroffdead/GOD+Blessed+The+DEAD.mp3'],
        ["My Team, Supreme", 302, 'https://cloudify-seeds.s3.amazonaws.com/Flatbush_zombies/Betteroffdead/My+Team+Supreme.mp3'],
        ["The Results Are In", 342, 'https://cloudify-seeds.s3.amazonaws.com/Flatbush_zombies/Betteroffdead/The+Results+Are+In.mp3'],
        ["Thugnificense", 411, 'https://cloudify-seeds.s3.amazonaws.com/Flatbush_zombies/Betteroffdead/Thugnificense.mp3'],
        ["LiveFromHell", 749, 'https://cloudify-seeds.s3.amazonaws.com/Flatbush_zombies/Betteroffdead/LiveFromHell.mp3'],
        ["Palm Trees", 416, 'https://cloudify-seeds.s3.amazonaws.com/Flatbush_zombies/Betteroffdead/Palm+Trees.mp3'],
        ["TP4", 351, 'https://cloudify-seeds.s3.amazonaws.com/Flatbush_zombies/Betteroffdead/TP4.mp3']
      ]
      puts "BoD tracklist defined"
      better_off_dead_tracklist.each_with_index do |song, i|
        better_off_dead_song = Song.create!({
          title: song[0],
          album_id: better_off_dead.id,
          artist_id: flatbush_zombies.id, # Assuming flatbush_zombies is the artist.
          year: better_off_dead.year
        })
        
        # Attach the song file
        # better_off_dead_song.image.attach(io: bof_image, filename: 'BetterOffDEAD_album_cover.jpg')
        bof_song_file = URI.open(song[2])
        better_off_dead_song.file.attach(io: bof_song_file, filename: "#{i + 1}.mp3")
      end
      puts "better off dead finished"
      never_gonna_give_you_up = Song.create!({
      title: "Never Gonna Give You Up",
      artist_id: rick_astley.id,
      year: 1987
    })
    # never_gonna_give_you_up.image.attach(io: rick_pic, filename: 'Rick_astley_profile_pic.webp')
    # never_gonna_give_you_up.file.attach(
    #   io: URI.parse("https://cloudify-seeds.s3.amazonaws.com/Never_gonna_give_you_up_rick_astley.mp3").open,
    #   filename: "Never_gonna_give_you_up_rick_astley.mp3"
    # )
    puts "creating demo liked songs"
    all_songs = Song.all 
    demo_playlist = Playlist.create!({
      title: "Liked Songs",
      user_id: User.first.id,
      public: true, 
      color: "##{SecureRandom.hex(3)}"
    })
    i = 1
      num = rand(3..18)
      while i <= num do
        demo_playlist_song = PlaylistSong.create({
          playlist_id: demo_playlist.id,
          song_id: all_songs.sample.id,
          song_number: i
        })
        i += 1
      end
  puts "Done!"