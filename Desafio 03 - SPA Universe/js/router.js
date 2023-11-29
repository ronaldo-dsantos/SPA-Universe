export class Router {

  routes = {} 

  add(routeName, page) {  
    this.routes[routeName] = page 
  }

  route(event) { 
    event = event || window.event 
    event.preventDefault() 
  
    window.history.pushState({}, "", event.target.href)
  
    this.handle() 
  }

  handle() { 
    const { pathname } = window.location 
    
    const route = this.routes[pathname] || this.routes[404]  

    if (this.routes[pathname]) { 
      this.makeLinkActive() 
    }

    fetch(route) 
    .then(data => data.text()) 
    .then(html => {document.querySelector('#app').innerHTML = html}) 
  }
  
  makeLinkActive () {
    document.querySelectorAll('nav a').forEach(a => a.classList.remove('active')) 

    const { pathname } = window.location 

    let currentLink = document.querySelector('a[href="'+pathname+'"]') 

    if (pathname == "/") {
      currentLink = document.querySelector('a:nth-child(2)[href="'+pathname+'"]')
    } 
    
    currentLink.classList.add('active') 
  }
}



