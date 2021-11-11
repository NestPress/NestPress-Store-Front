export const form:any = [
  {
    name:"emailAddress",
    component: "InputField",
    label:'Email address',
    input:{ 
      value: '' 
    }
  },
  {
    name:"password",
    component: "InputField",
    label:'Password',
    input:{ 
      value: '' 
    }
  }
]
 	


export const submit = (e:event, addRegister:any) => {
  e.preventDefault();
  addRegister({ 
    variables: { 
      input:{
          firstName:'',
          lastName:'',
          emailAddress: form.emailAddress.value,
          password: form.password.value
      } 
    } 
  });
}

