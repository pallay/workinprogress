class ScrapbooksController < ApplicationController

  before_filter :login_required

  def index
    @scrapbooks = Scrapbook.find(:all)
    @current_user = current_user.id
    @hello = 'hello'
  end
  
  def new
    @scrapbook = Scrapbook.new
  end
  
  def create
    @scrapbook = Scrapbook.new(params[:scrapbook])
    @scrapbook.user_id = current_user.id
    @scrapbook.save!
    respond_to do |wants|
      wants.html { redirect_to root_url }
      wants.xml  { render :xml => @scrapbook, :status => :created, :location => @scrapbook }
      wants.json { render :json => @scrapbook }
    end
  end

  
  def edit
  
  end
  
  def update
    
  end

end
