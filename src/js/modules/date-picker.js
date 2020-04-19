/**
 * DatePicker factory
 *
 * @param string id The tag id to use when attaching the date picker behaviour to
 */
export function DatePicker(id) {
  const months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'],
    weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    lowYear = 2018,
    highYear = 2022,
    calendars = {},
    inputElement = document.getElementById(id);

  function _init(id) {
    if (!id) {
      console.error('Missing id.');

      return false;
    }

    _createCalendars();

    inputElement.onclick = () => {
      _render();
    };

  }

  function _getThisYear() {
    const year = new Date().getFullYear();

    return year;
  }

  function _createDays(year, month) {
    const numOfDays = new Date(year, month, 0).getDate();
    let days = [];

    for (let i = 1; i <= numOfDays; i++) {
      days.push(new Date(year, month - 1, i));
    }

    return days;
  }

  function _createMonths(year) {
    const months = {
      january: _createDays(year, 1),
      february: _createDays(year, 2),
      march: _createDays(year, 3),
      april: _createDays(year, 4),
      may: _createDays(year, 5),
      june: _createDays(year, 6),
      july: _createDays(year, 7),
      august: _createDays(year, 8),
      september: _createDays(year, 9),
      october: _createDays(year, 10),
      november: _createDays(year, 11),
      december: _createDays(year, 12),
    };

    return months;
  }

  function _renderCalendars() {
    const years = document.createElement('div');
    years.setAttribute('class', 'date-picker-years');

    for (const y in calendars) {
      const year = document.createElement('div');
      year.setAttribute('class', 'date-picker-year');

      for (const m in calendars[y]) {
        const monthHeader = document.createElement('div');
        monthHeader.setAttribute('class', 'align-center');
        monthHeader.innerHTML = m;
        year.appendChild(monthHeader);

        const month = document.createElement('table');
        month.setAttribute('class', 'date-picker-month');

        let week = month.insertRow();
        week.setAttribute('class', 'date-picker-week');

        for (const weekDay in weekDays) {
          let wd = week.insertCell();
          wd.outerHTML = `<th>${weekDays[weekDay]}</th>`;
        }

        let dayOfTheWeek = 0;

        for (let theDay in calendars[y][m]) {
          if (theDay % 7 === 0) {
            week = month.insertRow();
            week.setAttribute('class', 'date-picker-week');
            dayOfTheWeek = 0;
          }

          const day = week.insertCell();
          day.setAttribute('class', 'date-picker-day');

          const dotw = new Date(y, months.indexOf(m), theDay).getDay();

          console.log(dotw, dayOfTheWeek);

          if (dotw === dayOfTheWeek) {
            day.innerHTML = parseInt(theDay) + 1;
          }

          dayOfTheWeek++;

          //if (dayOfTheWeek == 7) break;
        }

        year.appendChild(month);
      }

      years.appendChild(year);
    }

    return years;
  }

  function _createCalendars(low, high) {
    for (let i = lowYear; i <= highYear; i++) {
      calendars[i] = _createMonths(i);
    }
  }

  function _render() {
    const popup = Popup.create(),
      topbar = document.createElement('div'),
      content = document.createElement('div'),
      leftYearSelector = ArrowElement.create({
        id: 'left-year-selector',
        class: 'year-selector',
        text: '<',
        onclick: event => {
          console.log('left click');
        }
      }),
      yearHeading = document.createElement('div'),
      rightYearSelector = ArrowElement.create({
        id: 'right-year-selector',
        class: 'year-selector',
        text: '>',
        onclick: event => {
          console.log('right click');
        }
      }),
      pickerBody = _renderCalendars();

    yearHeading.textContent = _getThisYear();

    topbar.setAttribute('class', 'date-picker-topbar');
    topbar.appendChild(leftYearSelector);
    topbar.appendChild(yearHeading);
    topbar.appendChild(rightYearSelector);

    content.setAttribute('class', 'date-picker-content');
    content.appendChild(pickerBody);

    popup.appendChild(topbar);
    popup.appendChild(content);

    inputElement.after(popup);
  }

  _init(id);

  return {
  }
}

/**
 * The popup element
 */
const Popup = {
  element: null,
  create: function create() {
    const atts = {
      tag: 'div',
      class: 'date-picker-popup'
    };
    this.element = Element.create(atts);
    this.element.style.display = 'block';

    return this.element;
  },
  destroy: () => {

  }
};

/**
 * An arrow element
 */
const ArrowElement = {
  element: null,
  create: function create(atts) {
    atts.tag = 'div';
    atts.styles = {
      //'background-color': 'black'
    };
    this.element = Element.create(atts);

    return this.element;
  }
};

const TableElement = {
  element: null,
  create: function create(atts) {
    atts.tag = 'table';
    atts.styles = {

    };
    this.element = Element.create(atts);
    this.element.appendChild(atts.content);

    return this.element;
  }
};

/**
 * An HTML element
 */
const Element = {
  create: function create(atts) {
    if (!atts.tag) {
      console.error('No tag specified.');

      return false;
    }

    const element = document.createElement(atts.tag);

    if (atts.onclick) {
      element.onclick = atts.onclick;
    }

    if (atts.id) {
      element.setAttribute('id', atts.id);
    }

    if (atts.class) {
      element.setAttribute('class', atts.class);
    }

    if (atts.text) {
      element.textContent = atts.text;
    }

    if (atts.styles) {
      Object.keys(atts.styles).forEach(key => {
        element.style[key] = atts.styles[key];
      });
    }

    return element;
  }
};
