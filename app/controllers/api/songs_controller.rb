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

    @songs = Song.where('title ILIKE ?', "%#{query}%")

    render :search 

  end

end