export const form:any = [
	{
    name:"firstName",
    component: "InputField",
    label:'Email address',
    input:{ value: '' }
  },
	{
    name:"lastName",
    component: "InputField",
    label:'Email address',
    input:{ value: '' }
  },
  {
    name:"nickName",
    component: "InputField",
    label:'Email address',
    input:{ value: '' }
  },
  {
    name:"description",
    component: "TextareaField",
    label:'Email address',
    input:{ value: '' }
  },
  {
    name:"primaryCategory",
    component: "SelectField",
    label:'Email address',
    input:{ value: '' }
  },
  {
    name:"secondaryCategory",
    component: "SelectField",
    label:'Email address',
    input:{ value: '' }
  },
]

export const submit = (e:any, addAuthenticate:any) => {
  e.preventDefault();
  console.log(form)
}