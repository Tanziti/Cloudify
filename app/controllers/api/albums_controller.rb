class Api::AlbumsController < ApplicationController

  def index
      @albums = Album.all
      render :index
  end

  def show
    # debugger
      @album = Album.find_by(id: params[:id])
      @songs = @album.songs
      # debugger
      render :show
  end
end