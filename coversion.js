var events = {
  read: function read() {
    return $.getJSON("sample-data.json");
  },
  getOnDate: function getOnDate(date) {
    function filter_event(events) {
      return events.filter(match_date) || [];
    }

    function match_date(event) {
      var date1 = (new Date(date)).toDateString();
      var date2 = (new Date(event.startTime)).toDateString();
      return (date1 === date2);
    }
    return this.read().then(filter_event);
  },
  render: function render(date) {
    no_event_template = "<div class='no-event'>No Event Present</div>"
    function generateHTML(events) {
      if (events.length) {
        return events.map(generateEventHtml).join("\n");
      }
      else{
        return no_event_template;
      }
      
    }

    function generateEventHtml(event) {
      var minutes_start = ((new Date(event.startTime)).getMinutes()) / 60;
      var hours_start = (new Date(event.startTime)).getHours() + minutes_start;
      var minutes_end = ((new Date(event.endTime)).getMinutes()) / 60;
      var hours_end = (new Date(event.endTime)).getHours() + minutes_end;
      var difference = hours_end - hours_start;
      difference = (difference / 24) * 100;
      var top = (hours_start / 24) * 100;
      var event_text = "<div class='event'> title (start - end) </div>".replace('start', moment(event.startTime).format('LT')).replace('end', moment(event.endTime).format('LT')).replace('title', event.title);
      $element = $(event_text);
      $element.css({
        height: difference + "%",
        top: top + "%"
      });
      return $element[0].outerHTML;
    }
    return this.getOnDate(date).then(generateHTML);
  }
};