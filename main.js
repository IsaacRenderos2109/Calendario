(function($) {
    "use strict";
  
    document.addEventListener('DOMContentLoaded', function() {
      var today = new Date(),
          year = today.getFullYear(),
          month = today.getMonth(),
          monthTag = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
          day = today.getDate(),
          days = document.getElementsByTagName('td'),
          selectedDay,
          setDate,
          daysLen = days.length;
  
      function Calendar(selector, options) {
          this.options = options;
          this.draw();
      }
  
      Calendar.prototype.draw = function() {
          this.getOptions();
          this.drawDays();
          this.drawHeader(day); // Asegúrate de que el día actual se muestre al inicio
          var that = this,
              reset = document.getElementById('reset'),
              pre = document.getElementsByClassName('pre-button'),
              next = document.getElementsByClassName('next-button');
              
          pre[0].addEventListener('click', function() { that.preMonth(); });
          next[0].addEventListener('click', function() { that.nextMonth(); });
          reset.addEventListener('click', function() { that.reset(); });
          
          while (daysLen--) {
              days[daysLen].addEventListener('click', function() { that.clickDay(this); });
          }
      };
  
      Calendar.prototype.drawHeader = function(e) {
          var headDay = document.getElementsByClassName('head-day'),
              headMonth = document.getElementsByClassName('head-month');
  
          // Muestra el día que se le pase o el día actual si no hay selección
          headDay[0].innerHTML = e || day; // Usa el día pasado o el día actual
          headMonth[0].innerHTML = monthTag[month] + " - " + year;        
      };
  
      Calendar.prototype.drawDays = function() {
          var startDay = new Date(year, month, 1).getDay(),
              nDays = new Date(year, month + 1, 0).getDate(),
              n = startDay;
  
          for (var k = 0; k < 42; k++) {
              days[k].innerHTML = '';
              days[k].id = '';
              days[k].className = '';
          }
  
          for (var i = 1; i <= nDays; i++) {
              days[n].innerHTML = i;

              // Resalta el día actual
              if (i === day && month === today.getMonth() && year === today.getFullYear()) {
                  days[n].id = "today";
              }
              n++;
          }
      };
  
      Calendar.prototype.clickDay = function(o) {
          var selected = document.getElementsByClassName("selected"),
              len = selected.length;
          if (len !== 0) {
              selected[0].className = "";
          }
          o.className = "selected";
          selectedDay = new Date(year, month, o.innerHTML);
  
          // Determina el día de la semana
          var dayOfWeek = selectedDay.getDay();
  
          // Asigna el texto correspondiente según el día
          var eventText;
          switch (dayOfWeek) {
              case 2: // Martes
                  eventText = "Culto de ministerio de mujeres \n 06:30 06:30PM - 08:00PM";
                  break;
              case 4: // Jueves
                  eventText = "Culto de ministerio de Hombres \n 06:30PM - 08:00PM";
                  break;
              case 5: // Viernes
                  eventText = "Media vigilia \n 06:30PM - 09:30PM";
                  break;
              case 6: // Sábado
                  eventText = "Culto ministerio de jóvenes \n 03:30PM - 05:00PM";
                  break;
              case 0: // Domingo
                  eventText = "Culto dominical \n 10:00AM - 12:00AM";
                  break;
              default:
                  eventText = o.innerHTML; // Muestra el número de día para otros días
                  break;
          }
  
          // Actualiza solo el encabezado para mostrar el evento
          this.drawHeader(eventText);
      };
  
      Calendar.prototype.preMonth = function() {
          if (month < 1) {
              month = 11;
              year = year - 1;
          } else {
              month = month - 1;
          }
          this.drawHeader(day); // Muestra el día actual cuando se cambia de mes
          this.drawDays();
      };
  
      Calendar.prototype.nextMonth = function() {
          if (month >= 11) {
              month = 0;
              year = year + 1;
          } else {
              month = month + 1;
          }
          this.drawHeader(day); // Muestra el día actual cuando se cambia de mes
          this.drawDays();
      };
  
      Calendar.prototype.getOptions = function() {
          if (this.options) {
              var sets = this.options.split('-');
              setDate = new Date(sets[0], sets[1] - 1, sets[2]);
              day = setDate.getDate();
              year = setDate.getFullYear();
              month = setDate.getMonth();
          }
      };
  
      Calendar.prototype.reset = function() {
          month = today.getMonth();
          year = today.getFullYear();
          day = today.getDate();
          this.options = undefined;
          this.drawDays();
          this.drawHeader(day); // Muestra el día actual en grande
      };
  
      var calendar = new Calendar();
  
    }, false);
  
})(jQuery);