export const environment = {
  production: true,
  apiKey: 'iQs04ljFIuuD88ShazdNj_TP0VlrQuN2lm5iIu4hd4jjCwReExISjHVYJxv0ZmoB1' +
    '-6cIUvwL25azbr9lXUD3fgzyavRzQjJ0Ai0s6Glq0b9-321-bjhhfA7acN6XHYx',
  proxyUrl: 'https://cors-anywhere.herokuapp.com/',
  businessesApiUrl: 'https://api.yelp.com/v3/businesses/search',
  categoriesApiUrl: 'https://api.yelp.com/v3/categories',
  searchParams: {
    term: 'restaurant',
    open_now: 'true',
    location: '',
    latitude: 0,
    longitude: 0,
    categories: '',
    radius: (5 * 1609).toString(),
    sort_by: 'distance',
    limit: '50',
    offset: '0'
  }
};
