export const form:any = {
	firstName: {
    component: "InputField",
    input:{ value: '' }
  },
	lastName: {
    component: "InputField",
    input:{ value: '' }
  },
  nickName: {
    component: "InputField",
    input:{ value: '' }
  },
  description: {
    component: "TextareaField",
    input:{ value: '' }
  },
  primaryCategory: {
    component: "SelectField",
    input:{ value: '' }
  },
  secondaryCategory: {
    component: "SelectField",
    input:{ value: '' }
  },
}

export const submit = (e:any, addAuthenticate:any) => {
  e.preventDefault();
  console.log(form)
}