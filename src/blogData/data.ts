export const mainMenu = [
	{ label:"Article", to:"/article/example-article", layout:"MainLayout",  }, 
	{ label:"Posts", to:"/article/example-article", layout:"MainLayout" }, 			
]

export const rightMenu = [
	{ label:"Login", to:"/login", auth:'logout', layout:"MainLayout"}, 
	{ label:"Register", to:"/register",  auth: 'logout', layout:"MainLayout"}, 
	{ label:"Panel", to:"/panel/profile" , auth:'login', layout:"PanelLayout"},
]

export const profileMenu = [
	{ label:"Close panel", to:"/" },
]

export const panelMenu = [
  { label:"Profile", to:"/panel/profile" },
  { label:"Users", to:"/panel/users" },
  { label:"Insert user", to:"/panel/insertUser" },
  { label:"Logout", to:"/", component:"LogoutLink" },
]

export const mainCategory = [
  {label:"Dark red colour", value:"dark-red"},
  {label:"Light red colour", value:"light-red"},
  {label:"Dark orange colour", value:"dark-orange"},
  {label:"Light orange colour", value:"light-orange"},
  {label:"Dark yellow clolur", value:"dark-yellow"},
  {label:"Middle light green colour", value:"dark-green"},
  {label:"Deep darkness blue colour", value:"dark-blue"},
  {label:"Dark purple colour", value:"dark-purple"},
  {label:"Middle light pink colour", value:"dark-pink"},
]
