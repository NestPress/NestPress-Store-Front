export const form:any = {
 	emailAddress: {value:''},
	password: {value:''}
}

export const submit = (e:any, addRegister:any) => {
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

