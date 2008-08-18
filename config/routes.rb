ActionController::Routing::Routes.draw do |map|

  map.resources :statuses, :collection => {:tags => :get}
  map.resources :scrapbooks
  
#  map.resources :statuses do |statuses|
#    statuses.resource :scrapbook
#  end
  map.resources :users, :member => { :suspend   => :put,
                                     :unsuspend => :put,
                                     :purge     => :delete }
  map.resource  :session
  map.resource  :setting
  map.resource  :feedback

  map.root      :statuses

  map.register  '/register',  :controller => 'users',     :action => 'create'
  map.signup    '/signup',    :controller => 'users',     :action => 'new' 
  map.login     '/login',     :controller => 'sessions',  :action => 'new' 
  map.logout    '/logout',    :controller => 'sessions',  :action => 'destroy'

end
