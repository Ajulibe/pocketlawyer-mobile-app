
import * as LocalAuthentication from 'expo-local-authentication';
class Utilities {
  static formateTime = (examTimeRemaining: number) => {
    var mins = Math.floor(examTimeRemaining / 60); //~/ or .floor()
    var hr = Math.floor(examTimeRemaining / 3600);

    var r_hr = Math.floor((examTimeRemaining / 3600) % 24).toString();
    var r_mins = Math.floor((examTimeRemaining - hr * 3600) / 60).toString();
    var r_secs = (examTimeRemaining - mins * 60).toString();

    if (r_hr.length == 1) r_hr = `0${r_hr}`;
    if (r_mins.length == 1) r_mins = `0${r_mins}`;
    if (r_secs.length == 1) r_secs = `0${r_secs}`;
    // var t_remaining = `${r_hr}:${r_mins}:${r_secs}`;
    var t_remaining = `${r_mins}:${r_secs}`;

    return t_remaining;
  };

//FINGER PRINT HARDWARE CHECK
  static checkDeviceForHardware = async ():Promise<boolean> => {
    let compatible = await LocalAuthentication.hasHardwareAsync();
    console.log('compatible', compatible);
    return compatible;
  }
  //CHECK IF USER HAS FINGER PRINT SETUP ON THE DEVICE
  static checkForFingerprints = async () => {
    let fingerprints = await LocalAuthentication.isEnrolledAsync();
    console.log('fingerPrints', fingerprints)
    return fingerprints;
  };
}
export default Utilities;
