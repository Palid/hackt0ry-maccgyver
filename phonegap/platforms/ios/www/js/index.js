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

var UUID = "6E400001-B5A3-F393-E0A9-E50E24DCCA9E";
var app = {
  ble: false,
  // Application Constructor
  initialize: function() {
    this.bindEvents();
  },
  onSuccesfulBle: function(e) {
    this.ble = true;
    bluetoothSerial.write(Math.random() * Math.random() * Math.random());
  },
  onFailBle: function(e) {
    this.ble = false;
  },
  setupBle: function() {
    bluetoothSerial.connect(UUID, this.onSuccesfulBle.bind(this), this.onFailBle.bind(this));
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
    if (!this.ble) {
      this.setupBle();
    } else {
      bluetoothSerial.write(Math.random() * Math.random() * Math.random());
    }
    this.exploded = true;
  }
};
