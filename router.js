// const route = (e) => {
//     e = e || window.event;
//     e.preventDefault();
//     window.history.pushState({}, "", e.target.href);
//     handleLocation();
// }

// const routes = {
//     "/" : "index.html",
//     "/calculadora" : "calculadora.html",
// }

// const handleLocation = async () => {
//     const path = window.location.pathname;
    
//     const route = routes[path];
//     const html = await fetch(route).then((data) => data.text());
    
//     document.getElementById("app").innerHTML = html;
// }


// window.addEventListener("DOMContentLoaded", () => {
//     if (sessionStorage.getItem("reloaded")) {
//         sessionStorage.removeItem("reloaded");
//         handleLocation();
//     }
// });

// window.onbeforeunload = () => {
//     sessionStorage.setItem("reloaded", "true");
// };

// window.onpopstate = handleLocation;
// window.route = route;

// handleLocation();