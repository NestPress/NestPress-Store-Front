export const form:any = {
	username: {
    component: "InputField",
    input:{ 
      value: '' 
    }
  },
	password: {
    component: "InputField",
    input:{ 
      value: '' 
    }
  },
}

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
