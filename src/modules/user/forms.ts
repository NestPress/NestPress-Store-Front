// @ts-nocheck
export const createNewCustomerForm:any = [
  {
    name:"emailAddress",
    component: "InputField",
    label:'Email address',
    outputPath: "emailAddress",
    input:{ 
      value: '' 
    }
  },
  {
    name:"password",
    component: "InputField",
    label:'Password',
    outputPath: "password",
    input:{ 
      value: '' 
    }
  },
  {
    name:"firstName",
    component: "InputField",
    label:'First name',
    outputPath: "firstName",
    input:{ 
      value: '' 
    }
  },
  {
    name:"lastName",
    component: "InputField",
    label:'Last name',
    outputPath: "lastName",
    input:{ 
      value: '' 
    }
  },
  {
    name:"phoneNumber",
    component: "InputField",
    label:'Phone number',
    outputPath: "phoneNumber",
    input:{ 
      value: '' 
    }
  },
  {
    name:"title",
    component: "InputField",
    label:'Nickname',
    outputPath: "title",
    input:{ 
      value: '' 
    }
  }
]

export const updateCustomerForm:any = [ 
    {
      name:"id",
      formConst: "id",
      outputPath: "input.id",
    },
    {
      name:"emailAddress",
      component: "InputField",
      label:'Email address',
      inputPath: "customer.emailAddress",
      outputPath: "input.emailAddress",
      input:{ 
        value: '' 
      }
    },
    {
      name:"firstName",
      component: "InputField",
      label:'First name',
      inputPath: "customer.firstName",
      outputPath: "input.firstName",
      input:{ 
        value: '' 
      }
    },
    {
      name:"lastName",
      component: "InputField",
      label:'Last name',
      inputPath: "customer.lastName",
      outputPath: "input.lastName",
      input:{ 
        value: '' 
      },
    },
    {
      name:"phoneNumber",
      component: "InputField",
      label:'Phone number',
      inputPath: "customer.phoneNumber",
      outputPath: "input.phoneNumber",
      input:{ 
        value: '' 
      }
    },
    {
      name:"title",
      component: "InputField",
      label:'Nickname',
      inputPath: "customer.title",
      outputPath: "input.title",
      input:{ 
        value: '' 
      }
    }
]



    // name: 'input', // fieldsetKey
    // label: 'Fieldset',
    // component: "FieldSet",
    // fields:[]