export const createNewCustomerForm:any = {
  firstName: {
    component: "InputField",
    label:'Email address',
    input:{ 
      value: '' 
    }
  },
  lastName: {
    component: "InputField",
    label:'Email address',
    input:{ 
      value: '' 
    }
  },
 	emailAddress: {
    component: "InputField",
    label:'Email address',
    input:{ 
      value: '' 
    }
  },
  phoneNumber: {
    component: "InputField",
    label:'Email address',
    input:{ 
      value: '' 
    }
  },
  title: {
    component: "InputField",
    label:'Email address',
    input:{ 
      value: '' 
    }
  },
	password: {
    component: "InputField",
    label:'Email address',
    input:{ 
      value: '' 
    }
  }
}

export const submitNewCustomerForm = (e:any, addNewCustomer:any) => {
  e.preventDefault();
  addNewCustomer({ 
    variables: { 
      password: form.password.value,
      input:{
        firstName:form.firstName.value,
        lastName:form.lastName.value,
        emailAddress: form.emailAddress.value,
        phoneNumber: form.phoneNumber.value,
        title: form.title.value,       
      } 
    } 
  });
}