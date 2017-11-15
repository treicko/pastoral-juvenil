/* global moment Template GoogleMaps $ google ReactiveVar Events Session */
/* eslint-disable meteor/no-session */

function getDayFromCurrentDate(dayNumbers) {
  return new Date(`${moment().add(dayNumbers, 'days').format('l')} 23:59:59`);
}

function getWeek() {
  let endWeekDay;
  const currentDate = new Date().toString().split(' ');
  switch (currentDate[0]) {
    case 'Mon':
      endWeekDay = getDayFromCurrentDate(6);
      break;
    case 'Tue':
      endWeekDay = getDayFromCurrentDate(5);
      break;
    case 'Wed':
      endWeekDay = getDayFromCurrentDate(4);
      break;
    case 'Thu':
      endWeekDay = getDayFromCurrentDate(3);
      break;
    case 'Fri':
      endWeekDay = getDayFromCurrentDate(2);
      break;
    case 'Sat':
      endWeekDay = getDayFromCurrentDate(1);
      break;
    default:
      endWeekDay = new Date(`${moment().format('l')} 23:59:59`);
      break;
  }
  return endWeekDay;
}

function getNextWeek() {
  let endWeekDay;
  const currentDate = new Date().toString().split(' ');
  switch (currentDate[0]) {
    case 'Mon':
      endWeekDay = getDayFromCurrentDate(13);
      break;
    case 'Tue':
      endWeekDay = getDayFromCurrentDate(12);
      break;
    case 'Wed':
      endWeekDay = getDayFromCurrentDate(11);
      break;
    case 'Thu':
      endWeekDay = getDayFromCurrentDate(10);
      break;
    case 'Fri':
      endWeekDay = getDayFromCurrentDate(9);
      break;
    case 'Sat':
      endWeekDay = getDayFromCurrentDate(8);
      break;
    default:
      endWeekDay = getDayFromCurrentDate(7);
      break;
  }
  return endWeekDay;
}

function getCurrentYear() {
  const s = new Date(`${moment().add(4, 'M').format('l')} 23:59`);
  /* console.log('This year my friend: ', s); */
  return s;
}

Template.events.onRendered(function() {
  GoogleMaps.load({
    v: '3',
    libraries: 'places',
    key: 'AIzaSyCVKw1zfv0JsOsrH9yeAwoIjwcF7_JDAHY',
  });

  $('.carousel-slider').carousel({ full_width: true });
  $('ul.tabs').tabs();
  $('ul.tabs').tabs({
    onShow: () => {
      if (GoogleMaps.loaded()) {
        google.maps.event.trigger(GoogleMaps.maps.locationMap.instance, 'resize');
      }
    },
  });
});

Template.events.onCreated(function() {
  this.autorun(() => {
    this.subscribe('events');
  });
  this.selectedEvent = new ReactiveVar(false);
  Session.set('selectedEventsDate', 'Todos');
});

Template.events.helpers({
  selectedEvent: () => Template.instance().selectedEvent.get(),
  title: () => 'Eventos del dia',
  events: () => {
    let untilDate;
    const sinceDate = new Date(`${moment().format('l')} 0:0:0`);
    const selectedEventOption = Session.get('selectedEventsDate');

    switch (selectedEventOption) {
      case 'Mañana':
        untilDate = getDayFromCurrentDate(1);
        break;
      case 'Esta semana':
        untilDate = getWeek();
        break;
      case 'Siguente semana':
        untilDate = getNextWeek();
        break;
      case 'Todos':
        untilDate = getCurrentYear();
        break;
      default:
        untilDate = new Date(`${moment().format('l')} 23:59:59`);
        break;
    }
    /* console.log('desde: ', sinceDate, 'hasta: ', untilDate); */
    const events = Events.find({ date: { $gte: sinceDate, $lt: untilDate } }).fetch();
    return { eventOption: selectedEventOption, events };

    /* if (Session.get('selectedEventsDate') === 'today') {
      return { eventOption: Session.get('selectedEventsDate'), events: Events.find({}) };
    } else {
      const currentDate = new Date(moment().format('l'));
      const weekDay = GetWeek();

      const events = Events.find({createdAt: { $gte : currentDate, $lt: weekDay }}).fetch();
      console.log('Leooooooooooooooooooooooooooooo 5: ', events);

      var obj = (events.length !==0) && events[0]
      console.log('checa esto papaaaaa: ', obj);
      Template.instance().selectedEvent.set(obj);

      return { eventOption: Session.get('selectedEventsDate'), events: events };
    } */
  },
});

Template.events.events({
  'click .collection-item': (event, templateInstance) => {
    $('.collection-item').removeClass('active');
    $(event.currentTarget).addClass('active');
    const currentDate = new Date(moment().format('l'));
    const weekDay = getWeek();
    const events = Events.find({ createdAt: { $gte: currentDate, $lt: weekDay } }).fetch();
    let selectedEvent;
    events.forEach((item) => {
      if (item._id === event.currentTarget.id) {
        selectedEvent = item;
      }
    });

    const obj = (selectedEvent) && selectedEvent;
    /* console.log('geanial este selected: ', obj); */
    templateInstance.selectedEvent.set(obj);
  },
});
