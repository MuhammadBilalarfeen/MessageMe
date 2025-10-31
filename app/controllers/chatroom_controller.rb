class ChatroomController < ApplicationController
  before_action :require_login

  def index
    @messages = Message.custom_display
    @message = Message.new
  end
end
