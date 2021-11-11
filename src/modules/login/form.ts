export const form:any = [
	{
    name:"username",
    component: "InputField",
    label:'Email address',
    placeholder:'Insert email address',
    input:{ 
      value: '' 
    }
  },
	{
    name:"password",
    component: "InputField",
    label:'Password',
    placeholder:'Insert password',
    input:{ 
      value: '' 
    }
  },
]

export const submit = (e:any, addAuthenticate: any) => {
  e.preventDefault();
  addAuthenticate({ 
    variables: { 
      input:{
        native: {
          username: form.username.value,
          password: form.password.value
        }
      } 
    } 
  });
}
