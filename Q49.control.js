loadAPI(2);

// Remove this if you want to be able to use deprecated methods without causing script to stop.
// This is useful during development.
host.setShouldFailOnDeprecatedUse(true);

host.defineController("Alesis", "Q49", "1.0", "5cbe50c5-de49-4c4e-bdd5-8f63ef05227e", "inerba");

host.defineMidiPorts(1, 0);
host.addDeviceNameBasedDiscoveryPair(["Q49"], ["Q49"]);

var VOLUME_CC = 7;
var PAN_CC = 10;

function init() {
   host.getMidiInPort(0).setMidiCallback(onMidi);
   generic = host.getMidiInPort(0).createNoteInput("", "??????");
   generic.setShouldConsumeEvents(false);
   cursorTrack = host.createCursorTrack(2, 0);
}

function onMidi(status, CC, VAL) {
   //uncomment the following line to print the data in the Script Console
   //println(status + " CC "+ CC + " value " + VAL);
   if (isChannelController(status)) {
      if(CC == VOLUME_CC){     
         cursorTrack.getVolume().set(VAL,128);
      }

      if(CC == PAN_CC){
         cursorTrack.getPan().set(VAL,128);
      }     
   }
}

function exit()
{
   println("exit.");
}
