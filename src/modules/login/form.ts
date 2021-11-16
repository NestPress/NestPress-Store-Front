
export const form:any = [
	{
    name:"username",
    component: "InputField",
    label:'Email address',
    placeholder:'Insert email address',
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
    defaultValue:'',
    input:{ 
      value: '' 
    }
  },
]

export const submit = (e:any, addAuthenticate: any) => {
  e.preventDefault();
  const out = {}
  form.map((el)=>
    out[el.name] = el.input.value
  )
  addAuthenticate({ 
    variables: { 
      input:{
        native: out
      } 
    } 
  });
}
