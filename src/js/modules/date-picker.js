/**
 * DatePicker factory
 *
 * @param string id The tag id to use when attaching the date picker behaviour to
 */
export function DatePicker(id) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    inputElement = document.getElementById(id);

  function _init(id) {
    if (!id) {
      console.error('Missing id.');

      return false;
    }

    inputElement.onclick = () => {
      _render();
    };

  }

  function _getYear() {
    const year = '2020';

    return year;
  }

  function _render() {
    const popup = Popup.create(),
      topbar = document.createElement('div'),
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
      });

    yearHeading.textContent = _getYear();

    topbar.setAttribute('class', 'date-picker-topbar');
    topbar.appendChild(leftYearSelector);
    topbar.appendChild(yearHeading);
    topbar.appendChild(rightYearSelector);

    popup.appendChild(topbar);

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
      'background-color': 'black'
    };
    this.element = Element.create(atts);

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
