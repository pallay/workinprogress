class UserMailer < ActionMailer::Base

  def signup_notification(user)
    setup_email(user)
    @subject    += 'Thanks for signing up'
  end
  
  protected # ------------------------

  def setup_email(user)
    @recipients  = "#{user.email}"
    @from        = "pallay"
    @subject     = "workininprogress - "
    @sent_on     = Time.now
    @body[:user] = user
  end

end
