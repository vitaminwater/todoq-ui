import _ from 'lodash';

import { eventChannel, } from 'redux-saga'
import { Socket, LongPoller } from "phoenix"

let socket = new Socket("ws://localhost:4000/socket", {
  //logger: ((kind, msg, data) => { console.log(`${kind}: ${msg}`, data) })
})

socket.connect();

const channels = {};
const getChannel = (name) => {
  if (channels[name]) return channels[name];
  let channel = socket.channel(name, {})
  channel.join()
    .receive("ok", resp => { console.log("Joined successfully", resp) })
    .receive("error", resp => { console.log("Unable to join", resp) })
  channels[name] = channel;
  return channel;
}

export const join = (name, event) => {
  event = typeof event.length == 'undefined' ? [event] : event;
  return () => {
    return eventChannel(emitter => {
      const channel = getChannel(name);
      console.log("channel.on", channel);
      _.forEach(event, (e) => {
        channel.on(e, payload => {
          emitter({name: e, payload});
        });
      });
      return () => leave(name);
    });
  }
}

export const leave = (name) => {
  if (!channels[name]) return;
  channels[name].leave();
  channels[name] = undefined;
}
