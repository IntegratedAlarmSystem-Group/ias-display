/**
* Class to define Iasio objects, that represent monitoring points
*/
export class Iasio {

  /** Core ID of the IASIO */
  io_id: string;

  /** Short description of Alarms associated to this monitoring point */
  short_desc: string;

 /** Type of the IASIO, could be ALARM, DOUBLE, BOOLEAN, etc */
  ias_type: string;

  /**
  * Builds a new IASIO instance
  *
  * @param {Object} attributes a dictionary containing the attributes to
  * create the object
  */
  constructor(attributes: Object = {}) {
    Object.assign(this, attributes);
  }

  /**
  * Class method that checks if an object corresponds to an Iasio object
  *
  * @param {any} json the object to check
  * @returns {boolean} true if it is an {@link Iasio}, false if not
  */
  static isValidIasio(json: any): boolean {
    return (
      json.hasOwnProperty('io_id') &&
      json.hasOwnProperty('short_desc') &&
      json.hasOwnProperty('ias_type')
    );
  }

  /**
  * Class method that receives an object and returns copy as an {@link Iasio}
  *
  * @param {any} json the object to convert to an Iasio
  * @param {number} pk the primary key of the Iasio in the database
  * @returns {Iasio} the object as an {@link Iasio} instance
  */
  static asIasio(json: any): Iasio {
    if (!this.isValidIasio(json)) {
      return null;
    }
    const io_id = <string>json['io_id'];
    const short_desc = <string>json['short_desc'];
    const ias_type = <string>json['ias_type'];
    return new Iasio({ io_id, short_desc, ias_type });
  }

}
