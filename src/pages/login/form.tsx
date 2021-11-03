
export const form = {
	username: {
    input:{ value: '' }
  },
	password: {
    input:{ value: '' }
  },
}

export const submit = (e, addAuthenticate) => {
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





