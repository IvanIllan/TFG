# app/channels/screen_channel.rb
class ScreenChannel < ApplicationCable::Channel
  def subscribed
    stream_from "screen_channel"
  end

  def receive(data)
    puts "Received data: #{data}"  # Aquí puedes ver los datos recibidos en los logs del servidor
    ActionCable.server.broadcast("screen_channel", data)
  end
end