#include <Adafruit_BLE_UART.h>
#include <Keypad.h>


const byte ROWS = 4; //four rows
const byte COLS = 3; //three columns
char keys[ROWS][COLS] = {
  {'1', '2', '3'},
  {'4', '5', '6'},
  {'7', '8', '9'},
  {'*', '0', '#'}
};

byte rowPins[ROWS] = {10, 11, 12, 13}; //connect to the row pinouts of the keypad
byte colPins[COLS] = {7, 8, 9}; //connect to the column pinouts of the keypad

Keypad keypad = Keypad( makeKeymap(keys), rowPins, colPins, ROWS, COLS );
String keypadState = String();
boolean canReset = true;
int keypadSeconds = 0;

void setup() {
  Serial.begin(9600);           // Sets the digital pin as output.
  keypad.addEventListener(keypadEvent); // Add an event listener for this keypad
}

void loop() {
  char key = keypad.getKey();

  if (key) {
    Serial.println(key);
  }


}

void displayTime(int currentTime, int currentPosition/* len-1*/) {
  Serial.println("currentTime: " + String(currentTime) + ". currentPosition: " + String(currentPosition));
}

// uruchom odliczanie
void runCountdown(int currentTime) {
  Serial.println("runCountdown currentTime: " + String(currentTime));

}

void resetTime() {
  keypadState = "";
  displayTime(0, -1);
}

int getTimeFromKeypad(String state) {
  state = state + "0000";
  String minutes = state.substring(0, 2);
  String seconds = state.substring(2, 4);

  int currentTime = minutes.toInt() * 60 + seconds.toInt();
  return currentTime;
}

void keypadEvent(KeypadEvent key) {
  switch (keypad.getState()) {
    case PRESSED:
      if (key == '#') {
        canReset = false;
        keypadSeconds = getTimeFromKeypad(keypadState);
        runCountdown(keypadSeconds);
      } else if (key == '*' && canReset) {
        resetTime();
      } else if (keypadState.length() < 4) {
        keypadState += key;
        displayTime(getTimeFromKeypad(keypadState), keypadState.length() - 1);
      }
      Serial.println("keypadState: " +  keypadState);
      break;
  }
}

