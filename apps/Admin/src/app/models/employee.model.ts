export class EmployeeModel {
  id: string = '';
  firstName: string = '';
  lastName: string = '';
  birthOfDate: string = '';
  salary: number = 0;
  personnelInformation: PersonnelInformation = new PersonnelInformation();
  address: Address = new Address();
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
