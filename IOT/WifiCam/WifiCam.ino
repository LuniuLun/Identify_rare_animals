
// #include <WebServer.h>
// #include <WiFi.h>
// #include <esp32cam.h>

// const char* WIFI_SSID = "Dylan 🐳🐳";
// const char* WIFI_PASS = "25042003";
 
// WebServer server(80);
 
 
// static auto loRes = esp32cam::Resolution::find(320, 240);
// static auto midRes = esp32cam::Resolution::find(350, 530);
// static auto hiRes = esp32cam::Resolution::find(800, 600);
// void serveJpg()
// {
//   auto frame = esp32cam::capture();
//   if (frame == nullptr) {
//     Serial.println("CAPTURE FAIL");
//     server.send(503, "", "");
//     return;
//   }
//   Serial.printf("CAPTURE OK %dx%d %dbn", frame->getWidth(), frame->getHeight(),
//                 static_cast<int>(frame->size()));
 
//   server.setContentLength(frame->size());
//   server.send(200, "image/jpeg");
//   WiFiClient client = server.client();
//   frame->writeTo(client);
// }
 
// void handleJpgLo()
// {
//   if (!esp32cam::Camera.changeResolution(loRes)) {
//     Serial.println("SET-LO-RES FAIL");
//   }
//   serveJpg();
// }
 
// void handleJpgHi()
// {
//   if (!esp32cam::Camera.changeResolution(hiRes)) {
//     Serial.println("SET-HI-RES FAIL");
//   }
//   serveJpg();
// }
 
// void handleJpgMid()
// {
//   if (!esp32cam::Camera.changeResolution(midRes)) {
//     Serial.println("SET-MID-RES FAIL");
//   }
//   serveJpg();
// }
 
 
// void  setup(){
//   Serial.begin(115200);
//   Serial.println();
//   {
//     using namespace esp32cam;
//     Config cfg;
//     cfg.setPins(pins::AiThinker);
//     cfg.setResolution(hiRes);
//     cfg.setBufferCount(2);
//     cfg.setJpeg(80);
 
//     bool ok = Camera.begin(cfg);
//     Serial.println(ok ? "CAMERA OK" : "CAMERA FAIL");
//   }
//   WiFi.persistent(false);
//   WiFi.mode(WIFI_STA);
//   WiFi.begin(WIFI_SSID, WIFI_PASS);
//   while (WiFi.status() != WL_CONNECTED) {
//     delay(500);
//   }
//   Serial.print("http://");
//   Serial.println(WiFi.localIP());
//   Serial.println("  /cam-lo.jpg");
//   Serial.println("  /cam-hi.jpg");
//   Serial.println("  /cam-mid.jpg");
 
//   server.on("/cam-lo.jpg", handleJpgLo);
//   server.on("/cam-hi.jpg", handleJpgHi);
//   server.on("/cam-mid.jpg", handleJpgMid);
 
//   server.begin();
// }
 
// void loop()
// {
//   server.handleClient();
// }



#include <WebServer.h>
#include <WiFi.h>
#include <esp32cam.h>
#include "DFRobotDFPlayerMini.h"

const char* WIFI_SSID = "Dylan 🐳🐳";
const char* WIFI_PASS = "25042003";

WebServer server(80);
DFRobotDFPlayerMini dfplayer;

static auto loRes = esp32cam::Resolution::find(320, 240);
static auto midRes = esp32cam::Resolution::find(350, 530);
static auto hiRes = esp32cam::Resolution::find(800, 600);

#define RX 14 // GPIO pin mà RX của DFPlayer Mini kết nối đến
#define TX 15 // GPIO pin mà TX của DFPlayer Mini kết nối đến

void serveJpg() {
  auto frame = esp32cam::capture();
  if (frame == nullptr) {
    Serial.println("CAPTURE FAIL");
    server.send(503, "", "");
    return;
  }
  Serial.printf("CAPTURE OK %dx%d %db\n", frame->getWidth(), frame->getHeight(), static_cast<int>(frame->size()));
  
  server.setContentLength(frame->size());
  server.send(200, "image/jpeg");
  WiFiClient client = server.client();
  frame->writeTo(client);
}

void handleJpgLo() {
  if (!esp32cam::Camera.changeResolution(loRes)) {
    Serial.println("SET-LO-RES FAIL");
  }
  serveJpg();
}

void handleJpgHi() {
  if (!esp32cam::Camera.changeResolution(hiRes)) {
    Serial.println("SET-HI-RES FAIL");
  }
  serveJpg();
}

void handleJpgMid() {
  if (!esp32cam::Camera.changeResolution(midRes)) {
    Serial.println("SET-MID-RES FAIL");
  }
  serveJpg();
}

void setup() {
  Serial.begin(115200);
  Serial.println();
  
  {
    using namespace esp32cam;
    Config cfg;
    cfg.setPins(pins::AiThinker);
    cfg.setResolution(hiRes);
    cfg.setBufferCount(2);
    cfg.setJpeg(80);
    
    bool ok = Camera.begin(cfg);
    Serial.println(ok ? "CAMERA OK" : "CAMERA FAIL");
  }
  
  WiFi.persistent(false);
  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASS);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.println("Connecting to WiFi...");
  }
  Serial.print("IP Address: ");
  Serial.println(WiFi.localIP());
  Serial.println("  /cam-lo.jpg");
  Serial.println("  /cam-hi.jpg");
  Serial.println("  /cam-mid.jpg");

  server.on("/cam-lo.jpg", handleJpgLo);
  server.on("/cam-hi.jpg", handleJpgHi);
  server.on("/cam-mid.jpg", handleJpgMid);
  
  server.on("/", []() {
    if (server.hasArg("plain")) {
      String request = server.arg("plain");
      Serial.println("Received request: " + request);
      if (!dfplayer.begin(Serial2)) {
        Serial.println(F("Cannot communicate with DFPlayer Mini"));
        server.send(500, "text/plain", "DFPlayer Mini connection failed");
        return;
      }
      dfplayer.play(request.toInt());
      server.send(200, "text/plain", "Playing audio file " + request);
      delay(5000); // Wait for 5 seconds to simulate playback
      dfplayer.pause();
    } else {
      server.send(400, "text/plain", "No request received");
    }
  });

  server.begin();

  Serial2.begin(9600, SERIAL_8N1, TX, RX);
}

void loop() {
  server.handleClient();
}
