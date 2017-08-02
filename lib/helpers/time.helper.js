class TimeHelper {
  constructor() {

  }

  getHour(hour) {
    let newHour;
    switch(hour) {
      case '1':
        newHour = 13;
        break;
      case '2':
        newHour = 14;
        break;
      case '3':
        newHour = 15;
        break;
      case '4':
        newHour = 16;
        break;
      case '5':
        newHour = 17;
        break;
      case '6':
        newHour = 18;
        break;
      case '7':
        newHour = 19;
        break;
      case '8':
        newHour = 20;
        break;
      case '9':
        newHour = 21;
        break;
      case '10':
        newHour = 22;
        break;
      case '11':
        newHour = 23;
        break;
      default:
        newHour = 24;
        break;
    }
    return newHour;
  }

  getCurrentDate() {
    const date = moment().format('L').split('/');
    return `${date[2]}-${date[0]}-${date[1]}`;
  }

  getCurrentHour() {
    const data = moment().add(1, 'hours').format('LT').split(' ');
    const hour = data[0].split(':');
    let currentHour = (hour[0] > 9) ? `${hour[0]}:00` : `0${hour[0]}:00`;
    if(data[1] === 'PM') {
      currentHour = `${this.getHour(hour[0])}:00`;
    }
    return currentHour;
  };
}

module.exports = TimeHelper;



