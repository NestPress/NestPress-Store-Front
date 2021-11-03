export const form = {
	// firstName: {value:''},
	// lastName: {value:''},
	emailAddress: {value:''},
	password: {value:''}
}

export const submit = (e, addAuthenticate) => {
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

