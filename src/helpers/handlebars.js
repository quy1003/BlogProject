const Handlebars = require('handlebars')
module.exports = {
    sum: (a, b) => a + b,
    sortable: (field, sort) => {
      let sortType = field 

      if(field === sort.column){
          sortType = sort.type
      }
      else
          sortType = 'default'
      const icons = {
          default: 'ti ti-exchange-vertical',
          desc: 'ti ti-arrow-down',
          asc: 'ti ti-arrow-up'
      }
      const types = {
          default: 'asc',
          asc: 'desc',
          desc: 'asc'
      }
      const icon = icons[sortType]
      const type = types[sortType]
      const href = Handlebars.escapeExpression(`?_sort&column=${field}&type=${type}`)
      const output = `<a href="${href}">
          <span class="${icon}"></span>
        </a>`;
        return new Handlebars.SafeString(output)
    },
  }