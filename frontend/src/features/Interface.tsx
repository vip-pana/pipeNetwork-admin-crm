export interface contact {
  id: number;
  name: string;
  surname: string;
  email: string;
  status: string;
}

export interface ticket {
  id: number;
  heading: string;
  date: string;
  status: string;
  byContact: number;
  content: string;
}

export interface navItem {
  label: string;
  icon: string;
  path: string;
}
