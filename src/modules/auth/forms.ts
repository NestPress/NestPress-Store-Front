export const loginForm:any = [
	{
    name:"username",
    component: "InputField",
    label:'Email address',
    placeholder:'Insert email address',
    outputPath: "input.native.username",
    defaultValue:'',
    input:{ 
      value: '' 
    }
  },
	{
    name:"password",
    component: "InputField",
    label:'Password',
    placeholder:'Insert password',
    outputPath: "input.native.password",
    defaultValue:'',
    input:{ 
      value: '' 
    }
  },
]

export const registerForm:any = [
  {
    name:"firstName",
    outputPath: "input.firstName",
    input:{ 
      value: '' 
    }
  },
  {
    name:"lastName",
    outputPath: "input.lastName",
    input:{ 
      value: '' 
    }
  },
  {
    name:"emailAddress",
    component: "InputField",
    label:'Email address',
    outputPath: "input.emailAddress",
    input:{ 
      value: '' 
    }
  },
  {
    name:"password",
    component: "InputField",
    label:'Password',
    outputPath: "input.password",
    input:{ 
      value: '' 
    }
  }
]