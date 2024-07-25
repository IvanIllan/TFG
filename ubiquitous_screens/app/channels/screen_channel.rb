# app/channels/screen_channel.rb
class ScreenChannel < ApplicationCable::Channel
  @@screens_status = {}

  def subscribed
    @mac_address = params[:mac_address]
    @@screens_status[@mac_address] ||= { confirmed: false }
    stream_from "screen_channel_#{@mac_address}"

    send_initial_data
  end

  def unsubscribed
    @@screens_status.delete(@mac_address)
  end

  def receive(data)
    mac_address = data['mac_address']
    message = data['message']

    if message['type'] == 'confirmation'
      puts "Received confirmation from #{mac_address}: #{message['status']}"
      @@screens_status[mac_address][:confirmed] = true
    else
      unless @@screens_status[mac_address][:confirmed]
        puts "Broadcasting message to #{mac_address}: #{message}"
        ActionCable.server.broadcast("screen_channel_#{mac_address}", message)
      end
    end
  end

  def send_initial_data
    screen = Screen.find_by(mac: @mac_address)
    return unless screen

    data = {
      type: 'initial_data',
      screen: {
        name: screen.name,
        width: screen.width,
        height: screen.height,
        html_structure: screen.full_html_structure
      }
    }
    puts "Sending initial data to #{@mac_address}: #{data}"
    ActionCable.server.broadcast("screen_channel_#{@mac_address}", data)
  end

  def self.screens_status
    @@screens_status
  end
end
