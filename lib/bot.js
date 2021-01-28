/*'use strict'

const tls = require('tls')
const assert = require('assert')
const EventEmitter = require('events').EventEmitter

const parser = require('./parser')
*/

const TwitchBot = class TwitchBot extends EventEmitter {
  // TODO: Make this parsing better
  listen() {
    this.irc.on('data', data => {
      this.checkForError(data)

      /* Twitch sends keep-alive PINGs, need to respond with PONGs */
      if(data.includes('PING :tmi.twitch.tv')) {
        this.irc.write('PONG :tmi.twitch.tv\r\n')
      }

      if(data.includes('PRIVMSG')) {
        const chatter = parser.formatPRIVMSG(data)
        this.emit('message', chatter)
      }

      if(data.includes('CLEARCHAT')) {
        const event = parser.formatCLEARCHAT(data)
        if(event.type === 'timeout') this.emit('timeout', event)
        if(event.type === 'ban') this.emit('ban', event)
      }

      if(data.includes('USERNOTICE ')) {
        const event = parser.formatUSERNOTICE(data)
        if (['sub', 'resub'].includes(event.msg_id) ){
          this.emit('subscription', event)
        }
      }

      if(data.includes(`@${this.username}.tmi.twitch.tv JOIN`)) {
        const channel = parser.formatJOIN(data)
        if(channel) {
          if(!this.channels.includes(channel)) {
            this.channels.push(channel)
          }
          this.emit('join', channel)
        }
      }

      if(data.includes(`@${this.username}.tmi.twitch.tv PART`)) {
        const channel = parser.formatPART(data)
        if(channel) {
          if(this.channels.includes(channel)) {
            this.channels.pop(channel)
          }
          this.emit('part', channel)
        }
      }
    })
  }


  writeIrcMessage(text) {
    this.irc.write(text + "\r\n")
  }

  join(channel) {
    channel = parser.formatCHANNEL(channel)
    this.writeIrcMessage(`JOIN ${channel}`)
  }

  part(channel) {
    if(!channel && this.channels.length > 0) {
      channel = this.channels[0]
    }
    channel = parser.formatCHANNEL(channel)
    this.writeIrcMessage(`PART ${channel}`)
  }

  say(message, channel, callback ) {
    if(!channel) {
      channel = this.channels[0]
    }
    if(message.length >= 500) {
      this.cb(callback, {
        sent: false,
        message: 'Exceeded PRIVMSG character limit (500)'
      })
    } else {
      this.writeIrcMessage('PRIVMSG ' + channel + ' :' + message)
    }
  }

  timeout(username, channel, duration=600, reason='') {
    if(!channel) {
      channel = this.channels[0]
    }
    this.say(`/timeout ${username} ${duration} ${reason}`, channel)
  }

  ban(username, channel, reason='') {
    if(!channel) {
      channel = this.channels[0]
    }
    this.say(`/ban ${username} ${reason}`, channel)
  }

  close() {
    this.irc.destroy()
    this.emit('close')
  }

  cb(callback, obj) {
    if(callback) {
      obj.ts = new Date()
      callback(obj)
    }
  }

}

module.exports = TwitchBot