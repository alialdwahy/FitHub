export type TodoItemType = {
  id: string;
  title: string;
};

export type EmployeesItemType = {
  id?: string;
  employee_name: string;
  employee_salary: string;
  employee_age: string;
  profile_image: string;
};

export type SignUpItemType = {
  id: string;
  name: string;
  username: string;
  email: string;
  password: string;
};

export type ProfileItemType = {
  id: string;
  name: string;
  username: string;
  email: string;
  phone: number;
  firstName:string;
  lastName:string;
  identificationNumber:string;
  gender:string;
  profilePicture: string;
};

export type UploadImageItemType = {
  id: string;
  attachment: any;
}

export type LoginItemType = {
  email: string;
  pasword: string;
}

export type LoginReponseItemType = {
  success: string;
  data: {};
  message: string;
}

export type GymClass = {
  id: string;
  name: string;
  description: string;
  image: string; 
  price: string; // URL to the image
}


export type Address  = {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  image: string; // URL to the image
}

export type ResponseModel = {
  data: any;
  message: string;
  status: string;
  code: string
}