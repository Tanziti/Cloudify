class Api::SongsController < ApplicationController
  def show
    @song = Song.find_by(id: params[:id])
    render :show 
  end

  def index
    @songs = Song.all 
    render :index
  end

  def search
    query = params[:query]
    @songs = Song
        .where('title ILIKE ?', "%#{query}%")
    @albums = Album
        .where('name ILIKE ?', "%#{query}%")
    @playlists = Playlist
        .where('title ILIKE ?', "%#{query}%")
    @artists = Artist
        .where('name ILIKE ?', "%#{query}%")
    # @results = @songs + @albums + @artists + @playlists
    @results = @albums + @artists

    render :search

end

end