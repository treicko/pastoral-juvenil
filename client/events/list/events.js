function GetWeek(currentDate) {
  let endWeekDay;
  const splitDate = currentDate.toString().split(' ');
  splitDate.forEach(data => console.log('my data: ', data));
  switch (splitDate[0]) {
    case 'Mon':
    break;
    case 'Tue':
    break;
    case 'Wed':
      console.log('hay carajo Anio: ', parseInt(splitDate[3], 10));
      console.log('hay carajo Mes: ', parseInt(splitDate[1], 10));
      console.log('hay carajo Dia: ', parseInt(splitDate[2], 10));
      endWeekDay = new Date(parseInt(splitDate[4], 10), parseInt(splitDate[2], 10), parseInt(splitDate[3], 10));
    break;
    case 'Thu':
    break;
    case 'Fri':
    break;
    case 'Sat':
    break;
    default:
    break;
  }
  return endWeekDay;
};

Template.Events.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('events');
  });
});

Template.Events.onRendered(function() {
    $('.carousel-slider').carousel({full_width: true});
});

Template.Events.helpers({
  selectedEvents: () => {
    const currentDate = new Date();
    var start = new Date(450000);
    // const currentDate = "leo";
    const finded = Events.find({createdAt: { $gte : start, $lt: currentDate }}).fetch();
    console.log('Lunes: ', new Date('5/8/17'));
    console.log('Martes: ', new Date('5/9/17'));
    console.log('Miercoles: ', finded, 'this is my current date: ', currentDate, 'start: ', start);
    console.log('Jueves: ', new Date('5/11/17'));
    console.log('Viernes: ', new Date('5/12/17'));
    console.log('Sabado: ', new Date('5/13/17'));
    console.log('Domingo: ', new Date('5/14/17'));
    console.log('Chekeaaaaa: ', GetWeek(new Date()));
    return Events.find({date: currentDate});
  },
  title: () => {
    return 'Eventos del dia';
  }
});