/**
* Class to define Iasio objects
*/
export class Iasio {
  io_id: string;
  short_desc: string;
  ias_type: string;

  /**
  * The "constructor"
  *
  * @param {Object} attributes a dictionary containing the attributes to
  * create the object
  */
  constructor(attributes: Object = {}){
    Object.assign(this, attributes)
  }

  /**
  * Class method that checks if an object corresponds to an Iasio object
  *
  * @param {any} json the object to check
  * @returns {boolean} true if it is an {@link Iasio}, false if not
  */
  static isValidIasio(json: any): boolean {
    return (
      json.hasOwnProperty("io_id") &&
      json.hasOwnProperty("short_desc") &&
      json.hasOwnProperty("ias_type")
    );
  }

  /**
  * Class method that receives an object and returns copy as an {@link Iasio}
  *
  * @param {any} json the object to convert to an Iasio
  * @param {number} pk the primary key of the Iasio in the database
  */
  static asIasio(json: any): Iasio {
    if (!this.isValidIasio(json)) {
      return null;
    }
    let io_id = <string>json['io_id'];
    let short_desc = <string>json['short_desc'];
    let ias_type = <string>json['ias_type'];
    return new Iasio({ io_id, short_desc, ias_type });
  }

}
