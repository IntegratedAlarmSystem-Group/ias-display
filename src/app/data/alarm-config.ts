/**
* Stores the displaying configuration of an {@link Alarm}
*/
export class AlarmConfig {

  /** ID of the associated {@link Alarm} */
  public alarm_id: string;

  /** Custom name to display the {@link Alarm} */
  public custom_name: string;

  /** Type associated to the {@link Alarm}, used to decide how to display the alarm */
  public type: string;

  /** View where the alarm is displayed {@link Alarm} */
  public view: string;

  /** List of children {@link Alarm} */
  public children = [];

  /** ID to map the {@link Alarm} to a location on a map */
  public placemark: string;

  /** Group of the alarm, in order to classify it for views that require some sort of classification of {@link Alarm}s */
  public group: string;

  public get name(): string {
    if (this.custom_name) {
      return this.custom_name;
    } else {
      return this.alarm_id;
    }
  }

}
