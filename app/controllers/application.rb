class ApplicationController < ActionController::Base

  helper :all

  # allow POSTs from outside, so no protect_from_forgery
  #protect_from_forgery # :secret => '7bc2289ad4e1567f96808f3d60e748e5'
  
  filter_parameter_logging :password
  
  include AuthenticatedSystem
  
  include RubyExtensions
  
end
