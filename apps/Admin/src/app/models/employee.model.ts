export class EmployeeModel {
  id: string = '';
  firstName: string = '';
  lastName: string = '';
  birthOfDate: string = '';
  salary: number = 0;
  personnelInformation: PersonnelInformation = new PersonnelInformation();
  address: Address = new Address();
  createAt: string = '';
  updateAt: string = '';
  updateUserId: string = '';
  updateUserName: string = '';
  deleteAt: string = '';
  deleteUserId: string = '';
  deleteUserName: string = '';
  isActive: boolean = true;
  isDeleted: boolean = false;
}

export class PersonnelInformation {
  identityNumber: string = '';
  email: string | null = null;
  phone1: string | null = null;
  phone2: string | null = null;
}

export class Address {
  country: string | null = null;
  city: string | null = null;
  town: string | null = null;
  fullAddress: string | null = null;
}
