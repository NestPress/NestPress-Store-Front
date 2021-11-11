export const createNewCustomerForm:any = [
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
  },
  {
    name:"firstName",
    component: "InputField",
    label:'First name',
    input:{ 
      value: '' 
    }
  },
  {
    name:"lastName",
    component: "InputField",
    label:'Last name',
    input:{ 
      value: '' 
    }
  },
  {
    name:"phoneNumber",
    component: "InputField",
    label:'Phone number',
    input:{ 
      value: '' 
    }
  },
  {
    name:"title",
    component: "InputField",
    label:'Nickname',
    input:{ 
      value: '' 
    }
  }
	
]

export const submitNewCustomerForm = (e:any, addNewCustomer:any) => {
  e.preventDefault();
  addNewCustomer({ 
    variables: { 
      password: createNewCustomerForm.password.value,
      input:{
        firstName:createNewCustomerForm.firstName.value,
        lastName:createNewCustomerForm.lastName.value,
        emailAddress: createNewCustomerForm.emailAddress.value,
        phoneNumber: createNewCustomerForm.phoneNumber.value,
        title: createNewCustomerForm.title.value,       
      } 
    } 
  });
}