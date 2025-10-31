class MessagesController < ApplicationController
  def create
    @message = current_user.messages.build(message_params)

    if @message.save
      # Broadcast message to all other clients
      html = render_to_string(partial: "messages/message", locals: { message: @message })
      ActionCable.server.broadcast("chatroom_channel", { message: html })

      respond_to do |format|
        format.js   { render :create } # Handles AJAX
        format.html { redirect_to root_path } # fallback for non-JS
      end
    else
      @messages = Message.includes(:user).order(created_at: :asc)
      render "chatroom/index", status: :unprocessable_entity
    end
  end

  private

  def message_params
    params.require(:message).permit(:body)
  end
end
