let pc1, pc2;

document.addEventListener("DOMContentLoaded", async () => {
  pc1 = new RTCPeerConnection();
  pc2 = new RTCPeerConnection();
  pc1.addTransceiver("audio", { direction: "recvonly" });
  pc1.addTransceiver("video", { direction: "recvonly" });
  document.getElementById('create-answer').addEventListener('click', createAnswer);
  document.getElementById("offer-contents").innerHTML = failingSDP;
});

async function createAnswer() {
  document.getElementById('create-answer').style.display = 'none';
  try {
    const offer = await pc1.createOffer();
    offer.sdp = failingSDP;

    await pc2.setRemoteDescription(offer);

    const stream = await navigator.mediaDevices.getUserMedia({audio: true, video: true});
    stream.getTracks().forEach(track => pc2.addTrack(track, stream));

    const answer = await pc2.createAnswer();
    document.getElementById("answer-contents").innerHTML = answer.sdp;
    document.getElementById('answer-container').style.display = 'block';

    stream.getTracks().forEach(track => track.stop())
  } catch (e) {
    console.log(e);
  }
}

const failingSDP = `v=0
o=- 3726756288210950649 1710187946 IN IP4 0.0.0.0
s=-
t=0 0
a=fingerprint:sha-256 78:EE:F5:AB:9A:17:CE:CD:1B:FF:7A:AC:C8:36:68:C2:6F:2D:03:1D:D9:28:89:6E:22:CF:6D:E5:01:03:4C:1F
a=extmap-allow-mixed
a=group:BUNDLE 0 1
m=audio 9 UDP/TLS/RTP/SAVPF 111
c=IN IP4 0.0.0.0
a=setup:actpass
a=mid:0
a=ice-ufrag:tSRDcggsWVNfPqAX
a=ice-pwd:mPIQyNuzFLMvFtlwUFUGySiMPqUVHrDW
a=rtcp-mux
a=rtcp-rsize
a=rtpmap:111 opus/48000/2
a=fmtp:111 minptime=10;useinbandfec=1;stereo=0
a=rtcp-fb:111 transport-cc 
a=extmap:1 http://www.ietf.org/id/draft-holmer-rmcat-transport-wide-cc-extensions-01
a=extmap:2 http://www.webrtc.org/experiments/rtp-hdrext/abs-send-time
a=extmap:3 urn:ietf:params:rtp-hdrext:sdes:mid
a=extmap:4 urn:ietf:params:rtp-hdrext:sdes:rtp-stream-id
a=recvonly
m=video 9 UDP/TLS/RTP/SAVPF 125
c=IN IP4 0.0.0.0
a=setup:actpass
a=mid:1
a=ice-ufrag:tSRDcggsWVNfPqAX
a=ice-pwd:mPIQyNuzFLMvFtlwUFUGySiMPqUVHrDW
a=rtcp-mux
a=rtcp-rsize
a=rtpmap:125 H264/90000
a=fmtp:125 level-asymmetry-allowed=1;packetization-mode=1;profile-level-id=42e01f
a=rtcp-fb:125 goog-remb 
a=rtcp-fb:125 ccm fir
a=rtcp-fb:125 nack 
a=rtcp-fb:125 nack pli
a=rtcp-fb:125 transport-cc 
a=extmap:1 http://www.ietf.org/id/draft-holmer-rmcat-transport-wide-cc-extensions-01
a=extmap:2 http://www.webrtc.org/experiments/rtp-hdrext/abs-send-time
a=extmap:3 urn:ietf:params:rtp-hdrext:sdes:mid
a=extmap:4 urn:ietf:params:rtp-hdrext:sdes:rtp-stream-id
a=recvonly
`;