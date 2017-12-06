window.onload = function() {
    var socket,
        pc;
    var hangup = document.getElementById("hangup-button");
    var localAudio = document.getElementById('localAudio');
    var localMedia = localAudio;
    var constraints = {audio: true};
    var servers = {'iceServers': [
        {'urls': 'stun:stun.services.mozilla.com'}, 
        {'urls': 'turn:numb.viagenie.ca','credential': 'admin','username': 'bogdanostojic1993@gmail.com'}
    ]};
    
    hangup.disabled = true;

    navigator.mediaDevices.getUserMedia(constraints)
        .then(getStream)
        .then(localPeerConnection)
        .catch(error => console.log('Error! :' + error));

    function getStream(stream) {
        localAudio.srcObject = stream;
        localMedia = stream;
    }

    function localPeerConnection() {
        pc = new RTCPeerConnection(servers);
        pc.addStream(localMedia);
        pc.onaddstream = function(event) {
            document.getElementById("remoteAudio").srcObject = event.stream;
            hangup.disabled = false;
          };
        // ***  Firebase primer   ***
        // pc.onicecandidate = (event => event.candidate?sendMessage(yourId, JSON.stringify({'ice': event.candidate})):console.log("Sent All Ice") );
        // pc.onaddstream = (event => friendsVideo.srcObject = event.stream);
        pc.createOffer()
            .then(offer => pc.setLocalDescription(offer))
            .then(() => console.log(pc))
            .catch(err => 'Error! :'+err);
    }
    
    function sendToServer(msg) {
        var msgJSON = JSON.stringify(msg);
      
        connection.send(msgJSON);
      }

    socket = io.connect('http://127.0.0.1:9090');

}