/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var MAC = "F2:70:4F:A8:ED:BB";
var MAC2 = "FF:BB:AF:DE:4C:C9";

var WRITE_SERVICE = "6E400001-B5A3-F393-E0A9-E50E24DCCA9E";
var CHARACTERISTICS = "6E400002-B5A3-F393-E0A9-E50E24DCCA9E";

// var UUID = "6E400001-B5A3-F393-E0A9-E50E24DCCA9E";

// ASCII only
function stringToBytes(string) {
   var array = new Uint8Array(string.length);
   for (var i = 0, l = string.length; i < l; i++) {
       array[i] = string.charCodeAt(i);
    }
    return array.buffer;
}

// ASCII only
function bytesToString(buffer) {
    return String.fromCharCode.apply(null, new Uint8Array(buffer));
}

exploded = false;
var app = {
  AUTHED: false,
  // Application Constructor
  initialize: function() {
    this.bindEvents();
  },
  onSuccesfulBle: function(e) {
    this.AUTHED = true;
    ble.write(stringToBytes("BOOM"), WRITE_SERVICE, CHARACTERISTICS, function success(){
      exploded = true;
      console.log("SUCCESS BOOM");
      console.log(arguments);
    }, function fail() {
      console.log('welp');
    });
  },
  onFailBle: function(e) {
    this.AUTHED = false;
  },
  setupBle: function() {
    ble.connect(MAC, this.onSuccesfulBle.bind(this), this.onFailBle.bind(this));
  },
  bindEvents: function() {
    document.addEventListener('deviceready', this.onDeviceReady, false);
  },
  onDeviceReady: function() {
      $('#explode').on('click', function(e) {
        app.explode();
      });
  },
  explode: function() {
    this.setupBle();
    this.exploded = true;
  }
};
