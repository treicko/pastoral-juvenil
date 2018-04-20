/* global $ Template */

Template.kardexDetail.onRendered(function() {
  $('ul.tabs').tabs({
    onShow: () => {
      /* if (GoogleMaps.loaded()) {
        const center = GoogleMaps.maps.showMap.instance.getCenter();
        google.maps.event.trigger(GoogleMaps.maps.showMap.instance, 'resize');
        GoogleMaps.maps.showMap.instance.setCenter(center);
        GoogleMaps.maps.showMap.instance.setZoom(15);
      } */
      /* console.log('Elem: ', elem.selector);
      const indicatorTab = document.getElementsByClassName('indicator');
      indicatorTab[0].classList.remove('indicator-tab');
      console.log('Indicator: ', indicatorTab);
      if (indicatorTab.length && elem.selector === '#kardexGroups') {
        console.log('Add class');
        indicatorTab[0].classList.add('indicator-tab');
      } */
    },
  });
});

Template.kardexDetail.onCreated(function() {
  this.autorun(() => {
  });

  /* const tabs = document.getElementsByClassName('tabs-content');
  console.log('Tabs: ', tabs);
  for (let i = 0; i < tabs.length; i += 1) {
    $('.tabs-content').remove();
  } */
});

Template.kardexDetail.helpers({
});
